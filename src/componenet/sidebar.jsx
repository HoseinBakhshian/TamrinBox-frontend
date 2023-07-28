import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignOut =()=>{
        axios
      .get(`http://localhost:8000/users/logout`, { withCredentials: true })
      .then((res) => {
        if (res.data.logout) {
          navigate("/signin");
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div id="sidebar" className="pt-2 bg-success">
      <div id="sidebar-list">
        <ul className="list-unstyled text-center text-md-end">
          <li>
            <NavLink to="/users/dashboard" className={({ isActive }) => {return isActive ? "nav-active" : ""}}>
              <i className="bi bi-house ms-1"></i>
              <span className="">خانه</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/users/profile" className={({ isActive }) => {return isActive ? "nav-active" : ""}}>
              <i className="bi bi-person ms-1"></i>
              <span className="">پروفایل</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/users/createClass" className={({ isActive }) => {return isActive ? "nav-active" : ""}}>
              <i className="bi bi-file-earmark-plus ms-1"></i>
              <span className="">ایجاد کلاس جدید</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/users/joinclass" className={({ isActive }) => {return isActive ? "nav-active" : ""}}>
              <i className="bi bi-folder-plus ms-1"></i>
              <span className="">اضافه شدن به کلاس</span>
            </NavLink>
          </li>

          <li>
            <NavLink  className={({ isActive }) => {return isActive ? "nav_active" : ""}} onClick={handleSignOut}>
              <i className="bi bi-box-arrow-right ms-1"></i>
              <span className="">خروج</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
