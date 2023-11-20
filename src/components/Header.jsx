import React, { useEffect, useRef, useState } from "react";
import { NavBar } from "./NavBar";
import { BsFillPlayCircleFill } from "react-icons/bs";
import imob from "./../assets/images/imob.png";
import tomato from "./../assets/images/tomato.png";

const Header = () => {
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiAccess = import.meta.env.VITE_API_URL_MORE;
  const accessKey = import.meta.env.VITE_ACCESS_TOKEN;
  const imageUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const getTopRated = async () => {
      try {
        const response = await fetch(`${apiAccess}1`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessKey}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setImages(data.results);
        } else {
          setError("Failed to load Movies :(");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getTopRated();
  }, [apiAccess, accessKey]);

  useEffect(() => {
    const moveToNextItem = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    const interval = setInterval(moveToNextItem, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const isValidIndex =
    images.length > 0 && currentIndex >= 0 && currentIndex < images.length;

  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div>
      <div
        className="h-[500px] md:h-[600px] transition-opacity duration-1000"
        style={
          isValidIndex
            ? {
                backgroundImage: `radial-gradient(ellipse, #0000, #000), url(${
                  error
                    ? errorillustration
                    : imageUrl + images[currentIndex].backdrop_path
                })`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }
            : null
        }
      >
        <NavBar />
        {isValidIndex && (
          <div className="text-white mt-20 md:mt-40 md:container mx-auto p-2 flex justify-between items-center">
            <div className="w-60">
              <h1 className="my-2 text-sm text-[#fff]">
                <b className="md:text-4xl text-xl font-bold">
                  {shortenText(images[currentIndex].title, 21)}
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
                  <span style={{ fontSize: "13px", marginLeft: "10px" }}>
                    68%
                  </span>
                </div>
              </div>
              <div>
                <p className="font-semibold" style={{ fontSize: "11px" }}>
                  {shortenText(images[currentIndex].overview, 240)}
                </p>
                <button className="my-9 flex items-center p-1 rounded px-3 bg-[#be113c]">
                  <BsFillPlayCircleFill className="me-3" />{" "}
                  <span style={{ fontSize: "13px" }}>WATCH TRAILER</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
