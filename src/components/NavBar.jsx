import React, { useEffect, useState, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import logo from "./../assets/images/tv.png";
import { HiOutlineBars2 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const accessKey = import.meta.env.VITE_ACCESS_TOKEN;
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        isPopupOpen
      ) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessKey}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.results);
        setLoading(false);
        if (searchQuery !== "") {
          setIsPopupOpen(true);
        } else {
          setIsPopupOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
        setIsPopupOpen(false);
      });
  }, [searchQuery]);
  const filterData = () => {
    if (Array.isArray(apiData)) {
      const filtered = apiData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, apiData]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsPopupOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="bg-[inherit]">
      <Box className="md:container flex justify-between mx-auto p-1 items-center">
        {/* Logo and brand */}
        <div className="flex items-center p-1">
          <img src={logo} style={{ width: "33px" }} alt="logo" />
          <span className="text-white font-semibold mx-2">MovieBox</span>
        </div>

        <div
          onClick={togglePopup}
          className="hidden md:flex items-center cursor-pointer text-white p-3 h-[40px]"
          style={{ border: "3px solid #fff", borderRadius: "10px" }}
        >
          <span
            style={{ background: "inherit" }}
            className=" lg:w-[500px] md:w-[460px] sm:w-[180px] w-[100px]"
          >
            what do you want to watch
          </span>
          <SearchIcon />
        </div>

        <div className="flex items-center text-white p-1 sm:p-3 gap-1 sm:gap-2">
          <span className="font-semibold hidden md:flex">Sign in</span>
          <div className="block md:hidden mx-4" onClick={togglePopup}>
            <SearchIcon />
          </div>

          <HiOutlineBars2
            className="bg-[#be113cd1] font-bolder"
            style={{ padding: "4px", borderRadius: "50%", fontSize: "24px" }}
          />
        </div>
      </Box>

      {/* Render popup when open */}
      <div
        className={`${
          isPopupOpen ? "opacity-100 scale-100" : "hidden scale-95"
        } transform overflow-hidden transition-opacity h-64 w-[300px] md:w-[600px] lg:w-[800px] mt-3 sm:mt-0 text-[#000] transition-scale fixed top-[25%] sm:top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg`}
        ref={popupRef}
      >
        {/* Render loading and error */}

        <div className="flex text-[#000] justify-between">
          <input
            id="search"
            aria-label="Search"
            aria-haspopup="listbox"
            role="combobox"
            style={{ background: "inherit" }}
            className=" border  lg:w-[700px] md:w-[500px] sm:w-[300px] w-[250px]"
            type="text"
            placeholder="What do you want to watch"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={togglePopup}
            style={{ border: "1px solid #f0c8d1", borderRadius: "2px" }}
            className="border px-3"
          >
            <IoClose />
          </button>
        </div>
        {loading && <div>...</div>}
        {error && <div>Error: {error.message}</div>}
        <div className="overflow-y-scroll h-44 my-4">
          {apiData && apiData.length === 0 ? (
            <div>
              <div
                className="stage m-0 filter-contrast"
                style={{ margin: "0" }}
              >
                No results found.
              </div>
            </div>
          ) : (
            filteredData.map((item) => (
              <Link
                key={item.id}
                className="p-4 flex items-center"
                style={{ border: "1px solid #f0c8d1" }}
                to={`/movies/${item.id}`}
              >
                <img
                  className=" w-14 md:w-28 hidden md:block"
                  src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                />
                <div>
                  <span className="p-3 block">{item.title}</span>
                  <span className="hidden md:block p-3 text-xl">
                    {item.original_title}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
