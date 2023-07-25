import React, { useContext, useEffect, useState } from "react";
import Body from "./body";
import Footer from "./footer";
import Header from "./header";
import Offcanvas from "./offcanvas";
import { MainContext } from "./context/MainContext";
import axios from "axios";

const Window = () => {
  
  return (
    <div id="window">
      <Header showMenu={true} />
      <Body />
      <Offcanvas />
      <Footer />
    </div>
  );
};

export default Window;
