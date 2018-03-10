import React from "react";
import socket from "../socket";

export default class Application extends React.Component {
  constructor(){
    super();
    this.state = {text: ""};
  }

  render(){
    return (
      <div>
        <input type="text" onChange={this.handleChange.bind(this)} value={this.state.text}/>
      </div>
    );
  }

  handleChange(e) {
    const {value} = e.target;
    this.setState({text: value});
    socket.emit("sendMessage", value);

  }

}