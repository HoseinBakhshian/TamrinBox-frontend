import React, { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { MainContext } from "../context/MainContext";
import { useContext } from "react";

const Register = () => {
  const { id } = useContext(MainContext);
  const [Fname, setFname] = useState([]);
  const [Lname, setLname] = useState([]);
  const [Email, setEmail] = useState([]);

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

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
  }, [id]);

  const handlebtn = (e) => {
    e.preventDefault();
    let newUser = {
      first_name: fnameRef.current.value,
      last_name: lnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
  };

  return (
    <div>
      <div className="row justify-content-center register pt-0 g-0">
        <div className="col-10  col-sm-9  col-md-8 col-lg-7 col-xl-6 text-bg-light mt-5 rounded-3  shadow border border-1">
          <form action="" className="row p-4  justify-content-between gy-3" dir="ltr" onSubmit={handlebtn}>
            <legend className=" h3 fw-normal text-success mb-0" htmlFor="tt">
              Edit Profile
            </legend>

            <hr className="" />
            <div className="col-6">
              <label htmlFor="firstname" className="form-label mb-1">
                First Name
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="firstname" id="firstname" ref={fnameRef} value={Fname} />
            </div>

            <div className="col-6">
              <label htmlFor="lastname" className="form-label mb-1">
                Last Name
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="lastname" id="lastname" ref={lnameRef} value={Lname} />
            </div>

            <div className="col-9">
              <label htmlFor="email" className="form-label mb-1">
                Email
                <span className="required">*</span>
              </label>
              <input type="email" className="form-control" name="email" id="email" ref={emailRef} value={Email} />
            </div>

            <div className="col-9">
              <label htmlFor="password" className="form-label mb-1">
                Password
                <span className="required">*</span>
              </label>
              <input type="password" className="form-control" name="password" id="password" ref={passwordRef} />
            </div>

            <div className="col-4">
              <button type="submit" className="btn btn-success">
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
