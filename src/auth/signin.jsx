import React, { useRef, useState } from "react";
import Header from "../componenet/header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Signin = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  const handlebtn = (e) => {
    e.preventDefault();

    let user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setLoading(true);
    axios
      .post("http://localhost:8000/auth/login", user, { withCredentials: true })
      .then((res) => {
        setLoading(false);
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

  return (
    <div>
      <Header showMenu={false} />

      <div className="signin row  justify-content-center align-items-baseline  pt-0 g-0">
        <div className="col-11  col-sm-9  col-md-6 col-lg-5  text-bg-light mt-5 rounded-3  shadow border border-1">
          <form className="row  justify-content-center gy-3  p-4" dir="ltr" onSubmit={handlebtn}>
            <legend className=" h3 fw-normal text-success mb-0" htmlFor="tt">
              Sign in to your Account
            </legend>
            <div className="form-text" id="tt">
              Please enter following information to login to your account
            </div>
            <hr className="" />

            <div className="col-12">
              <label htmlFor="email" className="form-label mb-1">
                Email Address:
                <span className="required">*</span>
              </label>
              <input type="email" className="form-control" name="email" id="email" ref={emailRef} required />
            </div>

            <div className="col-12">
              <label htmlFor="password" className="form-label mb-1">
                Password:
                <span className="required">*</span>
              </label>
              <input type="password" className="form-control" name="password" id="password" ref={passwordRef} required />
            </div>
            {loading ? (
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              ""
            )}
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-success w-50 mb-1">
                SIGN IN
              </button>
              <div>
                <p className="small fw-lighter m-0 d-inline">Don't have an Account?</p>
                <p className="text-primary d-inline pointer" onClick={handleNavigateToRegister}>
                  {" "}
                  Sign Up
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
