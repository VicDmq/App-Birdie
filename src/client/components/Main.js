import React from "react";
import socketIOClient from "socket.io-client";
import "../style/app.css";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Prenom: "",
      endpoint: "http://localhost:8080",
      response: false,
      socket: null
    };
  }

  sendMessage(){
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("message", "Bonjour je m'appelle Adrien");
    this.setState({Prenom:"Victor"});
  }

  componentWillMount() {
   this.setState({ Prenom: "Adrien" });
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("message", message => this.setState({ response: message }));
    this.setState({socket: socket});
  }

  render() {
    return (
      <div>
        <p>
          Hello React! C'est : {this.state.Prenom} et le serveur me dit
          {this.state.response}
        </p>
        <button onClick={()=>this.sendMessage()}>Click ici</button>
      </div>
    );
  }
}
