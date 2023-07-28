import React, { useState } from "react";
import Body from "./body";
import Footer from "./componenet/footer";
import Header from "./componenet/header";
import Offcanvas from "./componenet/offcanvas";
import { MainContext } from "./context/MainContext";

const Window = () => {
  let [id, SetId] = useState("");
  let [class_id, set_Class_id] = useState("");

  return (
    <div id="window">
      <MainContext.Provider value={{ id, SetId, class_id, set_Class_id }}>
        <Header showMenu={true} />
        <Body />
        <Offcanvas />
        {/* <Footer /> */}
      </MainContext.Provider>
    </div>
  );
};

export default Window;
