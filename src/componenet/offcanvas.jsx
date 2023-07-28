import React from "react";
import { NavLink } from "react-router-dom";

const Offcanvas = () => {
  return (
    <div>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            منو
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div id="offcanvas-list">
            <ul className="list-unstyled text-center">
              <li>
                <NavLink
                  to="/users/dashboard"
                  className={({ isActive }) => {
                    return isActive ? "offcanvas_active" : "";
                  }}
                >
                  <i className="bi bi-house ms-1"></i>
                  <span className="">خانه</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/users/profile"
                  className={({ isActive }) => {
                    return isActive ? "offcanvas_active" : "";
                  }}
                >
                  <i className="bi bi-person ms-1"></i>
                  <span className="">پروفایل</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/users/createClass"
                  className={({ isActive }) => {
                    return isActive ? "offcanvas_active" : "";
                  }}
                >
                  <i className="bi bi-file-earmark-plus ms-1"></i>
                  <span className="">ایجاد کلاس جدید</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/users/joinclass"
                  className={({ isActive }) => {
                    return isActive ? "offcanvas_active" : "";
                  }}
                >
                  <i className="bi bi-folder-plus ms-1"></i>
                  <span className="">اضافه شدن به کلاس</span>
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => {
                    return isActive ? "offcanvas_active" : "";
                  }}
                >
                  <i className="bi bi-box-arrow-right ms-1"></i>
                  <span className="">خروج</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offcanvas;
