import React from "react";
import { Toggle, LinearProgress } from "material-ui";
import socket from "../socket";
import { Link } from "react-router-dom";
import Map from "./Map";

export default class Application extends React.Component {
  constructor(){
    super();
    this.state = {
      sendingPosition: false,
      watchId: null,
      mapId: null
    };
  }
  componentDidMount() {
    socket.emit("id?");
    socket.on("getId", id => {
      this.setState({mapId: id});
    });
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
        <Link to={`map/${this.state.mapId}`}>地図</Link>
        {this.state.mapId !== null && <Map match={{params:{id: this.state.mapId}}}/>}
      </div>
    );
  }

  handleToggle(e, isChecked) {
    if(isChecked){
      const watchId = navigator.geolocation.watchPosition(position => {
        const {latitude, longitude} = position.coords;
        const pos = JSON.stringify({lat: latitude, lng: longitude});
        socket.emit(this.state.mapId, pos);
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
