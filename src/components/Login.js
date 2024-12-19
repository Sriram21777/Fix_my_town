// import { json } from "body-parser";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = async (e) => {
    setLoading(true);
    console.log(email, password);
    e.preventDefault();
    let res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
    if (res.status === 200) {
      alert("Login successfully");
      setLoading(false);
      // console.log(res.data.token);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.token));
      navigate("/user/dashboard");
    } else {
      console.log("errorr");
    }
  };
  return (
    <div>
      <div className="container my-3">
        <div className="row">
          <div className="col-md-6 p-5 d-flex align-items-center justify-content-center">
            <img
              src={"../images/login.jpg"}
              alt="Your image"
              style={{ width: "100%", maxHeight: "100%" }}
            />
          </div>
          <div className="col-md-6 p-5 d-flex align-items-center">
            <div className="w-100">
              <h1
                className="display-5  mb-5"
                style={{ justifyContent: "center", display: "flex" }}
              >
                LOGIN
              </h1>
              <form>
                <div className="mb-3 w-8 mx-auto">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <div className="card flex justify-content-center">
                    <InputText
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  {/* <input
                    type="email"
                    className="form-control rounded-pill w-8"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  /> */}
                  {/* <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div> */}
                </div>
                <div className="mb-3 w-8 mx-auto">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <div className="card flex justify-content-center">
                    <InputText
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                  {/* <input
                    type="password"
                    className="form-control rounded-pill w-8"
                    id="exampleInputPassword1"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  /> */}
                </div>

                <div className="p-3 pb-2 flex align-item-center justify-content-center">
                  <Button
                    loading={Loading}
                    label="Submit"
                    rounded
                    className="w-5"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  />
                </div>

                {/* <button
                  type="submit"
                  className="btn btn-primary w-100 mt-4 rounded-pill"
                >
                  Login
                </button> */}
                <div
                  className="form-text"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Don't have an account ? {"   "}
                  <Link to="/register" style={{ textDecoration: "none" }}>
                    register here
                  </Link>
                </div>
                <div className="p-3 flex align-item-center justify-content-center">
                  <Button
                    icon="pi pi-user"
                    label="Login as Admin"
                    rounded
                    outlined
                    className="w-20rem"
                  />
                </div>
                <div className="p-3 pt-1 flex align-item-center justify-content-center">
                  <Link to="/ZonalAdminlogin">
                    <Button
                      icon="pi pi-user"
                      label="Login as ZonalAdmin"
                      rounded
                      outlined
                      className="w-20rem"
                    />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
