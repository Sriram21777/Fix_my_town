import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import logo from "../../logo.svg";
import { Dialog } from "primereact/dialog";
import { jwtDecode } from 'jwt-decode';


import { positioncords } from "../../App";
import Selector_map from "../Mapcomponents/Selector_map";
import { Link, useNavigate } from "react-router-dom";



const Form = ({ submitCallback }) => {
  const navigate = useNavigate();
  const [marker, setMarker] = useState(null);
  const [completed, setcompleted] = useState(false);

  const items = [
    { name: "Sewage", value: "Sewage" },
    { name: "Litter", value: "Litter" },
    { name: "Pothole", value: "Pothole" },
  ];
  const posUser = useContext(positioncords);
  console.log("i am from form", posUser.pos.lat, posUser.pos.lng);
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [Display, setDisplay] = useState(false);
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log(position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setlat(position.coords.latitude);
      setlong(position.coords.longitude);
      console.log({ lat }.lat);
    });
  }, []);


  const [loading, setLoading] = useState(false);

  const [Description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const fileUploadRef = useRef(null);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    reportCount: 0,
  });

 async function handleSubmit() {
  setLoading(true);
  const formData = new FormData();

  const file = fileUploadRef.current.getFiles()[0];
  if (!file) {
    alert("Please upload a file.");
    setLoading(false);
    return;
  }

  formData.append("file", file);
  formData.append("upload_preset", "se41ho5g");
  // formData.append("public_id", `Hackofestia/${file.name}`);

  const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/ds1721y9f/auto/upload", {
    method: "POST",
    body: formData,
  });

  const result = await cloudinaryRes.json();
  console.log(result);
  let token = localStorage.getItem("token");
  token = token.slice(1, -1);
  const decoded = jwtDecode(token); // Get the user ID from the token
  const userId = decoded.id;

  if (result.url) {
    const reportRes = await fetch("http://localhost:5000/api/reports/newReport", {
      method: "POST",
      body: JSON.stringify({
        userid: userId, // Now using dynamic user ID from JWT
        location: !posUser ? { lat: lat, long: long } : { lat: posUser.pos.lat, long: posUser.pos.lng },
        reporturl: result.url, 
        desc: Description,
        cat: value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Use the token from localStorage
      },
    });

    const reportData = await reportRes.json();

  if (reportRes.status === 200) {
    console.log("Report submitted:", reportData);
    
    // Refetch user profile to update report count
    const profileRes = await fetch("http://localhost:5000/api/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const profileData = await profileRes.json();
    setUserProfile({ 
      name: profileData.name, 
      email: profileData.email, 
      reportCount: profileData.reportCount,  // Update report count dynamically
    });

    setLoading(false);
    setcompleted(true);
  } else {
    console.error("Error submitting report:", reportData);
  }
} else {
  console.error("Error uploading image:", result);
}

setLoading(false);
}


  // File Upload
  const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null);
  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div
        className="flex align-items-center flex-column"
        style={{ backgroundColor: "white" }}
      >
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };
  const onUpload = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };
  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;

    setTotalSize(_totalSize);
  };
  const onTemplateUpload = (e) => {
    let _totalSize = 0;
    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };
  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        <ProgressBar
          value={value}
          displayValueTemplate={() => `${formatedValue} / 1 MB`}
          style={{ width: "300px", height: "20px", marginLeft: "auto" }}
        ></ProgressBar>
      </div>
    );
  };

  //   const onClick = (name, position) => {
  //     dialogFuncMap[`${name}`](true);

  //     if (position) {
  //       setPosition(position);
  //     }
  //   };

  //   const onHide = (name) => {
  //     dialogFuncMap[`${name}`](false);
  //   };
  // complete --------------->

  <iframe src="https://embed.lottiefiles.com/animation/99272"></iframe>;

  return (
    <div className="grid grid-nogutter" style={{ backgroundColor: "white" }}>
      <div
        className="col-12 flex justify-content-center"
        style={{ backgroundColor: "skyblue" }}
      >
        <div className="flex align-items-center">
          <img src={logo} height={100} className="" />
          <h4 className="p-2">Fix my Town</h4>
        </div>
      </div>
      {!completed ? (
        <div
          className="col-12 grid grid-nogutter"
          // className="flex align-items-center justify-content-center mt-8"
          id="Form"
        >
          <div className="col-12 flex align-items-center justify-content-center p-3">
            <Button
              onClick={() => navigate(-1)}
              icon="pi pi-arrow-left"
              rounded
              outlined
            />
          </div>
          <div className="col-12 text-center pt-4">
            <div className="text-900 text-3xl font-medium mb-3">
              Take action now and fill out this form to help preserve our planet
              for future generations.
            </div>
            <span className="text-600 font-medium line-height-3">
              Don't Know how our website work?
            </span>
            <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
              Click here!
            </a>
          </div>
          <div className="col-12 p-6">
            <div style={{ paddingTop: "20px", paddingInline: "180px" }}>
            <FileUpload
              ref={fileUploadRef}
              name="demo[]"
               url="https://api.cloudinary.com/v1_1/ds1721y9f/auto/upload"  // Update this to Cloudinary's upload URL
               multiple
               accept="image/*"
              maxFileSize={1000000}
               onUpload={onTemplateUpload}
               onSelect={onTemplateSelect}
               onError={onTemplateClear}
                onClear={onTemplateClear}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                 emptyTemplate={emptyTemplate}
                  chooseOptions={chooseOptions}
                 uploadOptions={uploadOptions}
                  cancelOptions={cancelOptions}
/>

              <br />
              <div className="flex justify-content-center">
                <SelectButton
                  value={value}
                  onChange={(e) => setValue(e.value)}
                  optionLabel="name"
                  options={items}
                />
              </div>

              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Button
                  onClick={() => {
                    setDisplay(true);
                  }}
                  label="Select a location"
                  className="w-half "
                  rounded
                  outlined
                />
              </div>
              <Dialog
                className="mt-3"
                headerStyle={{ textAlign: "center" }}
                visible={Display}
                style={{ width: "60vw", height: "70vh" }}
                onHide={() => {
                  setDisplay(false);
                }}
              >
                <Selector_map
                  onMarkerchange={(pos) => {
                    setMarker(pos);
                    console.log(pos);
                  }}
                  center={{ lat: lat, lng: long }}
                />
              </Dialog>

              <InputTextarea
                rows={5}
                placeholder="Enter description here  ........."
                value={Description}
                className="w-full"
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <br />
              <Button
                loading={loading}
                onClick={handleSubmit}
                label="Submit"
                icon="pi pi-send"
                className="w-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="col-12 grid grid-nogutter flex align-items-center justify-content-center">
          <div className="col-12 flex align-items-center justify-content-center p-4">
            <img src="../images/Sucuss.gif" style={{ height: "420px" }} />
          </div>
          <div className="col-12">
            {" "}
            <h4 className="text-center">Reported Sucussfully</h4>
          </div>
          <div className="col-12 flex align-items-center justify-content-center p-3">
            <Link to={"/user/dashboard"}>
              <Button
                label="Go To Dashboard"
                outlined
                rounded
                className="w-14rem"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
