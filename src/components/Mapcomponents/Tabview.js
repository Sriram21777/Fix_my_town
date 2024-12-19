import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Map from "./Map";

function Tabview() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TabView style={{ width: "60vw" }}>
        <TabPanel header="pothole" headerClassName="flex align-content-between">
          <Map url={"../images/pothole.png"} />
        </TabPanel>
        <TabPanel header="Sewage" headerClassName="flex align-content-between">
          <Map url={"../images/sewage.png"} />
        </TabPanel>
        <TabPanel header="Waste" headerClassName="flex align-content-between">
          <Map url={"../images/waste.png"} />
        </TabPanel>
      </TabView>
    </div>
  );
}

export default Tabview;
