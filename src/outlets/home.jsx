import React, { useContext, useEffect, useState } from "react";
import Card from "./card";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "../footer";

const Home = () => {
  const { id, SetId, class_id, set_Class_id } = useContext(MainContext);

  const [myClasses, SetmyClasses] = useState([]);
  const [otherClasses, SetOtherClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      axios
        .get(`http://localhost:8000/users/getCurrentUserID/55`, { withCredentials: true })
        .then((res) => {
          if (res.data.authenticated) {
            SetId(res.data.id);
          } else {
            navigate("signin");
          }
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
        })
        .catch((err) => {
          console.log(err);
        });
    
  }, [id]);

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
                    navigate("/users/myClass");
                  }}
                >
                  <Card name={item.class_name} master={item.owner} members={item.memebers} thumbnail={item.thumbnail != "" ? item.thumbnail : "http://localhost:8000/default_class_Thumbnail.jpeg"} _id={item._id} />
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
                  className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4  d-flex card_container"
                  onClick={(e) => {
                    e.preventDefault();
                    set_Class_id(item._id);
                    navigate("/users/othersClass");
                  }}
                >
                  <Card name={item.class_name} master={item.owner} members={item.memebers} thumbnail={item.thumbnail != "" ? item.thumbnail : "http://localhost:8000/default_class_Thumbnail.jpeg"} />
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
