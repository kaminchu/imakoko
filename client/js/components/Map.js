import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import socket from "../socket";

const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBZiahSJldWdUmz_pjPZxte0kA3QFBEv5Y&v=3.exp&libraries=geometry,drawing,places",
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


export default class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      position: { lat: 35.681167, lng: 139.767052 },
    }
  }

  componentDidMount() {
    socket.on(this.props.match.params.id, pos => {
      this.setState({position: JSON.parse(pos)});
    })
  }


  render() {
    return (
      <MapComponent
        position={this.state.position}
      />
    )
  }
}
