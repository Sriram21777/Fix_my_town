import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";
import logo from "../../logo.svg";
// import Map_template from "../Mapcomponents/Map_template";  
// import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Link } from "react-router-dom";
// const userModel = require("../models/userModel");

export default function Profile() {
  const [customers, setCustomers] = useState([]);
  const [userProfile, setUserProfile] = useState({ name: "", email: "", reportCount: "" });
  // const [showMap, setShowMap] = useState(false);  // Modal state
  // const [mapCenter, setMapCenter] = useState({ lat: 0, long: 0 });

  function handleRereport() {}
  useEffect(() => {
  const fetchData = async () => {
   const token = localStorage.getItem("token")?.slice(1, -1);

    if (token) {
      try {
        // Fetch user profile
        const profileResponse = await fetch("http://localhost:5000/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!profileResponse.ok) throw new Error('Error fetching user profile');

        const profileData = await profileResponse.json();
        setUserProfile({ 
          name: profileData.name, 
          email: profileData.email, 
          reportCount: profileData.reportCount, // Set reportCount from API response
        });

        // Fetch user reports
        const userId=profileData._id;
        // console.log('User ID:', userId); 
        const reportsResponse = await fetch("http://localhost:5000/api/reports/uniReport", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ _id: userId }), 
        });
     

        if (!reportsResponse.ok) throw new Error('Error fetching user reports');

        const reportsData = await reportsResponse.json();
        // console.log('Reports Data:', reportsData); 
        setCustomers(reportsData);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
  };

  fetchData();
}, []); // Empty dependency array, runs only on component mount

const handelreport = async (par) => {
 console.log(par);
};
  function actionTemplate(rowData, column) {
    // console.log("column", column);
    // console.log("rowData", rowData);
    return (
      <Button
        className="w-28"
        label="Report"
        rounded
        onClick={() => handelreport(rowData._id)}
      />
    );
  }
  const statusBodyTemplate = (product) => {
    return <Tag value={product.status} severity={getSeverity(product)}></Tag>;
  };
  const imgTemplate = (product) => {
    return (
      <img
        className="flex justify-content-center"
        src={product.reporturl}
        alt="img"
        style={{ height: "10vh" }}
      />
    );
  };

  const getSeverity = (product) => {
    switch (product.status) {
      case "Resolved":
        return "success";

      case "Pending":
        return "warning";

      case "Reported":
        return "danger";

      default:
        return null;
    }
  };
  function Mapbutton(rowData, column) {
    // console.log("column", column);
    // console.log("rowData", rowData);
    return (
      <Button
        icon="pi pi-map-marker"
        rounded
        size="lg"
        text
        onClick={() => handelreport(rowData._id)}
      />
    );
  }

  return (
    <>
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
          <li className="px-2 w-32 py-2 button-clr-primary rounded-lg text-center font-medium">
            <button><Link to="/register" className="text-white" style={{textDecoration : "none"}}>Logout</Link></button>
          </li>
        </ul>
      </nav>
    <div className="grid  grid-nogutter" style={{ width: "100%" }}>
      
      <div className="grid  grid-nogutter col-12 p-3">
        <div className="col-6 flex align-items-center justify-content-center">
          <img src="../images/profile.jpg" style={{ height: "35vh" }} />
        </div>

        <div className="col-6 flex align-items-center justify-content-center">
          <div className="">
            <h4 className="tet-center p-2">Name: {userProfile.name}</h4>
            <h4 className="tet-center p-2">Email: {userProfile.email}</h4>
            <h4 className="tet-center p-2">Number of reports: {userProfile.reportCount}</h4>
          </div>
        </div>
      </div>
      <Divider className="p-3" />
      <div className="col-12">
        <h3 className="text-center">Past Reports</h3>
      </div>
      <div className="col-12 " style={{ padding: "90px", paddingTop: "30px" }}>
        
        <DataTable
          value={customers}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="cat"
            header="Problem Type"
            style={{ width: "25%" }}
          ></Column>
          <Column
            header="Image"
            body={imgTemplate}
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="reporturl"
            header="Location"
            body={Mapbutton}
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="company"
            header="Problem Status"
            style={{ width: "25%" }}
            body={statusBodyTemplate}
          ></Column>
          <Column
            field="representative.name"
            header="Rereport"
            style={{ width: "25%" }}
            body={actionTemplate}
          ></Column>
        </DataTable>
      </div>
    </div>
   
    </>
  );
}
