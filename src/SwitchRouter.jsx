import React from "react";
import App from "./App.jsx";
import { Route, Routes } from "react-router-dom";
import { Details } from "./container/Details.jsx";
import Movies from "./container/Movies.jsx";

export const SwitchRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} exact />
        <Route path="/movies" element={<Movies />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </>
  );
};
