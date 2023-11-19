import React, { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import imob from "./../assets/images/imob.png";
import tomato from "./../assets/images/tomato.png";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "./../assets/images/tv.png";
import { HiOutlineBars2 } from "react-icons/hi2";
import Footer from "../components/Footer";

const Movies = () => {
  const [like, liked] = useState(false);
  const setLike = () => {
    liked(!like);
  };

  const [movie, setMovie] = useState([]);
  const [error, setError] = useState("");
  const apiAccess = import.meta.env.VITE_API_URL_MORE;
  const accessKey = import.meta.env.VITE_ACCESS_TOKEN;
  const [count, setCount] = useState(1);

  useEffect(() => {
    const getTopRated = async () => {
      try {
        const response = await fetch(`${apiAccess}${count}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessKey}`,
          },
        });

        if (response.ok) {
          const datas = await response.json();
          setMovie(datas.results);
        } else {
          setError("Failed to load Movies :(");
        }
      } catch (error) {
        console.error("Error fetching datas:", error);
      }
      console.log(movie);
    };
    getTopRated();
  }, [apiAccess, accessKey, count]);

  const increment = () => {
    if (count < 500) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <div className=" mx-auto">
      <div className=" flex p-3 bg-[#f8e8eb] justify-between items-center">
        <Link to={`/`} className="flex items-center p-1">
          <img src={logo} style={{ width: "33px" }} alt="logo" />
          <span className="text-black font-semibold mx-2">MovieBox</span>
        </Link>

        <div className="flex items-center text-white p-1 sm:p-3 gap-1 sm:gap-2">
          <HiOutlineBars2
            className="bg-[#be113cd1] font-bolder"
            style={{ padding: "4px", borderRadius: "50%", fontSize: "24px" }}
          />
        </div>
      </div>
      {error ? (
        <p className="text-buttonred text-2xl max-[280]:text-base md:text-[36px]">
          {error}
        </p>
      ) : (
        <div>
          {Object.keys(movie).length === 0 ? (
            <div className="mt-10 text-center mx-auto w-[100px] ">
              <div className="stage filter-contrast">
                <div className="dot-overtaking"></div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mx-auto mt-5 flex justify-center items-center gap-5">
                <button
                  onClick={decrement}
                  className=" bg-[#be113c] text-white p-2 px-3 rounded-md shadow-sm hover:opacity-90"
                  style={{ transition: "0.3s all easein", outline: "none" }}
                >
                  <IoChevronBack />
                </button>
                <button
                  className=" bg-[#be113c] text-white p-2 px-3 rounded-md shadow-sm hover:opacity-90"
                  style={{ transition: "0.3s all easein", outline: "none" }}
                >
                  {count}
                </button>
                <button
                  onClick={increment}
                  className=" bg-[#be113c] text-white p-2 px-3 rounded-md shadow-sm hover:opacity-90"
                  style={{ transition: "0.3s all easein", outline: "none" }}
                >
                  <IoChevronForward />
                </button>
              </div>
              <div className="my-6 px-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                {movie.map((sets) => {
                  return (
                    <Link key={sets.id} to={`/movies/${sets.id}`}>
                      <div
                        data-testid="movie-card"
                        id={sets.id}
                        className="group relative bg-white hover:opacity-80 transition-all"
                        style={{ borderRadius: "5px" }}
                      >
                        <div
                          data-testid="movie-poster"
                          className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none cursor-pointer h-96"
                          style={{
                            background: `url(https://image.tmdb.org/t/p/original/${sets.poster_path})`,
                            backgroundPosition: "center",
                            backgroundSize: "100% 100%",
                          }}
                        >
                          <div
                            className="p-2 flex flex-row-reverse cursor-pointer"
                            style={{ transition: "0.5s all ease-in-out" }}
                          >
                            <div
                              onClick={setLike}
                              style={{
                                border: "none",
                                padding: "5px",
                                width: "fit-content",
                                borderRadius: "50%",
                                background: "#fafafc79",
                              }}
                            >
                              <FaHeart
                                style={{ color: `${like ? "red" : "#d2d5dc"}` }}
                              />
                            </div>
                          </div>
                        </div>
                        <span
                          data-testid="movie-release-date"
                          className="mb-2 font-bold"
                          style={{ color: "#b0b4bf", fontSize: "11px" }}
                        >
                          {sets.release_date}
                        </span>
                        <div className="block">
                          <div>
                            <h3 className="my-2 text-sm text-[#111828]">
                              <b className="text-xl" data-testid="movie-title">
                                {sets.original_title}
                              </b>
                            </h3>
                            <div className="my-2 flex justify-between">
                              <div className="flex items-center">
                                <img
                                  src={imob}
                                  alt="imob"
                                  style={{ width: "30px", height: "13px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "13px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  76.0 / 100
                                </span>
                              </div>
                              <div className="flex items-center">
                                <img
                                  src={tomato}
                                  alt="tomato"
                                  style={{ width: "18px", height: "13px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "13px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  {sets.vote_average.toFixed(1)}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span
                                className="mt-1 font-semibold block text-[#9ca4af]"
                                style={{ fontSize: "13px" }}
                              >
                                Action, Adventure, Thriller
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="my-5"></div>
      <Footer />
    </div>
  );
};

export default Movies;
