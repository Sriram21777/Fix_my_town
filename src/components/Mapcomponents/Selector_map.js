import { Icon } from "leaflet";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { positioncords } from "../../App";

function DraggableMarker({ onMarkerChange, center }) {
  const [position, setPosition] = useState(center);

  const [draggable, setDraggable] = useState(true);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onMarkerChange(marker.getLatLng());
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={
        new Icon({
          iconUrl: "../images/placeholder-3.png",
          iconSize: [45, 41],
          iconAnchor: [8, 11],
        })
      }
    ></Marker>
  );
}
function Selector_map({ onMarkerChange, center }) {
  const posUser = useContext(positioncords);
  const [position, setposition] = useState({});
  useEffect(() => {
    console.log(position);
    posUser.setpos(position);
  }, [position]);
  return (
    <>
      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "350px", width: "90%", borderRadius: "30px" }}
        >
          <TileLayer url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png" />
          <DraggableMarker
            onMarkerChange={(pos) => {
              setposition(pos);
            }}
            center={center}
          />
        </MapContainer>
      </div>
    </>
  );
}
export default Selector_map;
