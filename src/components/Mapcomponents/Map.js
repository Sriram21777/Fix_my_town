import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngBounds, LayerGroup } from "leaflet";
import { Button } from "primereact/button";

import { getCoordinates } from "../Utilfunc";
import ModalView from "../Modal";

function Map(props) {
  const [coords, setcoords] = useState(props.center);
  const [data, setdata] = useState([]);
  useEffect(() => {
    console.log("from map", props);
    setdata(props.data);
  }, []);

  const [curDesc, setcurDesc] = useState("");
  const [curimg, setcurimg] = useState("");
  const [date,curdate]=useState(null);
  const position = [51.505, -0.09];
  const [modal, setmodal] = useState(false);
  const bounds = new LatLngBounds([45.51, -0.1], [56.51, 1.14]);
  // const bounds1 = new LatLngBounds(
  //   L.latLng(position).subtract(500, 500).toArray(),
  //   L.latLng(position).add(500, 500).toArray()
  // );
  const fillBlueOptions = { fillColor: "blue" };
  const fillRedOptions = { color: "red", fillColor: "red" };
  const greenOptions = { color: "green", fillColor: "green" };
  const purpleOptions = { color: "purple" };

  return (
    <div
      style={{
        padding: "10px",

        // border: "2px dotted black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModalView
        show={modal}
        onHide={() => setmodal(false)}
        description={curDesc}
        date={date}
      />
      <MapContainer
        center={
          // JSON.parse(localStorage.getItem("user")).coordinates
          //   ? [
          //       JSON.parse(localStorage.getItem("user")).coordinates[0],
          //       JSON.parse(localStorage.getItem("user")).coordinates[1],
          //     ]
          [props.center.lat, props.center.long]
        }
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%", borderRadius: "30px" }}
      >
        <TileLayer url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png" />
        <Circle
          center={[51.51, -0.08]}
          pathOptions={greenOptions}
          radius={200}
        />
        <Circle
          center={[51.51, -0.14]}
          pathOptions={fillRedOptions}
          radius={500}
          stroke={false}
        />
        <Marker
          position={[coords.lat, coords.long]}
          icon={
            new Icon({
              iconUrl: "../images/placeholder-2.png",
              iconSize: [45, 41],
              iconAnchor: [8, 11],
            })
          }
        ></Marker>
        {/* <LayerGroup>

        </LayerGroup> */}
        {data &&
          data.map((itm) => (
            <Marker
              position={[itm.location.lat, itm.location.long]}
              icon={
                new Icon({
                  iconUrl: props.url,
                  iconSize: [45, 41],
                  iconAnchor: [8, 11],
                })
              }
            >
              <Popup>
                <div className="w-13rem">
                  <img
                    src={itm.reporturl}
                    className="p-1"
                    style={{ height: "18vh", width: "400px" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    <Button
                      icon="pi pi-info"
                      rounded
                      onClick={() => {
                        setcurDesc(itm.desc);
                        setcurimg(itm.reporturl);
                        console.log(itm.reporturl);
                        curdate(itm.createdAt);
                        setmodal(true);
                      }}
                      text
                      severity="success"
                      aria-label="Search"
                    />
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        <Marker
          position={
            JSON.parse(localStorage.getItem("user")).coordinates
              ? [
                  JSON.parse(localStorage.getItem("user")).coordinates[0],
                  JSON.parse(localStorage.getItem("user")).coordinates[1],
                ]
              : position
          }
          icon={
            new Icon({
              iconUrl: props.url,
              iconSize: [45, 41],
              iconAnchor: [8, 11],
            })
          }
        >
          <Popup>
            <div className="">
              <img src="../images/pothole.png" height={150} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "5px",
                }}
              >
                <Button
                  icon="pi pi-info"
                  rounded
                  onClick={() => {
                    setmodal(true);
                  }}
                  text
                  severity="success"
                  aria-label="Search"
                />
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

Map.propTypes = {};

export default Map;
