import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import swal from "sweetalert";

const Profile = () => {
  const { id, SetId } = useContext(MainContext);

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const previousPasswordRef = useRef();
  const newPasswordRef = useRef();
  const navigate = useNavigate();

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
    } else {
      axios
        .get(`http://localhost:8000/users/getUser/${id}`)
        .then((res) => {
          fnameRef.current.value = res.data.user.first_name;
          lnameRef.current.value = res.data.user.last_name;
          emailRef.current.value = res.data.user.email;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const handleEditInfo = (e) => {
    e.preventDefault();
    let newInfo = {
      id: id,
      first_name: fnameRef.current.value,
      last_name: lnameRef.current.value,
      email: emailRef.current.value,
    };

    axios
      .put(`http://localhost:8000/users/updateUser`, newInfo)
      .then((res) => {
        swal({
          title: res.data.msg,
          icon: "success",
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    let newInfo = {
      id: id,
      previousPassword: previousPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
    };

    axios
      .put(`http://localhost:8000/users/updatePassword`, newInfo)
      .then((res) => {
        if (res.data.updated) {
          swal({
            title: res.data.msg,
            icon: "success",
            timer: 1500,
          });
        } else {
          swal({
            title: res.data.msg,
            icon: "error",
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="row justify-content-center align-items-baseline  pt-5 pb-5" dir="ltr">
        <div className="col-11   col-md-10 col-lg-8 col-xl-7 m-3  text-bg-light rounded-3  shadow border border-1">
          <form action="" className="row p-3  justify-content-between gy-3" dir="ltr" onSubmit={handleEditInfo}>
            <legend className=" h4 fw-normal text-success mb-0" htmlFor="tt">
              Edit Informations
            </legend>
            <hr className="" />
            <div className="col-12 col-sm-6 col-lg-12 col-xl-6">
              <label htmlFor="firstname" className="form-label mb-1">
                First Name
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="firstname" id="firstname" ref={fnameRef} required />
            </div>

            <div className="col-12 col-sm-6 col-lg-12 col-xl-6">
              <label htmlFor="lastname" className="form-label mb-1">
                Last Name
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="lastname" id="lastname" ref={lnameRef} required />
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label mb-1">
                Email
                <span className="required">*</span>
              </label>
              <input type="email" className="form-control" name="email" id="email" ref={emailRef} required />
            </div>

            <div className="col-12 row justify-content-center">
                <button type="submit" className="btn btn-success col-4 mt-2">
                  Edit
                </button>
            </div>
          </form>
        </div>

        <div className="col-11  col-md-10  col-lg-8 col-xl-7 m-3 text-bg-light rounded-3  shadow border border-1">
          <form action="" className="row p-3  justify-content-between gy-3" dir="ltr" onSubmit={handleChangePassword}>
            <legend className=" h4 fw-normal text-success mb-0" htmlFor="tt">
              Change Password
            </legend>
            <hr className="" />

            <div className="col-12">
              <label htmlFor="password" className="form-label mb-1">
                Previous Password
                <span className="required">*</span>
              </label>
              <input type="password" className="form-control" name="password" id="password" ref={previousPasswordRef} required />
            </div>

            <div className="col-12">
              <label htmlFor="password" className="form-label mb-1">
                New Password
                <span className="required">*</span>
              </label>
              <input type="password" className="form-control" name="password" id="password" ref={newPasswordRef} required />
            </div>

            <div className="col-12 row justify-content-center">
              <button type="submit" className="btn btn-success col-4 mt-2">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
