import React, { useRef } from "react";
import Header from "../componenet/header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Signin = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handlebtn = (e) => {
    e.preventDefault();

    let user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios
      .post("http://localhost:8000/auth/login", user, { withCredentials: true })
      .then((res) => {
        if (res.data.login) {
          navigate("/users/dashboard");
        } else {
          swal("خطا", "اطلاعات نادرست است", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  // const handlebtn = (e) => {
  //   e.preventDefault();

  //   let user = {
  //     email: emailRef.current.value,
  //     password: passwordRef.current.value,
  //   };

  //   axios
  //     .post("http://localhost:8000/auth/login", user, {
  //       withCredentials: true,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       // alert();
  //       navigate("/users/home");
  //     });
  // };

  return (
    <div className="back-light">
      <Header showMenu={false} />
      <div className="row justify-content-center  pt-0 g-0">
        <div className="col-11  col-sm-8  col-md-7 col-lg-5 col-xl-5 text-bg-light mt-5 rounded-3  shadow border border-1">
          <form action="" className="row p-4  justify-content-center gy-3" dir="ltr" onSubmit={handlebtn}>
            <legend className=" h3 fw-normal text-success mb-0" htmlFor="tt">
              Sing in
            </legend>
            <div className="form-text" id="tt">
              Please enter following information to login to your account
            </div>
            <hr className="" />

            <div className="col-12">
              <label htmlFor="email" className="form-label mb-1">
                Email
                <span className="required">*</span>
              </label>
              <input type="email" className="form-control" name="email" id="email" ref={emailRef} required />
            </div>

            <div className="col-12">
              <label htmlFor="password" className="form-label mb-1">
                Password
                <span className="required">*</span>
              </label>
              <input type="password" className="form-control" name="password" id="password" ref={passwordRef} required />
            </div>

            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success p-1 ps-2 pe-2">
                Sign in
              </button>
              <div>
                <p className="small fw-lighter m-0 d-inline">Don't have an account?</p>
                <p className="text-primary d-inline pointer" onClick={handleNavigateToRegister}>
                  {" "}
                  sign up
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
