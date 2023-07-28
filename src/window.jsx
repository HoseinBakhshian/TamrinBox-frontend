import React, { useContext, useEffect, useState } from "react";
import Body from "./body";
import Footer from "./footer";
import Header from "./header";
import Offcanvas from "./offcanvas";
import { MainContext } from "./context/MainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Window = () => {

  let [id, SetId] = useState("");
  let [class_id, set_Class_id] = useState("");



  return (
    <div id="window">
      <MainContext.Provider value={{ id, SetId, class_id, set_Class_id }}>
        <Header showMenu={true} />
        <Body />
        <Offcanvas />
        <Footer />
      </MainContext.Provider>
    </div>
  );
};

export default Window;
