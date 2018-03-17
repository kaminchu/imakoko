// @flow
import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import socket from "../socket";

const API_KEY = process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY :"";
const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 35.681167, lng: 139.767052 }}
    center={props.position}
  >
    <Marker position={props.position}/>
  </GoogleMap>
);

type MapProps = {
  match: Object,

};
type MapState = {
  position: null | any
};
export default class Map extends React.PureComponent<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props);
    this.state = {
      position: null,
    }
  }

  componentDidMount() {
    socket.on(this.props.match.params.id, pos => {
      this.setState({position: JSON.parse(pos)});
    })
  }


  render() {
    const map = () => <MapComponent position={this.state.position}/>;
    const none = () => <div>地図が公開されていません</div>;
    return this.state.position ? map() : none();
  }
}
