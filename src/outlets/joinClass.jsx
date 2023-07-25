import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import swal from "sweetalert";

const JoinClass = () => {
  const { id, SetId } = useContext(MainContext);
  const [Fname, setFname] = useState([]);
  const [Lname, setLname] = useState([]);
  const [Email, setEmail] = useState([]);
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
  }, []);

  const handleAddClass = (e) => {
    e.preventDefault();
    var class_id = document.getElementById("class_id");
    var password = document.getElementById("password");
    let class_info = {
      class_id: class_id.value,
      user_id: id,
      password: password.value,
    };
    axios
      .post("http://localhost:8000/classes/add_to_class", class_info)
      .then((res) => {
        if (res.data.join == true) {
          swal({
            title: res.data.mess,
            icon: "success",
          });
        } else {
          swal({
            title: res.data.mess,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="row justify-content-center register pt-0 g-0">
      <div className="col-10  col-sm-9  col-md-7 col-lg-6 col-xl-5 text-bg-light mt-5 rounded-3  shadow border border-1">
        <form action="" className="row p-4  justify-content-between gy-3" dir="ltr" onSubmit={handleAddClass}>
          <legend className=" h3 fw-normal text-success mb-0" htmlFor="tt">
            Join new class
          </legend>
          <div className="form-text" >
            Please enter following information to join new class
          </div>
          <hr />
          <div className="col-12">
            <label htmlFor="class_id" className="form-label mb-1" aria-required>
              Class ID
            </label>
            <span className="required">*</span>
            <input type="text" className="form-control" name="class_id" id="class_id" />
          </div>

          <div className="col-12">
            <label htmlFor="password" className="form-label mb-1">
              Password
            </label>
            <input type="password" className="form-control" name="password" id="password" />
          </div>

          <div className="col-4 justify-content-center">
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinClass;
