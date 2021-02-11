import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import './App.css';

const center = { lat: -2.482, lng: 117.905 };

class MapExample extends Component {
  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const geocoder = L.Control.Geocoder.nominatim();
    let marker;

    map.on("click", (e) => {
      geocoder.reverse(
        e.latlng,
        map.options.crs.scale(map.getZoom()),
        (results) => {
          var r = results[0];
          if (r) {
            if (marker) {
              marker
                .setLatLng(r.center)
                .setPopupContent(r.name + '<br/>' + e.latlng)
                .openPopup();
            } else {
              marker = L.marker(r.center)
                .bindPopup(r.name + '<br/>' + e.latlng)
                .addTo(map)
                .openPopup();
            }
          }
        }
      );
    });
  }

  render() {
    return (
      <Map
        center={center}
        zoom={5}
        ref={(m) => {
          this.leafletMap = m;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    );
  }
}

export default MapExample;