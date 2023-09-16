import React, { useEffect, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";

export const Search = () => {
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmN2I5ZWY7KIHjSbzZR-UTJUL1QyT3c",
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
        setIsPopupOpen(false); // Close the popup on error
      });
  }, [searchQuery]); // Include searchQuery as a dependency

  const filterData = () => {
    // Check if apiData is an array before filtering
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
      <div
        className={`${
          isPopupOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } transform transition-opacity transition-scale fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg`}
        ref={popupRef}
      >
        {/* Render loading and error */}
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}

        <ul>
          <div className="flex">
            <input
              id="search"
              aria-label="Search"
              aria-haspopup="listbox"
              role="combobox"
              style={{ background: "inherit" }}
              className="hidden border sm:block lg:w-[500px] md:w-[460px] sm:w-[180px] w-[100px]"
              type="text"
              placeholder="What do you want to watch"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={togglePopup} className="px-3">
              <IoClose />
            </button>
          </div>
          {apiData && apiData.length === 0 ? (
            <div>
              <div className="stage m-0 filter-contrast">
                <div class="dot-overtaking"></div>
              </div>
            </div>
          ) : (
            filteredData.map((item) => <li key={item.id}>{item.title}</li>)
          )}
        </ul>
      </div>
  )
}
