// import React, { useEffect, useState } from "react";
// import { Paginator } from "primereact/paginator";
// import { TriStateCheckbox } from "primereact/tristatecheckbox";
// import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";

// import { Button } from "primereact/button";

// function ZonalAdmin() {
//   const [first, setFirst] = useState(0);
//   const [value, setValue] = useState(true);
//   useEffect(() => {}, []);
//   const onPageChange = (event) => {
//     setFirst(event.first);
//   };
//   const onUpload = (id) => {
//     const file = document.getElementById(id);
//     console.log(file);
//     console.log(file.files[0]);
//   };
//   return (
//     <div>
//       <div
//         className="grid grid-nogutter justify-content-center"
//         style={{ paddingInline: "80px" }}
//       >
//         <div className="col-12 grid grid-nogutter p-3">
//           <div className="col-4">
//             <Button label="Sewage issues" outlined className="w-6" />
//           </div>
//           <div className="col-4">
//             <Button label="Pothole issues" className="w-6" outlined />
//           </div>
//           <div className="col-4">
//             <Button label="Litter issues" className="w-6" outlined />
//           </div>
//         </div>
//         <div
//           className="col-12 grid grid-nogutter m-5"
//           style={{
//             paddingInline: "30px",
//             margin: "20px",
//             border: "1px dotted black",
//             padding: "20px 20px",
//           }}
//         >
//           <div className="col-1 flex align-items-center justify-content-center">
//             <TriStateCheckbox
//               value={value}
//               onChange={(e) => setValue(e.value)}
//             />
//           </div>
//           <div className="col-4 align-items-center flex justify-content-center">
//             <img src="../images/waste.png" height={90} />
//           </div>
//           <div className="col-6">
//             <p className="text-center">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Laboriosam suscipit, similique voluptatibus, ratione totam aliquid
//               repellat consequuntur, accusantium maxime quam repudiandae?
//               Repellendus cumque ipsum fugit dolore quod vitae hic quibusdam.
//             </p>
//             <p>
//               <button
//                 class="btn"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#collapseExample"
//                 aria-expanded="false"
//                 aria-controls="collapseExample"
//               >
//                 <i className="pi pi-angle-down"></i>
//               </button>
//             </p>
//             <div class="collapse" id="collapseExample">
//               <div class="card card-body">
//                 <div class="mb-3">
//                   <label for="formFile" class="form-label">
//                     Upload File here ..
//                   </label>
//                   <input class="form-control" type="file" id="formFile" />
//                   <div className="p-3">
//                     <Button
//                       label="Accept"
//                       severity="success"
//                       outlined
//                       onClick={() => {
//                         onUpload("formFile");
//                       }}
//                     />
//                   </div>
//                   <div className="p-3">
//                     <Button label="Reject" severity="danger" outlined />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           className="col-12 grid grid-nogutter m-5"
//           style={{
//             paddingInline: "30px",
//             margin: "20px",
//             border: "1px dotted black",
//             padding: "20px 20px",
//           }}
//         >
//           <div className="col-1 flex align-items-center justify-content-center">
//             <TriStateCheckbox
//               value={value}
//               onChange={(e) => setValue(e.value)}
//             />
//           </div>
//           <div className="col-4 align-items-center flex justify-content-center">
//             <img src="../images/waste.png" height={90} />
//           </div>
//           <div className="col-6">
//             <p className="text-center">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Laboriosam suscipit, similique voluptatibus, ratione totam aliquid
//               repellat consequuntur, accusantium maxime quam repudiandae?
//               Repellendus cumque ipsum fugit dolore quod vitae hic quibusdam.
//             </p>
//             <p>
//               <button
//                 class="btn"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#collapseExample1"
//                 aria-expanded="false"
//                 aria-controls="collapseExample1"
//               >
//                 <i className="pi pi-angle-down"></i>
//               </button>
//             </p>
//             <div class="collapse" id="collapseExample1">
//               <div class="card card-body">
//                 <div class="mb-3">
//                   <label for="formFile" class="form-label">
//                     Upload File here ..
//                   </label>
//                   <input class="form-control" type="file" id="formFile1" />
//                   <div className="p-3">
//                     <Button
//                       label="Accept"
//                       severity="success"
//                       outlined
//                       onClick={() => {
//                         onUpload("formFile1");
//                       }}
//                     />
//                   </div>
//                   <div className="p-3">
//                     <Button label="Reject" severity="danger" outlined />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-12">
//           <img src="../images/waste.png" height={90} />
//         </div>
//         <div className="col-12">
//           <img src="../images/waste.png" height={90} />
//         </div>
//       </div>
//       <div className="p-3">
//         <Paginator
//           first={first}
//           rows={10}
//           totalRecords={50}
//           onPageChange={onPageChange}
//           template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
//         />
//       </div>
//     </div>
//   );
// }

// export default ZonalAdmin;

import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function ZonalAdmin() {
  const [first, setFirst] = useState(0);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [coords, setcoords] = useState({
    lat: 26.8057227,
    long: 81.0245123,
  });
  const [checked, setchecked] = useState(false);
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
  function Mapbutton(rowData, column) {
    // console.log("column", column);
    // console.log("rowData", rowData);
    return <Button icon="pi pi-map-marker" rounded size="lg" text />;
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
      <div className="grid grid-nogutter">
        <div className="col-12 p-3">
          <h3 className="text-center">Details of Zones and Zonal Admin</h3>
        </div>
        <div
          className="col-12 grid grid-nogutter m-5"
          style={{
            paddingInline: "30px",
            margin: "20px",
            border: "1px dotted black",
            padding: "20px 20px",
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
              field="cat"
              header="Zone name"
              style={{ width: "25%" }}
            ></Column>
            <Column header="Zonal Admin" style={{ width: "25%" }}></Column>

            <Column
              field="company"
              header="Zone area"
              body={Mapbutton}
              style={{ width: "25%" }}
            ></Column>
          </DataTable>
        </div>
        <Divider className="p-3" />
        <div className="col-12 p-3">
          <h3 className="text-center">View reports in your Locality</h3>
        </div>
        <div
          className="col-12 grid grid-nogutter m-5"
          style={{
            paddingInline: "30px",
            margin: "20px",
            border: "1px dotted black",
            padding: "20px 20px",
          }}
        >
          <div className="col-1 flex align-items-center justify-content-center">
            <TriStateCheckbox
              value={value}
              onChange={(e) => setValue(e.value)}
            />
          </div>
          <div className="col-4 align-items-center flex justify-content-center">
            <img src="../images/waste.png" height={90} />
          </div>
          <div className="col-6">
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam suscipit, similique voluptatibus, ratione totam aliquid
              repellat consequuntur, accusantium maxime quam repudiandae?
              Repellendus cumque ipsum fugit dolore quod vitae hic quibusdam.
            </p>
            <p>
              <button
                class="btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample1"
                aria-expanded="false"
                aria-controls="collapseExample1"
              >
                <i className="pi pi-angle-down"></i>
              </button>
            </p>
            <div class="collapse" id="collapseExample1">
              <div class="card card-body">
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Upload File here ..
                  </label>
                  <input class="form-control" type="file" id="formFile1" />
                  <div className="p-3">
                    <Button
                      label="Accept"
                      severity="success"
                      outlined
                      onClick={() => {
                        onUpload("formFile1");
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <Button label="Reject" severity="danger" outlined />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <img src="../images/waste.png" height={90} />
        </div>
        <div className="col-12">
          <img src="../images/waste.png" height={90} />
        </div>
      </div>
      <div className="p-3">
        <Paginator
          first={first}
          rows={10}
          totalRecords={50}
          onPageChange={onPageChange}
          template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
        />
      </div>
      </div>
  );
}
