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
import { formatToUTC } from "../utc/UtcFormat";

export const Details = () => {
  const { id } = useParams();
  const [details, setMovies] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [creditsStar, setCreditsStar] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [creditsWriters, setCreditsWriters] = useState([]);
  const [error, setError] = useState("");
  const apiUrl = import.meta.env.VITE_MOVIE_DETAILS;
  const accessKey = import.meta.env.VITE_ACCESS_TOKEN;
  const langUs = "?language=en-US";

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

  useEffect(() => {
    const getVideos = async () => {
      try {
        if (id !== null) {
          const response = await fetch(`${apiUrl}${id}/videos${langUs}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessKey}`,
            },
          });
          const data = await response.json();
          const trailerVideos = data.results.filter(
            (video) => video.type === "Trailer"
          );

          if (trailerVideos.length > 0) {
            setVideos([trailerVideos[0]]);
          } else {
            setVideos([]);
          }
        }
      } catch (err) {
        console.log(err);
        setError("Error getting movie details :(");
      }
    };

    const getSimilarMovies = async () => {
      try {
        if (id !== null) {
          const response = await fetch(`${apiUrl}${id}/similar${langUs}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessKey}`,
            },
          });

          const data = await response.json();
          const movieSilimarSlice = data.results.slice(0, 3);
          if (movieSilimarSlice.length > 0) {
            const setunknownSimilar = [movieSilimarSlice];
            setSimilar(setunknownSimilar[0]);
          } else {
            setSimilar([]);
          }
        }
      } catch (err) {
        console.log(err);
        setError("Error getting movie details :(");
      }
    };

    const getCreditsMovies = async () => {
      try {
        if (id !== null) {
          const response = await fetch(`${apiUrl}${id}/credits${langUs}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessKey}`,
            },
          });

          const data = await response.json();
          setDirectors(data.crew.filter((person) => person.job === "Director"));
          setCreditsWriters(
            data.crew.filter((person) => person.department === "Writing")
          );
          setCreditsStar(data.cast.slice(0, 3));
        }
      } catch (err) {
        console.log(err);
        setError("Error getting movie details :(");
      }
    };

    getVideos();
    getSimilarMovies();
    getCreditsMovies();
  }, [id, accessKey]);

  const [showIframe, setShowIframe] = useState(false);
  return (
    <div className=" md:w-[auto] overflow-hidden">
      <div className="md:hidden">
        <div className=" flex bg-[#f8e8eb] justify-between items-center">
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
        <Link to="/">
          <BsFillBackspaceFill className="text-[#ca5555] mt-2 mx-3 text-3xl" />
        </Link>
      </div>

      <div className="flex ">
        <SideBar className="flex-1" />
        {Object.keys(details).length === 0 ? (
          <div className=" m-auto  md:ms-[200px] ms-[0]" style={{ flex: "2" }}>
            <div className=" w-fit mx-auto h-full flex flex-col mt-[50%] sm:mt-[20%] md:mt-[25%]">
              <div className="stage w-[200px] mx-auto filter-contrast">
                <div className="dot-overtaking"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" p-4 md:ms-[200px] ms-[0]" style={{ flex: "2" }}>
            {showIframe ? (
              <iframe
                className="details-header  md:h-[450px] h-64"
                src={`https://www.youtube.com/embed/${videos[0].key}?si=UQNihStM29H5QHzN`}
                title={details.title}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
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
                  <div className="font-semibold text-[#4f4f4f] xl:flex p-0 m-0 items-center ">
                    <div className="flex items-center">
                      <b
                        data-testid=" movie-title block text-[14px]  md:text-[20px]"
                        style={{ textAlign: "start" }}
                      >
                        {details.title}
                      </b>{" "}
                      <BsDot className="mx-1 text-[#3f3f3f]" />{" "}
                    </div>
                    <div
                      style={{ whiteSpace: "" }}
                      className="flex items-center  text-[10px]  md:text-[14px]"
                    >
                      <span data-testid="movie-release-date ">
                        {" "}
                        {formatToUTC(details.release_date)}
                      </span>{" "}
                      <BsDot className="mx-1 text-[#3f3f3f]" /> PG-13{" "}
                      <BsDot className="mx-1 text-[#3f3f3f]" />{" "}
                      <span
                        className="mx-1  text-[10px]  md:text-[16px]"
                        data-testid="movie-runtime"
                      >
                        {" "}
                        {details.runtime}mins
                      </span>
                    </div>
                  </div>{" "}
                  <div className="flex justify-between items-center">
                    <div className=" md:flex md:py-4 lg:py-0 ">
                      {details.genres.map((genre) => (
                        <span
                          key={genre.id}
                          style={{
                            border: "1px solid #faedf2",
                            borderRadius: "20px",
                            fontSize: "10px",
                          }}
                          className="mx-2 items-end text-[#ca5555] px-3 py-1 font-bold "
                        >
                          {" "}
                          {genre.name}{" "}
                        </span>
                      ))}
                    </div>
                    <div className="flex-end flex lg:hidden items-center font-semibold text-[12px]  md:text-[20px]">
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
                </div>

                <div className="hidden lg:flex items-center font-semibold text-[12px]  md:text-[20px]">
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
                  <div className=" text-[10px]  md:text-[16px]">
                    <p data-testid="movie-overview">{details.overview}</p>
                    <div
                      className="flex items-center my-3"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <label> Directors : </label>
                      {directors.map((credit) => {
                        return (
                          <span
                            key={credit.id}
                            className="text-[#c11f46] font-semibold mx-2"
                          >
                            {credit.name}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex items-center my-3">
                      <label style={{ whiteSpace: "nowrap" }}>
                        {" "}
                        Writers :{" "}
                      </label>
                      {creditsWriters.slice(0, 3).map((credit) => {
                        return (
                          <span
                            key={credit.id}
                            className="text-[#c11f46] font-semibold mx-2"
                          >
                            {credit.name}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex items-center my-3">
                      <label style={{ whiteSpace: "nowrap" }}> Stars : </label>

                      {creditsStar.map((credit) => {
                        return (
                          <span
                            key={credit.id}
                            className="text-[#c11f46] font-semibold mx-2"
                          >
                            {credit.name}
                          </span>
                        );
                      })}
                    </div>
                    <div
                      className="flex items-center justify-between"
                      style={{
                        border: "1px solid #555",
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        className="flex items-center"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <div
                          className="px-3 py-1 text-[10px]  md:text-[16px] text-white bg-[#be113c]"
                          style={{
                            border: "1px solid #be113c",
                            borderRadius: "10px",
                          }}
                        >
                          Top rated movie #65
                        </div>
                        <div className="font-semibold mx-3  text-[10px]  md:text-[16px]">
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
                <div style={{ flex: "1" }}>
                  <div>
                    <div className="flex items-center justify-center bg-[#be113c] text-[#fff] p-2 rounded-lg font-semibold mt-5 lg-mt-5">
                      {" "}
                      <img src={tag} alt="tag" className="mx-2" /> See Showtimes{" "}
                    </div>
                    <Link to={`/seemore`}>
                    <div
                      className="flex items-center justify-center bg-[#f8e8eb] text-[#000] p-2 rounded-lg font-semibold my-3"
                      style={{ border: "1px solid #be113c" }}
                    >
                      {" "}
                      <img src={list} alt="tag" className="mx-2" /> 
                      More Watch options{" "}
                    </div></Link>
                    <div
                      style={{
                        backgroundPosition: Center,
                        backgroundSize: "100% 100%",
                      }}
                      className=" mt-9 lg:mt-5"
                    >
                      <div
                        style={{ borderRadius: "20px" }}
                        className="grid gap-2 grid-cols-3"
                      >
                        {similar.map((simila) => {
                          return (
                            <Link
                              key={simila.id}
                              target="_blank"
                              to={`/movies/${simila.id}`}
                            >
                              <img
                                className="h-[200px] w-full"
                                loading="lazy"
                                src={`https://image.tmdb.org/t/p/original/${simila.poster_path}`}
                                alt={simila.original_title}
                              />
                            </Link>
                          );
                        })}
                      </div>
                      <Link to={`/seemore`}>
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
                      </Link>
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
