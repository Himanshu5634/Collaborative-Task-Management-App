import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./styles/auth.scss";
import "./styles/globle.scss";
import "./styles/Navbar.scss";
import "./styles/Task.scss";
import "./styles/dashboard.scss"

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
