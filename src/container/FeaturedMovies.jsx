import React, { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import james from "./../assets/images/james.jpg";
import imob from "./../assets/images/imob.png";
import tomato from "./../assets/images/tomato.png";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeaturedMovies = () => {
  const [like, liked] = useState(false);
  const setLike = () => {
    liked(!like);
  };

  const [movie, setMovie] = useState([]);
  const [error, setError] = useState("");
  const apiAccess = import.meta.env.VITE_API_URL;
  const accessKey = import.meta.env.VITE_ACCESS_TOKEN;
  useEffect(() => {
    const getTopRated = async () => {
      try {
        const response = await fetch(`${apiAccess}`, {
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
    };
    getTopRated();
  }, [apiAccess, accessKey]);

  return (
    <div className=" my-8 md:container p-6 md:p-0 py-5 mx-auto">
      <div className="flex justify-between">
        <h3 className="text-3xl font-bold">Featured Movies</h3>

        <div
          className="flex items-center font-bold"
          style={{ color: "#cf4e6c" }}
        >
          <span style={{ fontSize: "13px" }} className="p-0">
            See more
          </span>
          <IoChevronForward className="p-0 mt-1 m-0" />
        </div>
      </div>
      {error ? (
        <p className="text-buttonred text-2xl max-[280]:text-base md:text-[36px]">
          {error}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {movie.slice(0, 10).map((sets) => {
            return (
              <Link to={`/details/${sets.id}`}>
                <div
                  data-testid:movie-card
                  key={sets.id}
                  id={sets.id}
                  className="group relative bg-white hover:opacity-80 transition-all"
                  style={{ borderRadius: "5px" }}
                >
                  <div
                    data-testid:movie-poster
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
                    data-testid:movie-release-date
                    className="mb-2 font-bold"
                    style={{ color: "#b0b4bf", fontSize: "11px" }}
                  >
                    {sets.release_date}
                  </span>
                  <div className="block">
                    <div>
                      <h3 className="my-2 text-sm text-[#111828]">
                        <b className="text-xl" data-testid:movie-title>
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
                            style={{ fontSize: "13px", marginLeft: "10px" }}
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
                            style={{ fontSize: "13px", marginLeft: "10px" }}
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
      )}
    </div>
  );
};

export default FeaturedMovies;
