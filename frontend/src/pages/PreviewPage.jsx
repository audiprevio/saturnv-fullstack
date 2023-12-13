import React from "react";
import { Typography, Button, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import icon from "../assets/icon.svg";
import preview1 from "../assets/preview1.svg";
import preview2 from "../assets/preview2.svg";
import preview3 from "../assets/preview3.svg";
import preview4 from "../assets/preview4.png";

function PreviewPage() {
  return (
    <>
      <div className="flex h-screen">
        <div className="bg-grid-pattern bg-24px w-full bg-white flex items-center justify-center overflow-y-auto max-h-screen">
          <div className="absolute top-10 pb-20 w-[10rem]">
            <Link to={`/home`}>
              <img src={icon} />
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Typography className="text-center font-black text-8xl px-[10rem] pb-5 top-0 pt-0 mt-0 text-[#000000]">
              Your Go To Geospatial Task Manager
            </Typography>
            <Typography className="text-center font-normal text-[#666666] text-xl">
              Powered by Google Map API, SaturnV allows your organization to
              track your tasks geospatially using Google Map.
            </Typography>
            <div className="flex flex-row gap-5">
              <Link to={`/login`}>
                <Button
                  className="rounded-lg w-[10.5rem] h-10 text-base font-medium px-1
              font-['Helvetica Neue'] relative drop-shadow-none bg-[#1d8af0] shadow-none flex items-center justify-center mt-10"
                  style={{ textTransform: "capitalize" }}
                >
                  Log In
                </Button>
              </Link>
              <Link to={`/login`}>
                <Button
                  className="rounded-lg w-[10.5rem] h-10 text-base font-medium px-1
              font-['Helvetica Neue'] relative drop-shadow-none bg-[#000000] shadow-none flex items-center justify-center mt-10"
                  style={{ textTransform: "capitalize" }}
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1C8AF0] bg-grid-pattern-white bg-24px items-center flex flex-col justify-center py-40">
        <Typography className="text-center font-black text-8xl px-[10rem] mt-0 text-[#ffffff]">
          How SaturnV Helps You
        </Typography>
        <Card className="bg-white w-[73.875rem] px-[%30] h-[39.5rem] rounded-[2.5rem] mb-10 mt-20 items-center justify-end">
          <Typography className="text-5xl font-black text-black my-7">
            Simple and Intuitive User Interface
          </Typography>
          <img src={preview1} className="w-[75%] antialiased" />
        </Card>
        <Card className="bg-white w-[73.875rem] px-[%30] h-[39.5rem] rounded-[2.5rem] mb-10 mt-10 items-end overflow-hidden pl-10 gap-10 flex flex-row justify-end">
          <img src={preview2} className="w-[45%] antialiased" />
          <div className="flex flex-col items-center pb-[15rem]">
            <Typography className="text-5xl font-black text-black pr-20 pb-2">
              Multi-role user access
            </Typography>
            <Typography className="text-md font-normal text-gray pr-[10rem] whitespace">
              Admins have access to see and manages all tasks. Meanwhile, Staffs
              can only access tasks assigned to them.
            </Typography>
          </div>
        </Card>
        <Card className="bg-white w-[73.875rem] px-[%30] h-[39.5rem] rounded-[2.5rem] mb-10 mt-10 items-end overflow-hidden pl-10 gap-10 flex flex-row justify-end">
          <img src={preview3} className="w-[45%] antialiased" />
          <div className="flex flex-col items-center pb-[15rem]">
            <Typography className="text-5xl font-black text-black pr-20 pb-2">
              Accurate Google Maps Search System
            </Typography>
            <Typography className="text-md font-normal text-gray pr-[10rem] whitespace">
              Tasks can be pinned accurately to the most granular level, thanks
              to Google Maps integration.
            </Typography>
          </div>
        </Card>
        <Card className="bg-white w-[73.875rem] px-[%30] h-[39.5rem] rounded-[2.5rem] mb-10 mt-10 items-end overflow-hidden pl-10 gap-10 flex flex-col justify-end">
          <div className="absolute top-[7rem] left-10">
            <Typography className="text-5xl font-black text-black pr-20 pb-2">
              Google Maps Feature Integration
            </Typography>
            <Typography className="text-md font-normal text-gray pr-[10rem] whitespace">
              Google Street View, Satellite toggle, and much more.
            </Typography>
          </div>
          <img
            src={preview4}
            className="w-[90%] bottom-[-8rem] absolute left-10 antialiased"
          />
        </Card>
      </div>
      <div className="flex h-screen">
        <div className="bg-grid-pattern bg-24px w-full bg-[#000000] flex items-center justify-center overflow-y-auto max-h-screen">
          <div className="flex flex-col items-center justify-center">
            <Typography className="text-center font-black text-8xl text-[#ffffff]">
              Try SaturnV now
            </Typography>
            <div className="flex flex-row gap-5">
              <Link to={`/login`}>
                <Button
                  className="rounded-lg w-[10.5rem] h-10 text-base font-medium px-1
              font-['Helvetica Neue'] relative drop-shadow-none bg-[#1d8af0] shadow-none flex items-center mt-10 justify-center"
                  style={{ textTransform: "capitalize" }}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreviewPage;
