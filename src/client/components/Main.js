import React from "react";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { actionCreators } from "../appRedux";
import { formatResultBeforeStoring } from "../resultFormatting";
import DropdownButton from "./DropdownButton";
import Table from "./Table";
import ErrorComponent from "./ErrorComponent";
import "../style/app.css";

const mapStateToProps = state => ({
  datas: state.datas,
  demographicDataType: state.demographicDataType
});

class Main extends React.Component {
  state = {
    socket: socketIOClient("http://localhost:8080"),
    options: ["Education", "Hispanice", "Mace"],
    head: ["#", "", "Count", "Average Age"],
    limit: 100,
    error: null,
    nbLinesNotDisplayed: null
  };

  componentWillMount = () => {
    const { socket, limit } = this.state;

    socket.emit("Request", this.props.demographicDataType, limit);

    socket.on("Response", (result, nbLinesNotDisplayed) => {
      this.onDatasUpdated(result);

      this.setState({ nbLinesNotDisplayed: nbLinesNotDisplayed });
      this.setState({ error: null });
    });

    socket.on("Error", error => {
      this.onErrorOccured(error);

      this.setState({ nbLinesNotDisplayed: null });
    });
  };

  onDatasUpdated = result => {
    const { dispatch } = this.props;

    const resultFormatted = formatResultBeforeStoring(result);
    dispatch(actionCreators.updateDatas(resultFormatted));
  };

  onErrorOccured = error => {
    this.setState({ error });
  };

  onDemographicDataTypeChanged = demographicDataType => {
    const { socket, limit } = this.state;
    socket.emit("Request", demographicDataType, limit);

    const { dispatch } = this.props;
    dispatch(actionCreators.updateDemographicDataType(demographicDataType));
  };

  render() {
    const { options, head, error, nbLinesNotDisplayed } = this.state;
    const { datas, demographicDataType } = this.props;

    let lineNotDisplayedComponent;
    if (nbLinesNotDisplayed) {
      lineNotDisplayedComponent = <div>{nbLinesNotDisplayed}</div>;
    }

    let mainComponent;
    if (error) {
      mainComponent = <ErrorComponent message={error} />;
    } else {
      head[1] = demographicDataType;
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
        {lineNotDisplayedComponent}
        {mainComponent}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);
