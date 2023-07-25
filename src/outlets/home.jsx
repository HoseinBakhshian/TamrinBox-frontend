import React, { useContext, useEffect, useState } from "react";
import Card from "./card";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../footer";

const Home = () => {
  const { id, SetId, class_id, set_Class_id } = useContext(MainContext);
  const [Fname, setFname] = useState([]);
  const [Lname, setLname] = useState([]);
  const [Email, setEmail] = useState([]);
  const [myClasses, SetmyClasses] = useState([]);
  const [otherClasses, SetOtherClasses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${id}`)
      .then((res) => {
        setFname(res.data.user.first_name);
        setLname(res.data.user.last_name);
        setEmail(res.data.user.email);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:8000/classes/${id}`)
      .then((res) => {
        SetmyClasses(res.data.classes);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://localhost:8000/classes/get_several_classes/${id}`)
      .then((res) => {
        SetOtherClasses(res.data.classes);
        //  console.log(res.data.classes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div id="home" className=" p-4 ">
        <div id="home_list">
          <div id="master">
            <b>استاد</b>
            <hr />
            {myClasses.length == 0 ? <h3>کلاسی وجود ندارد</h3> : ""}
            <div id="master_list" className="row  g-3 mt-1 pe-2 ps-2">
              {myClasses.map((item) => (
                <div
                  key={Math.random()}
                  className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4  d-flex card_container"
                  onClick={(e) => {
                    e.preventDefault();
                    set_Class_id(item._id);
                    navigate("/users/course");
                  }}
                >
                  <Card name={item.class_name} master={"محمد حسین شکریان"} members={item.memebers.length} thumbnail={item.thumbnail} _id={item._id} />
                </div>
              ))}
            </div>
          </div>

          <div id="student">
            <b>دانشجو</b>
            <hr />
            {otherClasses.length == 0 ? <h3>کلاسی وجود ندارد</h3> : ""}
            <div id="master_list" className="row g-3 mt-1 pe-2 ps-2">
              {otherClasses.map((item) => (
                <div
                  key={Math.random()}
                  className=" col-6 col-sm-6 col-md-6 col-lg-4 d-flex card_container"
                  onClick={(e) => {
                    e.preventDefault();
                    set_Class_id(item._id);
                    navigate("/users/othersCourse");
                  }}
                >
                  <Card name={item.class_name} master={"محمد حسین شکریان"} members={"khali"} thumbnail={item.thumbnail} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
