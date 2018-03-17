// @flow
import React from "react";
import { Toggle, LinearProgress } from "material-ui";
import socket from "../socket";
import baseUrl from "../baseUrl";
import Map from "./Map";
import Clipboard from "react-clipboard.js";
import QRCode from "qrcode.react";
import { Dialog, FlatButton } from "material-ui";

type PanelState = {
  sendingPosition: null | boolean,
  watchId: null | number,
  mapId: null | string
};
export default class Panel extends React.Component<{}, PanelState> {
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

  handleToggle(e: any, isChecked: boolean): void {
    if(isChecked){
      const watchId = navigator.geolocation.watchPosition(position => {
        const {latitude, longitude} = position.coords;
        const pos = JSON.stringify({lat: latitude, lng: longitude});
        socket.emit(this.state.mapId, pos);
      }) ;
      this.setState({watchId, sendingPosition: isChecked});
    } else {
      typeof this.state.watchId === "number" && navigator.geolocation.clearWatch(this.state.watchId);
      this.setState({watchId: null, sendingPosition: isChecked});
    }
  }
}

const Sending = () => <LinearProgress mode="indeterminate" />;
const NoSending = () => <LinearProgress mode="determinate" />;

type ShareProps = {
  id: null | string
};
type ShareState = {
  openDialog: boolean
};
class Share extends React.Component<ShareProps, ShareState> {
  constructor(props: ShareProps){
    super(props);
    this.state = {
      openDialog: false
    };
  }

  render() {
    const link = `${baseUrl}/#/map/${this.props.id ? this.props.id : ""}`;
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
        <li className="u-pa4">
          <QRDialog {...{
            open: this.state.openDialog,
            handleOpen: this.handleDialogOpen.bind(this),
            handleClose: this.handleDialogClose.bind(this),
            link: link
          }}/>
        </li>
      </ul>
    );
  }
  handleDialogOpen(){
    this.setState({openDialog: true});
  }
  handleDialogClose() {
    this.setState({openDialog: false});
  }
}

const QRDialog = (props) => {
  const actions = [
    <FlatButton
      label="OK"
      primary={true}
      keyboardFocused={false}
      onClick={props.handleClose}
    />,
  ];

  return (
    <div>
      <a href="#" onClick={props.handleOpen}>QRコードを表示する</a>
      <Dialog
        title="QRコード"
        actions={actions}
        modal={false}
        open={props.open}
        contentStyle={{width: "176px"}}
        onRequestClose={props.handleClose}
      >
        <QRCode value={props.link}/>
      </Dialog>
    </div>
  );
};