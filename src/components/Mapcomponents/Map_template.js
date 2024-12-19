import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngBounds, LayerGroup } from "leaflet";
import { Button } from "primereact/button";

function Map_template(props) {
  useEffect(() => {
    console.log(props);
  }); 

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MapContainer
        center={[props.center.lat, props.center.long]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "60%", borderRadius: "30px" }}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
        <Circle
          color="green"
          fillOpacity={0.2}
          center={[props.center.lat, props.center.long]}
          radius={1000}
        />
        <Marker
          position={[props.center.lat, props.center.long]}
          icon={
            new Icon({
              iconUrl: "../images/placeholder-2.png",
              iconSize: [45, 41],
              iconAnchor: [8, 11],
            })
          }
        ></Marker>
      </MapContainer>
    </div>
  );
}

Map.propTypes = {};

export default Map_template;
