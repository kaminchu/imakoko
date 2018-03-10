import React from "react";
import { Toggle, LinearProgress } from "material-ui";
import socket from "../socket";
import baseUrl from "../baseUrl";
import Map from "./Map";
import Clipboard from "react-clipboard.js";

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
        <Share id={this.state.mapId}/>
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

const Share = (props) => {
  const link = `${baseUrl}/#/map/${props.id}`;
  const encodeLink = encodeURIComponent(link);
  return (
    <ul className="u-flex">
      <li className="u-pa4">
        <a href={`http://line.me/R/msg/text/?${link}`}>LINE</a>
      </li>
      <li className="u-pa4">
        <a href={`http://twitter.com/share?url=${encodeLink}`}>Twitter</a>
      </li>
      <li className="u-pa4">
        <Clipboard component="a" data-clipboard-text={link} onSuccess={() => alert("コピーしました")}>
          リンクをコピーする
        </Clipboard>
      </li>
    </ul>
  );
};