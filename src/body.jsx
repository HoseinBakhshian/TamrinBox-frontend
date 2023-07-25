import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const Body = () => {
  return (
    <div id="body" className="row  g-0">
      <div className="d-none d-md-block col-md-3 col-xl-2 " id="sidebar_container">
        <Sidebar />
      </div>
       <div className="col-12  col-md-9 col-xl-10 custom-height" id="outlet_container">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
