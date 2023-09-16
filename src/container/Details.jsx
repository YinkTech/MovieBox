import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { BsFillPlayFill, BsFillBackspaceFill, BsDot } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import tag from "./../assets/images/TwoTickets.png";
import list from "./../assets/images/List.png";
import list2 from "./../assets/images/List2.png";
import Rectangle from "./../assets/images/Rectangle.png";
import { Center } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import logo from "./../assets/images/tv.png";
import { HiOutlineBars2 } from "react-icons/hi2";

export const Details = () => {
  const { id } = useParams();
  const [details, setMovies] = useState([]);
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_MOVIE_DETAILS;
  const accessKey = import.meta.env.VITE_ACCESS_TOKEN;

  useEffect(() => {
    const getMovies = async () => {
      try {
        if (id !== null) {
          const response = await fetch(`${apiUrl}${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessKey}`,
            },
          });
          const data = await response.json();
          setMovies(data);
        }
      } catch (err) {
        console.log(err);
        setError("Error getting movie details :(");
      }
    };

    getMovies();
  }, [id, accessKey, apiUrl]);

  const [showIframe, setShowIframe] = useState(false);

  console.log(error);

  return (
    <div className=" w-[min-content] md:w-[auto] overflow-hidden">
      <div className="md:hidden bg-[#555a]">
      <div className=" flex justify-between items-center">
        <div className="flex items-center p-1">
          <img src={logo} style={{ width: "33px" }} alt="logo" />
          <span className="text-black font-semibold mx-2">MovieBox</span>
        </div>

        <div className="flex items-center text-white p-1 sm:p-3 gap-1 sm:gap-2">
          <HiOutlineBars2
            className="bg-[#be113cd1] font-bolder"
            style={{ padding: "4px", borderRadius: "50%", fontSize: "24px" }}
          />
        </div>
      </div>
        <Link to="/">
          <BsFillBackspaceFill className="text-[#ca5555] mt-2 mx-3 text-3xl" />
        </Link>
      </div>

      <div className="flex bg-[fff]">
        <SideBar className="flex-1" />
        {Object.keys(details).length === 0 ? (
          <div className=" mt-72  md:ms-[200px] ms-[0]" style={{ flex: "2" }}>
            <div className="stage filter-contrast">
              <div class="dot-overtaking"></div>
            </div>
          </div>
        ) : (
          <div className=" p-4 md:ms-[200px] ms-[0]" style={{ flex: "2" }}>
            {showIframe ? (
              <iframe
                src={details.homepage}
                className="details-header  md:h-[450px] h-64"
                title="Iframe Example"
              ></iframe>
            ) : (
              <div
                onClick={() => setShowIframe(true)}
                className="details-header aspect-h-1 flex items-center justify-center mx-auto aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none cursor-pointer md:h-[450px] h-64"
                style={{
                  background: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`,
                  backgroundPosition: "center",
                  backgroundSize: "100% 100%",
                }}
              >
                <div>
                  <div
                    className="bg-[#ffffffa2] w-14 h-13 p-3 flex items-center  mx-auto"
                    style={{ borderRadius: "50%" }}
                  >
                    <BsFillPlayFill
                      className="text-[#fff] "
                      style={{ fontSize: "30px" }}
                    />
                  </div>
                  <h6 className="font-semibold text-white">Watch Trailer</h6>
                </div>
              </div>
            )}

            <div className="my-5 md:mx-3">
              <div className="flex text-center mx-auto items-center justify-between">
                <div className="lg:flex items-center">
                  <p
                    className="font-semibold text-[#4f4f4f] flex p-0 m-0 items-center text-[12px]  md:text-[20px] "
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <b data-testid="movie-title">{details.title}</b>{" "}
                    <BsDot className="mx-1 text-[#3f3f3f]" />{" "}
                    <span data-testid="movie-release-date">
                      {" "}
                      {details.release_date}
                    </span>{" "}
                    <BsDot className="mx-1 text-[#3f3f3f]" /> PG-13{" "}
                    <BsDot className="mx-1 text-[#3f3f3f]" />{" "}
                    <span className="mx-1">
                      <span data-testid="movie-runtime">
                        {" "}
                        {details.runtime}mins
                      </span>
                    </span>
                  </p>{" "}
                  <div className="flex py-4 lg:py-0  items-center">
                    {details.genres.map((genre) => (
                      <span
                        key={genre.id}
                        style={{
                          border: "1px solid #faedf2",
                          borderRadius: "20px",
                          fontSize: "10px",
                        }}
                        className="mx-2 text-[#ca5555] px-3 py-1 font-bold "
                      >
                        {" "}
                        {genre.name}{" "}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center font-semibold text-[12px]  md:text-[20px]">
                  <AiFillStar className="text-[#fed135] mx-3" />
                  {details && details.vote_average !== undefined && (
                    <span className="text-[#e8e8e8]">
                      {details.vote_average.toFixed(1)}
                    </span>
                  )}
                  <span
                    className="mx-2"
                    style={{
                      color: "#6e6e6e",
                    }}
                  >
                    |
                  </span>
                  <span style={{ color: "#6e6e6e" }}>350k</span>
                </div>
              </div>

              <div className="lg:flex my-4 lg:my-0 gap-9 items-center ">
                <div style={{ flex: "2" }}>
                  <div>
                    <p data-testid="movie-overview">{details.overview}</p>
                    <div
                      className="flex items-center my-3"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <label> Directors : </label>
                      <span className="text-[#c11f46] font-semibold mx-2">
                        Joseph
                      </span>
                    </div>
                    <div className="flex items-center my-3">
                      <label style={{ whiteSpace: "nowrap" }}>
                        {" "}
                        Writers :{" "}
                      </label>
                      <span className="text-[#c11f46] font-semibold mx-2">
                        Jim Cash, Jack Epps Jr, Peter Craig
                      </span>
                    </div>
                    <div className="flex items-center my-3">
                      <label style={{ whiteSpace: "nowrap" }}> Stars : </label>
                      <span className="text-[#c11f46] font-semibold mx-2">
                        Tom Cruise, Jennifer Connelly, Miles Teller
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between"
                      style={{ border: "1px solid #555", borderRadius: "10px" }}
                    >
                      <div
                        className="flex items-center"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <div
                          className="px-3 py-1 text-white bg-[#be113c]"
                          style={{
                            border: "1px solid #be113c",
                            borderRadius: "10px",
                          }}
                        >
                          Top rated movie #65
                        </div>
                        <div className="font-semibold mx-3">
                          {" "}
                          Awards 9 nominaitons{" "}
                        </div>
                      </div>
                      <div>
                        <RiArrowDropDownLine className="text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="flex items-center justify-center bg-[#be113c] text-[#fff] p-2 rounded-lg font-semibold mt-5 lg-mt-5">
                      {" "}
                      <img src={tag} alt="tag" className="mx-2" /> See Showtimes{" "}
                    </div>
                    <div
                      className="flex items-center justify-center bg-[#f8e8eb] text-[#000] p-2 rounded-lg font-semibold my-3"
                      style={{ border: "1px solid #be113c" }}
                    >
                      {" "}
                      <img src={list} alt="tag" className="mx-2" /> More Watch
                      options{" "}
                    </div>
                    <div
                      style={{
                        background: `url(${Rectangle})`,
                        backgroundPosition: Center,
                        backgroundSize: "100% 100%",
                      }}
                      className=" pt-52 lg:pt-40 mt-9 lg:mt-5"
                    >
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          borderRadius: "10px 10px 0px 0px",
                        }}
                        className="flex items-center justify-center bg-[#000000ba] text-[#fff] text-[13px] p-2"
                      >
                        <img src={list2} alt="list2" className="mx-2" />
                        The Best Movies and Shows in September
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
