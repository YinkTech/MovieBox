import React from "react";
import App from "./App.jsx";
import { Route, Routes } from "react-router-dom";
import { Details } from "./container/Details.jsx";

export const SwitchRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} exact />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </>
  );
};
