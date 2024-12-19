import React, { useContext, useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";

import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import Map_template from "./Map_template";

import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import Selector_map from "./Selector_map";
import { Button } from "primereact/button";
import { getCoordinates } from "../Utilfunc";
import { positioncords } from "../../App";
import { Zonelist } from "../Data";

function ZoneSelector() {
  const [countries, setCountries] = useState([]);
  const [display, setdisplay] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [coords, setcoords] = useState({});
  const [position, setposition] = useState({});
  const [loading, setloading] = useState(true);
  const posUser = useContext(positioncords);
  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredCountries;

      if (!event.query.trim().length) {
        _filteredCountries = [...countries];
      } else {
        _filteredCountries = countries.filter((country) => {
          return country.name
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredCountries(_filteredCountries);
      console.log(filteredCountries);
    }, 250);
  };

  useEffect(() => {
    Zonelist.getCountries().then((data) => setCountries(data));
    let obj = {};
    getCoordinates().then((position) => {
      obj = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      setcoords(obj);
    });
    console.log("super", posUser);
  }, [position]);

  return (
    <>
      <div className="p-3">
        <AutoComplete
          field="name"
          value={selectedZone}
          suggestions={filteredCountries}
          completeMethod={search}
          onChange={(e) => setSelectedZone(e.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Checkbox
          onChange={(e) => {
            setChecked(e.checked);
          }}
          checked={checked}
        />
        <label className="ml-2">Use your current location</label>
      </div>
      <h5 className="text-center">or</h5>
      {/* <h4>Name :- {selectedZone ? selectedZone.name : "  Loading ...  "} </h4> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            setdisplay(true);
          }}
          label="Select a location"
          className="w-half "
          outlined
          rounded
        />
      </div>
      <Dialog
        header="Click to place a pin"
        headerStyle={{ textAlign: "center" }}
        visible={display}
        style={{ width: "80vw", height: "70vh" }}
        onHide={() => {
          setdisplay(false);
        }}
      >
        <Selector_map
          onMarkerchange={(pos) => {
            setposition(pos);
            console.log(pos);
          }}
          center={{ lat: coords.lat, lng: coords.long }}
        />
      </Dialog>
      {!checked ? (
        <div className="p-3">
          <Inplace>
            <InplaceDisplay style={{ margin: "10px" }}>View Map</InplaceDisplay>
            <InplaceContent>
              <Map_template center={coords} />
            </InplaceContent>
          </Inplace>
        </div>
      ) : (
        <>
          <div className="p-6">
            <img src="../images/zone-search.gif" alt="searching" height={240} />
            <h6 className="text-center p-4">Finding your zone ...</h6>
          </div>
        </>
      )}
    </>
  );
}

export default ZoneSelector;
