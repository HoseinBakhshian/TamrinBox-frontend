import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
const Sidebar = () => {


  return (
    <div id="sidebar" className="pt-2 bg-success">
      <div id="sidebar-list">
        <ul className="list-unstyled text-center text-md-end">
          <li>
            <NavLink to="/users/dashboard" className={({ isActive }) => {return isActive ? "nav-active" : ""}}>
              <i className="bi bi-house ms-1"></i>
              {/* <i className="d-md-none bi bi-house fs-2"></i> */}
              {/* <span className="d-none d-md-inline">خانه</span> */}
              <span className="">خانه</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/users/profile" className={({ isActive }) => {return isActive ? "nav-active" : ""}}>
              <i className="bi bi-person ms-1"></i>
              {/* <i className="d-md-none bi bi-person fs-2"></i> */}
              {/* <span className="d-none d-md-inline">پروفایل</span> */}
              <span className="">پروفایل</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/users/addclass" className={({ isActive }) => {return isActive ? "nav-active" : ""}}>
              <i className="bi bi-file-earmark-plus ms-1"></i>
              {/* <i className="d-md-none bi bi-file-earmark-plus fs-2"></i> */}
              {/* <span className="d-none d-md-inline">ایجاد کلاس جدید</span> */}
              <span className="">ایجاد کلاس جدید</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/users/joinclass" className={({ isActive }) => {return isActive ? "nav-active" : ""}}>
              <i className="bi bi-folder-plus ms-1"></i>
              {/* <i className="d-md-none bi bi-folder-plus fs-2"></i> */}
              {/* <span className="d-none d-md-inline">اضافه شدن به کلاس</span> */}
              <span className="">اضافه شدن به کلاس</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/signin" className={({ isActive }) => {return isActive ? "nav_active" : ""}}>
              <i className="bi bi-box-arrow-right ms-1"></i>
              {/* <i className="d-md-none bi bi-box-arrow-right fs-2"></i> */}
              {/* <span className="d-none d-md-inline">خروج</span> */}
              <span className="">خروج</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
