import React from "react";
import logo from "./../assets/images/tv.png";
import { GoHome } from "react-icons/go";
import { BiCameraMovie } from "react-icons/bi";
import { MdLiveTv } from "react-icons/md";
import { BsCalendar4Week } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div
      className="mt-1 w-[200px] py-5  hidden md:block"
      style={{
        height: "-webkit-fill-available",
        position: "fixed",
        border: "2px solid #cccccc",
        borderRadius: "0px 35px 35px 0px",
      }}
    >
      <Link to="/">
        <div className=" flex items-center p-3">
          <img src={logo} style={{ width: "33px" }} alt="logo" />
          <span className="text-dark font-bold mx-2">MovieBox</span>
        </div>
      </Link>
      <div className="mt-3">
        <Link to="/">
          <div className="flex items-center font-semibold mx-5 p-4">
            <GoHome className="text-xl" />
            <span className="mx-4">Home</span>
          </div>
        </Link>
        <div
          className="flex items-center font-semibold bg-[#f8e8eb]  p-4 px-9"
          style={{ borderRight: "4px solid #c22f52" }}
        >
          <BiCameraMovie className="text-xl" />
          <span className="mx-4 text-[#bc0936]">Movies</span>
        </div>
        <div className="flex items-center font-semibold mx-5 p-4">
          <MdLiveTv className="text-xl" />
          <span className="mx-4">TV Series </span>
        </div>
        <div className="flex items-center font-semibold mx-5 p-4">
          <BsCalendar4Week className="font-bold" />
          <span className="mx-4">Upcomings</span>
        </div>
      </div>

      <div
        className="bg-[#fbf5f7] m-4 p-3 pt-10 my-6"
        style={{ border: "2px solid #e5a5b5", borderRadius: "20px" }}
      >
        <b className="text-[#6f6d6e]">
          Play movie quizes and earn free tickets
        </b>
        <span className="block my-3 text-[#a6a4a5]">
          50k people are playing now
        </span>
        <button className="px-3 p-1 block rounded-3xl font-semibold  text-[#c42a50] bg-[#f0c8d1]">
          {" "}
          Start playing
        </button>
      </div>
      <div className="flex items-center font-semibold mx-5 p-4">
        <IoLogOutOutline className="text-xl" />
        <span className="mx-4">Log out</span>
      </div>
    </div>
  );
};

export default SideBar;
