import React, { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { getCoordinates } from "../Utilfunc";
import { Button } from "primereact/button";
import person from "../../person.svg";
import logo from "../../logo.svg";
import { Dropdown } from "primereact/dropdown";
import Map from "../Mapcomponents/Map";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import Map_template from "../Mapcomponents/Map_template";

function Admin() {
  const [first, setFirst] = useState(0);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [coords, setcoords] = useState({
    lat: 26.8057227,
    long: 81.0245123,
  });
  const [checked, setchecked] = useState(false);
  const [display, setdisplay] = useState(false);
  const [zones, setzones] = useState([{ name: "Arjunganj" }]);
  const [option1, setoption1] = useState(null);
  const [option2, setoption2] = useState(null);
  const [value, setValue] = useState(true);
  const handleSubmit = async (e) => {
    setloading(true);
    console.log("i am from dashbord", option1.code);
    // e.preventDefault();
    let res = await fetch("http://localhost:5000/api/reports/zonalReports", {
      method: "POST",
      body: JSON.stringify({
        location: checked
          ? { lat: 26.799594133401428, long: 81.00983287128457 }
          : option2.center,
        radius: checked ? 100 : option2.radius,
        category: option1.code,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDM4YzdmM2U3ODUxZTNlN2NmMTExNCIsImlhdCI6MTY4MjE0ODU3MX0.NMgOyTyWkfMIRmOMFMa_r-CTcbfcriyqPCNPRfWHYn0`,
      },
    });
    let data = await res.json();
    console.log({ data });
    if (res.status == 200) {
      setdata(data);
      console.log(data);
      alert("Data recieved Sucussfully");
      setloading(false);
    } else {
      console.log("errorr");
    }
    setloading(false);
  };
  function Mapbutton(data) {
    // console.log("column", column);
    // console.log("rowData", rowData);
    return (
      <>
        <Button
          icon="pi pi-map-marker"
          onClick={() => {
            setdisplay(true);
          }}
          rounded
          size="lg"
          text
        />
        <Dialog
          className="mt-3"
          headerStyle={{ textAlign: "center" }}
          visible={display}
          style={{ width: "60vw", height: "70vh" }}
          onHide={() => {
            setdisplay(false);
          }}
        >
          <Map_template center={data.center} radius={data.radius} />
        </Dialog>
      </>
    );
  }

  useEffect(() => {
    let obj = {};
    getCoordinates().then((position) => {
      obj = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      console.log("onnhuhy", obj);
      setcoords({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
    // fetching zones

    fetch("http://localhost:5000/api/zone/allZones", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDM4YzdmM2U3ODUxZTNlN2NmMTExNCIsImlhdCI6MTY4MjE0ODU3MX0.NMgOyTyWkfMIRmOMFMa_r-CTcbfcriyqPCNPRfWHYn0`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setzones(data);
        console.log(data);
      });
  }, []);
  const typeofissues = [
    { name: "Litter issues", code: "Litter" },
    { name: "Sewage issues", code: "Sewage" },
    { name: "Pothole issues", code: "Pothole" },
  ];
  const onPageChange = (event) => {
    setFirst(event.first);
  };
  const onUpload = (id) => {
    const file = document.getElementById(id);
    console.log(file);
    console.log(file.files[0]);
  };
  return (
    <div>
      <nav
        className="md:px-14 px-4 nav-clr mx-auto flex items-center md:flex justify-between sticky top-0"
        style={{ height: "15vh" }}
      >
        <img src={logo} style={{ height: "100px" }} />
        <h4 className="p-2">Fix my Town</h4>
        <div className="block md:hidden">
          <button className="custom-img"></button>
        </div>
        <ul className="custom-nav">
          {/* <li className="px-2 cursor-pointer text-gray-600">Home</li>
          <li className="px-2 cursor-pointer text-gray-600">Careers</li>
          <li className="px-2 cursor-pointer text-gray-600">About Us</li> */}
          <li className="px-2 py-2">
            <Link
              to="/profile"
              style={{ textDecoration: "none" }}
              className="text-clr-primary"
            >
              <img src={person} style={{ height: "30px", width: "30px" }} />
            </Link>
          </li>
          <li className="px-2 w-32 py-2 button-clr-primary rounded-lg text-center font-medium">
            <button>
              <Link
                to="/register"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Logout
              </Link>
            </button>
          </li>
        </ul>
      </nav>
      <div className="grid grid-nogutter">
        <div className="col-12 flex justify-content-center p-3">
          <img src="../images/admin.jpg" style={{ height: "50vh" }} />
        </div>
        <div className="col-12 p-3">
          <h3 className="text-center">Details of Zones and Zonal Admin</h3>
        </div>
        <div
          className="col-12 "
          style={{
            paddingInline: "120px",
            paddingTop: "30px",
            paddingBottom: "30px",
          }}
        >
          <DataTable
            value={zones}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              field="name"
              header="Zone name"
              style={{ width: "25%" }}
            ></Column>
            <Column
              header="Zonal Admin"
              field="adminName"
              style={{ width: "25%" }}
            ></Column>

            <Column
              field="company"
              header="Zone area"
              body={Mapbutton}
              style={{ width: "25%" }}
            ></Column>
          </DataTable>
        </div>
        <div className="p-4 col-12 flex justify-content-center">
          <Button
            icon="pi pi-plus"
            rounded
            outlined
            label="Add Zone"
            className="w-16rem"
            aria-label="Search"
          />
        </div>
        <Divider className="p-3" />

        <div className="col-12 p-3">
          <h3 className="text-center">View reports in your Locality</h3>
        </div>
        <div
          className="col-12 flex justify-content-center p-3"
          style={{ border: "1p dotted" }}
        >
          <Dropdown
            value={option1}
            onChange={(e) => setoption1(e.value)}
            options={typeofissues}
            optionLabel="name"
            placeholder="Choose type of issue"
            className="w-full md:w-14rem"
          />
        </div>
        <div
          className="col-12 flex justify-content-center p-3"
          style={{ border: "1p dotted" }}
        >
          <Dropdown
            value={option2}
            onChange={(e) => setoption2(e.value)}
            options={zones}
            optionLabel="name"
            placeholder="Select Zone"
            className="w-full md:w-14rem"
          />
        </div>
        <div className="col-12 flex justify-content-center align-item-center p-2">
          <div className="p-2">
            <Checkbox
              onChange={(e) => setchecked(e.checked)}
              checked={checked}
            ></Checkbox>
            <label className="pl-2">See Reports in all Zones</label>
          </div>
        </div>
        <div className="col-12">
          <div className="p-3 pb-2 flex align-item-center justify-content-center">
            <Button
              label="Apply Filters"
              rounded
              className="w-3"
              outlined
              onClick={handleSubmit}
            />
          </div>
        </div>
        {!loading ? (
          <div className="col-12 py-3" style={{ padding: "130px" }}>
            <Map
              center={coords}
              url={
                !option1
                  ? "../images/sewage.png"
                  : `../images/${option1.code}.png`
              }
              data={data}
            />
          </div>
        ) : (
          <div className=" col-12 flex align-item-center justify-content-center">
            <img src="../images/gear-loader.gif" style={{ height: "350px" }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
