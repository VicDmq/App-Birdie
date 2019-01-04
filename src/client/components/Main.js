import React from "react";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { actionCreators } from "../appRedux";
import DropdownButton from "./DropdownButton";
import Table from "./Table";
import "../style/app.css";
import ErrorComponent from "./ErrorComponent";

const mapStateToProps = state => ({
  datas: state.datas,
  demographicDataType: state.demographicDataType
});

class Main extends React.Component {
  state = {
    socket: socketIOClient("http://localhost:8080"),
    options: ["Education", "Hispanice", "Mace"],
    error: null
  };

  onDemographicDataTypeChanged = demographicDataType => {
    this.state.socket.emit("Request", demographicDataType);

    const { dispatch } = this.props;
    dispatch(actionCreators.updateDemographicDataType(demographicDataType));
  };

  onDatasUpdated = result => {
    const { dispatch } = this.props;
    dispatch(actionCreators.updateDatas(result));
    this.setState({ error: null });
  };

  onErrorOccured = error => {
    this.setState({ error });
  };

  componentWillMount = () => {
    const { socket } = this.state;

    socket.emit("Request", this.props.demographicDataType);
    socket.on("Response", result => this.onDatasUpdated(result));
    socket.on("Error", error => this.onErrorOccured(error));
  };

  render() {
    const { error, options } = this.state;
    const { datas, demographicDataType } = this.props;

    let mainComponent;
    if (error) {
      mainComponent = <ErrorComponent message={error} />;
    } else {
      const head = ["#", demographicDataType, "Count", "Average Age"];
      mainComponent = <Table head={head} rows={datas} />;
    }

    return (
      <div>
        <DropdownButton
          optionSelected={demographicDataType}
          options={options}
          onOptionChanged={newDemographicDataType =>
            this.onDemographicDataTypeChanged(newDemographicDataType)
          }
        />
        {mainComponent}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);
