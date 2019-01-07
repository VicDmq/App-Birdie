import React from "react";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { actionCreators } from "../appRedux";
import { formatResultBeforeStoring } from "../resultFormatting";
import DropdownButton from "./DropdownButton";
import Table from "./Table";
import ErrorComponent from "./ErrorComponent";
import Loader from "react-loader-spinner";
import "../style/app.css";

// const serverPort = process.env.PORT || appConfig.server.port;
// console.log(serverPort);

const mapStateToProps = state => ({
  datas: state.datas,
  demographicDataType: state.demographicDataType
});

class Main extends React.Component {
  state = {
    socket: socketIOClient("https://app-birdie-victor-domecq.herokuapp.com:17873"),
    options: ["Education", "Hispanice", "Mace", "ooo"],
    head: ["#", "", "Count", "Average Age"],
    limit: 10,
    error: null,
    nbLinesNotDisplayed: null,
    isLoading: true
  };

  componentWillMount = () => {
    const { socket, limit } = this.state;
    const { demographicDataType } = this.props;

    this.sendRequest(socket, demographicDataType, limit);

    socket.on("Response", (result, nbLinesNotDisplayed) => {
      this.onDatasUpdated(result);

      this.updateStateAccordingToSocketAction(null, nbLinesNotDisplayed, false);
    });

    socket.on("Error", error => {
      this.updateStateAccordingToSocketAction(error, null, false);
    });
  };

  sendRequest = (socket, demographicDataType, limit) => {
    socket.emit("Request", demographicDataType, limit);
    this.updateStateAccordingToSocketAction(null, null, true);
  };

  updateStateAccordingToSocketAction = (
    error,
    nbLinesNotDisplayed,
    isLoading
  ) => {
    this.setState({
      error: error,
      nbLinesNotDisplayed: nbLinesNotDisplayed,
      isLoading: isLoading
    });
  };

  onDatasUpdated = result => {
    const { dispatch } = this.props;

    const resultFormatted = formatResultBeforeStoring(result);
    dispatch(actionCreators.updateDatas(resultFormatted));
  };

  onDemographicDataTypeChanged = demographicDataType => {
    const { socket, limit } = this.state;
    const { dispatch } = this.props;
    dispatch(actionCreators.updateDemographicDataType(demographicDataType));

    this.sendRequest(socket, demographicDataType, limit);
  };

  render() {
    const { options, head, error, nbLinesNotDisplayed, isLoading } = this.state;
    const { datas, demographicDataType } = this.props;

    const lineNotDisplayedComponent = (
      <div className="lineNotDisplayed-container">
        {nbLinesNotDisplayed
          ? nbLinesNotDisplayed + " lines has not been displayed"
          : ""}
      </div>
    );

    let mainComponent;
    if (error) {
      mainComponent = (
        <div className="centered-container">
          <ErrorComponent message={error} />
        </div>
      );
    } else if (isLoading) {
      mainComponent = (
        <div className="centered-container">
          <Loader type="Oval" width={80} height={80} color="#1919c7" />
        </div>
      );
    } else {
      head[1] = demographicDataType;
      mainComponent = <Table head={head} rows={datas} />;
    }

    return (
      <div className="main">
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
