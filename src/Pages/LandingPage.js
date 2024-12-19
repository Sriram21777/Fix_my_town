import React from "react";
import { useState } from "react";
import "../styles.css";
import logo from "../logo.svg"
import homeImg from "../homeImg.jpg"
import sewage from "../sewage.jpg"
import garbage from "../garbage.jpg"
import pothole from "../pothole.jpg"
import { Link } from "react-router-dom";
import number1 from "../number-1.png";
import number2 from "../number-2.png";
import number3 from "../number-3.png";
import number4 from "../number-4.png";


export default function LandingPage() {
  const [open, setOpen] = useState("false");
  function handleClick() {
    console.log("clicked!");
    if (open === "false") {
      setOpen("true");
    } else {
      setOpen("false");
    }
  }
  return (
    <div>
      <nav className="md:px-14 px-4 nav-clr mx-auto flex items-center md:flex justify-between sticky top-0" style={{height : "15vh"}}>
        <img src={logo} style={{height : "100px"}}/>
        <div className="block md:hidden">
          <button className="custom-img" onClick={handleClick}></button>
        </div>
        <ul className="custom-nav" data-expanded={open}>
          {/* <li className="px-2 cursor-pointer text-gray-600">Home</li>
          <li className="px-2 cursor-pointer text-gray-600">Careers</li>
          <li className="px-2 cursor-pointer text-gray-600">About Us</li> */}
          <li className="px-2 w-32 py-2 bg-inherit border-clr-primary rounded-lg  text-center font-semibold">
            <button>
            <Link to="/login" style={{textDecoration : "none"}} className="text-clr-primary">Log in</Link>
            </button>
          </li>
          <li className="px-2 w-32 py-2 button-clr-primary rounded-lg text-center font-medium">
            <button><Link to="/register" className="text-white" style={{textDecoration : "none"}}>Register</Link></button>
          </li>
        </ul>
      </nav>

      <div className="px-5 mx-auto flex justify-center md:py-10 md:justify-between md:px-14 items-center background_img" style={{height : "85vh"}}>
        <div className="flex flex-col gap-6 py-16 justify-center items-center md:items-start">
          <p className="hidden md:block text-lg text-clr-primary">
            Let's <strong>Begin</strong>
          </p>
          <h2
            className="font-bold md:text-5xl tracking-wide text-hero-clr text-4xl"
            style={{ lineHeight: "3.5rem" }}
          >
            Join us in <span className="text-clr-primary"> building sustainable communities, </span>
            <br />
            One <span className="text-clr-primary">Click</span> at a time.
          </h2>
          <p className="text-gray-600 text-sm tracking-wide">
          Improving your community with our user-friendly platform.
          <br/>
           Report public issues like littering, sewage, and potholes with ease. 
           <br/>
           Once reported local authorities promptly address and resolve reported issues.
           <br/>
            Enjoy a cleaner, safer, and healthier living environment.

          </p>
          <div className="block md:hidden">
            <img src={homeImg} alt="img." className="h-11/12 w-11/12" />
          </div>
          {/* <div className="flex items-center gap-5">
            <button className="p-3 w-36 button-clr-primary rounded-lg text-white text-center font-semibold text-lg">
              Join for free
            </button>
            <button className="w-10 h-10 bg-white rounded-full background_img_play"></button>
            <span className="font-bold text-lg">Play Video</span>
          </div> */}
        </div>
        <div className="hidden md:block w-3/5">
          <img src={homeImg} alt="img." className="" />
        </div>
      </div>

      <div className="flex-direction py-10 md:flex md:py-5" style={{height : "85vh"}}>
        {/* <div className="flex flex-col md:px-14 md:w-1/3 gap-5 px-7">
          <span className="text-clr-primary">WHAT WE GIVE</span>
          <span className="text-3xl font-semibold">
            What Do You Get From Us
          </span>
          <p className="text-clr">
            This platform offers well-designed robotics courses that cater to
            learners of all levels. From basic concepts to advanced programming,
            our courses provide hands-on experience to master robotics.
          </p>
        </div> */}
        <div className="flex-direction py-10 md:flex gap-10 px-5">
          <div className="flex flex-col gap-2 button-clr-cards px-4 py-7 rounded-xl justify-center min-h-fit w-1/3">
            <img src={garbage} alt="garbage"/>
            <h4 className="text-white font-bold">Public Littering</h4>
            <p className="text-white font-thin text-sm">
              {" "}
              Public littering is a major environmental issue that has a toll on both human and planet health. It is important to dispose of waste properly so through our web application we could tackle this problem and get all the waste properly disposed of.
            </p>
          </div>
          <div className="flex flex-col gap-2 button-clr-cards px-4 py-7 rounded-xl justify-center min-h-fit w-1/3">
            <img src={sewage} alt="sewage"/>
            <h4 className="text-white font-bold">Sewerage Mismanagement</h4>
            <p className="text-white font-thin text-sm">
              {" "}
              Stop the spread of disease and pollution caused by sewerage mismanagement. Join us in building cleaner and healthier communities. Report any sewerage mismanagement with one click.

            </p>
          </div>
          <div className="flex flex-col gap-2 button-clr-cards px-4 py-7 rounded-xl justify-center min-h-fit w-1/3">
            <img src={pothole} alt="pothole"/>
            <h4 className="text-white font-bold">Potholes Repair</h4>
            <p className="text-white font-thin text-sm">
              {" "}
              Potholes are road hazards that can damage vehicles and pose safety risks to drivers and pedestrians. Report potholes on our platform and the local authorities would fix them, ensuring safer and smoother roads for everyone.

            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex w-full h-full items-center md:px-6 py-6 gap-10 px-4" style={{backgroundColor : "#f5f5f5"}}>
        <div className="hidden md:w-2/5 md:block">
          <img src={"number1"} alt="img.." className="w-2/5" />
        </div>
        <div className="flex flex-col px-4 md:w-3/5 gap-3">
          <span className="text-4xl font-semibold">Step 1</span>
          <br />
          <span>JOIN OUR INCREDIBLE WEBSITE BY COMPLETING THE REGISTRATION PROCESS TODAY!</span>
        </div>
      </div> */}

      {/* <div className="flex w-full h-full items-center md:px-6 py-6 gap-10 px-4">
        <div className="flex flex-col px-4 md:w-3/5 gap-3">
          <span className="text-4xl font-semibold">Step 2</span>
          <br />
          <span>REPORT THE ISSUES THAT PERTAIN TO THE RELATED MATTERS IMMEDIATELY...</span>
        </div>
        <div className="hidden md:w-1/3 md:block">
          <img src={number2} alt="img.." className="w-2/5" />
        </div>
      </div> */}

      {/* <div className="flex w-full h-full items-center md:px-6 py-6 gap-10 px-4" style={{backgroundColor : "#f5f5f5"}}>
        <div className="hidden md:w-2/5 md:block">
          <img src={"number3"} alt="img.." className="w-2/5" />
        </div>
        <div className="flex flex-col px-4 md:w-3/5 gap-3">
          <span className="text-4xl font-semibold">Step 3</span>
          <br />
          <span>ADMIN WILL BE NOTIFIED AND REPORT WILL BE REVIEWED</span>
        </div>
      </div> */}

      {/* <div className="flex w-full h-full items-center md:px-6 py-6 gap-10 px-4">
        <div className="flex flex-col px-4 md:w-3/5 gap-3">
          <span className="text-4xl font-semibold">Step 4</span>
          <br />
          <span>STAY CALM; WE'LL RESOLVE YOUR ISSUES AND COOL THINGS DOWN! </span>
        </div>
        <div className="hidden md:w-1/3 md:block">
          <img src={number4} alt="img.." className="w-2/5" />
        </div>
      </div> */}
 </div>
 );
}