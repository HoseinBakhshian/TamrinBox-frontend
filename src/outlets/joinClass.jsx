import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const JoinClass = () => {
  const { id, SetId } = useContext(MainContext);
  const navigate = useNavigate();
  const class_id = useRef();
  const password = useRef();

  useEffect(() => {
    if (id == "") {
      axios
        .get(`http://localhost:8000/users/getCurrentUserID`, { withCredentials: true })
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
    }
  }, []);

  const handleJoinClass = (e) => {
    e.preventDefault();
    let class_info = {
      class_id: class_id.current.value,
      user_id: id,
      password: password.current.value,
    };
    axios
      .post("http://localhost:8000/classes/joinClass", class_info)
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
        <form action="" className="row p-4  justify-content-between gy-3" dir="ltr" onSubmit={handleJoinClass}>
          <legend className=" h3 fw-normal text-success mb-0" htmlFor="tt">
            Join new class
          </legend>
          <div className="form-text">Please enter following information to join new class</div>
          <hr />
          <div className="col-12">
            <label htmlFor="class_id" className="form-label mb-1" aria-required>
              Class ID
            </label>
            <span className="required">*</span>
            <input type="text" className="form-control" name="class_id" id="class_id" ref={class_id} />
          </div>

          <div className="col-12">
            <label htmlFor="password" className="form-label mb-1">
              Password
            </label>
            <input type="password" className="form-control" name="password" id="password" ref={password} />
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
