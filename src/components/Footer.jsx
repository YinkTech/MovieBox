import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-center">
      <div className="my-5">
        <ul className="text-xl  justify-center font-bold flex gap-10">
          <li>
            <FaFacebookSquare />
          </li>
          <li>
            <FaInstagram />
          </li>
          <li>
            <FaTwitter />
          </li>
          <li>
            <FaYoutube />
          </li>
        </ul>
      </div>
      <div className="mx-auto">
        <ul className="text-center justify-center font-bold sm:flex gap-7">
          <li>Condictions of Use</li>
          <li>Privacy & Policy</li>
          <li>Press Room</li>
        </ul>
      </div>
      <span className="my-6 block text-[#9195a0] font-bold">
        &copy; 2023 MovieBox by Olayinka Ayeni
      </span>
    </div>
  );
};

export default Footer;
