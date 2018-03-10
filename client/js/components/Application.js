import React from "react";
import { Toggle, LinearProgress } from "material-ui";
import socket from "../socket";

export default class Application extends React.Component {
  constructor(){
    super();
    this.state = {
      sendingPosition: false,
      watchId: null
    };
  }

  render(){
    return (
      <div>
        <Toggle {...{
          onToggle: this.handleToggle.bind(this),
          toggled: this.state.sendingPosition,
          label: "現在地を送信する"
        }}/>
        {this.state.sendingPosition ? <Sending/> : <NoSending/>}
      </div>
    );
  }

  handleToggle(e, isChecked) {
    if(isChecked){
      const watchId = navigator.geolocation.watchPosition(position => {
        const {latitude, longitude} = position.coords;
        socket.emit("sendMessage", `latitude: ${latitude}, longitude:${longitude}`);
      }) ;
      this.setState({watchId, sendingPosition: isChecked});
    } else {
      this.state.watchId !== null || navigator.geolocation.clearWatch(this.state.watchId);
      this.setState({watchId: "", sendingPosition: isChecked});
    }
  }
}

const Sending = () => <LinearProgress mode="indeterminate" />;
const NoSending = () => <LinearProgress mode="determinate" />;
