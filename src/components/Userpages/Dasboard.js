import React from "react";
import Selector_map from "../Mapcomponents/Selector_map";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Map from "../Mapcomponents/Map";
import { useEffect } from "react";
import { getCoordinates } from "../Utilfunc";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import "../../styles.css"
import person from "../../person.svg"
import { Divider } from "primereact/divider";

function Dasboard() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [option, setoption] = useState(null);
  const handleSubmit = async (e) => {
    setloading(true);
    console.log("i am from dashbord", option.code);
    // e.preventDefault();
    let res = await fetch("http://localhost:5000/api/reports/zonalReports", {
      method: "POST",
      body: JSON.stringify({
        location: { lat: 26.799594133401428, long: 81.00983287128457 },
        radius: 30,
        category: option.code,
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
  const [coords, setcoords] = useState({
    lat: 26.8057227,
    long: 81.0245123,
  });
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
  }, []);
  console.log("from dashboard", coords);

  const cities = [
    { name: "Litter issues", code: "Litter" },
    { name: "Sewage issues", code: "Sewage" },
    { name: "Pothole issues", code: "Pothole" },
  ];
  return (
    <div>
      <nav className="md:px-14 px-4 nav-clr mx-auto flex items-center md:flex justify-between sticky top-0" style={{height : "15vh"}}>
        <img src={logo} style={{height : "100px"}}/>
        <h4 className="p-2">Fix my Town</h4>
        <div className="block md:hidden">
          <button className="custom-img"></button>
        </div>
        <ul className="custom-nav">
          {/* <li className="px-2 cursor-pointer text-gray-600">Home</li>
          <li className="px-2 cursor-pointer text-gray-600">Careers</li>
          <li className="px-2 cursor-pointer text-gray-600">About Us</li> */}
          <li className="px-2 py-2">

            <Link to="/profile" style={{textDecoration : "none"}} className="text-clr-primary">
            <img src={person} style={{height : "30px", width : "30px"}}/>
            </Link>
          </li>
          <li className="px-2 w-32 py-2 button-clr-primary rounded-lg text-center font-medium">
            <button><Link to="/register" className="text-white" style={{textDecoration : "none"}}>Logout</Link></button>
          </li>
        </ul>
      </nav>
      <div className="grid grid-nogutter">
        <div className="col-12 flex justify-content-center">
          <img src="../images/dashboard.jpg" style={{ height: "400px" }} />
        </div>
        <div className="col-12 flex align-item-center justify-content-center">
          <Link to="/user/report">
            <Button label="Report to us" rounded className="w-26rem" />
          </Link>
        </div>
        <div className="col-12 p-5 pb-3">
          <div className="surface-0 text-center pt-3">
            <div className="mb-3 font-bold text-5xl">
              <span className="text-900">One Product, </span>
              <span className="text-blue-600">save future</span>
            </div>
            <div className="text-1xl mb-6">
              Unlock the power of sustainability with our website - learn how to
              save the future, one step at a time
            </div>
            <div className="grid grid-nogutter">
              <div className="col-4 md:col-4 mb-4 px-5">
                <span
                  className="p-3 shadow-2 mb-3 inline-block"
                  style={{ borderRadius: "10px" }}
                >
                  <i className="pi pi-search text-4xl text-blue-500"></i>
                </span>
                <div className="text-900 text-xl mb-3 font-medium">Find</div>
                <span
                  className="text-800 line-height-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Find and report a local waste hotspot and make a difference,Be
                  a part of the solution by identifying neglected waste areas in
                  your community,Your waste location reports will assist in our
                  efforts to clean up and preserve the environment
                </span>
              </div>
              <div className="col-4 md:col-4 mb-4 px-5">
                <span
                  className="p-3 shadow-2 mb-3 inline-block"
                  style={{ borderRadius: "10px" }}
                >
                  <i className="pi pi-image text-4xl text-blue-500"></i>
                </span>
                <div className="text-900 text-xl mb-3 font-medium">Click</div>
                <span className="text-700 line-height-3">
                  Snap a pic of waste and save it on your phone,Help us clean up
                  the planet by uploading your waste photos,Your photo
                  contributions will aid in our efforts to keep our environment
                  clean.
                </span>
              </div>
              <div className="col-4 md:col-4 mb-4 px-5">
                <span
                  className="p-3 shadow-2 mb-3 inline-block"
                  style={{ borderRadius: "10px" }}
                >
                  <i className="pi pi-check-circle text-4xl text-blue-500"></i>
                </span>
                <div className="text-900 text-xl mb-3 font-medium">Report</div>
                <span className="text-700 line-height-3">
                  Upload your waste photo with location details in the form
                  provided,Please include a short description and the exact
                  location of the waste in the image you upload,Your submission
                  will aid in our efforts to clean up and preserve the
                  environment
                </span>
              </div>
            </div>
          </div>
        </div>
        <Divider type="solid" />
        <div className="col-12 p-3">
          <h3 className="text-center">View reports in your Locality</h3>
        </div>
        <div className="col-12 flex align-items-center justify-content-center p-3">
          <Button icon="pi pi-arrow-down" rounded outlined />
        </div>
        <div
          className="col-12 flex justify-content-center p-3"
          style={{ border: "1p dotted" }}
        >
          <Dropdown
            value={option}
            onChange={(e) => setoption(e.value)}
            options={cities}
            optionLabel="name"
            placeholder="Choose type of issue"
            className="w-full md:w-14rem"
          />
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
                !option
                  ? "../images/sewage.png"
                  : `../images/${option.code}.png`
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

export default Dasboard;
