import React from "react";
import { Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import logo from "./../assets/images/tv.png";
import { HiOutlineBars2 } from "react-icons/hi2";

export const NavBar = () => {
  return (
    <Box className="sm:container flex justify-between mx-auto p-1 items-center">
      <div
        className=" flex items-center p-1"
      >
        <img
          src={logo}
          style={{ width: "33px",}}
          alt="logo"
        />
        <span className="text-white font-semibold mx-2">MovieBox</span>
      </div>
      <div
        className="flex items-center text-white p-3  h-[40px]"
        style={{ border: "3px solid #fff", borderRadius: "10px" }}
      >
        <input
          style={{ background: "inherit" }}
          className="lg:w-[500px] md:w-[460px] sm:w-[180px] w-[100px]"
          type="text"
          placeholder="What do you want to watch"
        />
        <SearchIcon />
      </div>
      <div className="flex items-center text-white p-1 sm:p-3 gap-1 sm:gap-2">
        <span className="font-semibold">Sign in</span>
        <HiOutlineBars2
          className="bg-[#be113cd1] font-bolder"
          style={{ padding: "4px", borderRadius: "50%", fontSize: "24px" }}
        />
      </div>
    </Box>
  );
};
