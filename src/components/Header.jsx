import React from "react";
import john from "./../assets/images/john.jpg";
import { NavBar } from "./NavBar";
import { HiOutlineMinus } from "react-icons/hi2";
import imob from "./../assets/images/imob.png";
import tomato from "./../assets/images/tomato.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const Header = () => {
  return (
    <div
      className="h-[400px] md:h-[500px]"
      style={{
        backgroundImage: `linear-gradient(to bottom, #00000064, #08060688), url(${john})`,
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
      }}
    >
      <NavBar />

      <div className="text-white mt-24 md:container mx-auto p-2 md:p-0 flex justify-between items-center">
        <div className="w-60">
          <h1 className="my-2 text-sm text-[#fff]">
            <b className="md:text-4xl text-xl font-bold">
              John Wick 3: Parabellum
            </b>
          </h1>
          <div className="my-2 flex justify-star">
            <div className="flex items-center">
              <img
                src={imob}
                alt="imob"
                style={{ width: "30px", height: "13px" }}
              />
              <span style={{ fontSize: "13px", marginLeft: "10px" }}>
                76.0 / 100
              </span>
            </div>
            <div className="flex ms-4 items-center">
              <img
                src={tomato}
                alt="tomato"
                style={{ width: "18px", height: "13px" }}
              />
              <span style={{ fontSize: "13px", marginLeft: "10px" }}>68%</span>
            </div>
          </div>
          <div>
            <p className="font-semibold" style={{ fontSize: "11px" }}>
              John Wick is on the run after killing a member of the
              international assassins' guild, and with a $14 million price tag
              on hi5,headr he is the target of hit men and women everywhere.
            </p>
            <button className="my-9 flex items-center p-1 rounded px-3 bg-[#be113c]">
              <BsFillPlayCircleFill className="me-3" />{" "}
              <span style={{ fontSize: "13px" }}>WATCH TRAILER</span>
            </button>
          </div>
        </div>
        <div>
          <span className="flex items-center gap-1 text-gray-400">
            <HiOutlineMinus className=" font-extrabold opacity-0" /> 1
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <HiOutlineMinus className=" font-extrabold opacity-0" /> 2
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineMinus className=" font-extrabold" /> 3
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <HiOutlineMinus className=" font-extrabold opacity-0" /> 4
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <HiOutlineMinus className=" font-extrabold opacity-0" /> 5
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
