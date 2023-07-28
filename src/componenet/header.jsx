import React from "react";

const Header = (props) => {
  return (
    <div id="nav">
      <div id="nav_icon">
        <img src={require("../assets/tamrinbox-navbar.png")} alt="" />
      </div>

      <div className={`${props.showMenu == true ? "d-md-none" : "d-none"}`}>
        <div id="offcanvas_btn" className="d-md-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
