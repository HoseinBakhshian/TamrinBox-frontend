import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import axios from "axios";
import swal from "sweetalert";

const Register = (props) => {
  const navigate = useNavigate();
  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handlebtn = (e) => {
    e.preventDefault();
    let newUser = {
      first_name: fnameRef.current.value,
      last_name: lnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axios.post("http://localhost:8000/auth/register", newUser).then((res) => {
      console.log(res);
      if (res.data == "420") {
        swal("موفقیت امیز", "حساب شما با موفقیت ایجاد شد", "success");
        navigate("/signin");
      } else if (res.data == "419") {
        swal("خطا", "حساب کاربری با این ایمیل قبلا ثبت شده است", "error");
      } else {
        swal("خطا", "خطا از سمت سرور", "error");
      }
    });
  };

  return (
    <div>
      <Header showMenu={false} />
      <div className="row justify-content-center register pt-0 g-0">
        <div className="col-10  col-sm-9  col-md-8 col-lg-7 col-xl-6 text-bg-light mt-5 rounded-3  shadow border border-1">
          <form action="" className="row p-4  justify-content-between gy-3" dir="ltr" onSubmit={handlebtn}>
            <legend className=" h3 fw-normal text-success mb-0" htmlFor="tt">
              Register
            </legend>
            <div className="form-text" id="tt">
              Please enter following information to register your account
            </div>
            <hr className="" />
            <div className="col-6">
              <label htmlFor="firstname" className="form-label mb-1">
                First Name
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="firstname" id="firstname" ref={fnameRef} />
            </div>

            <div className="col-6">
              <label htmlFor="lastname" className="form-label mb-1">
                Last Name
                <span className="required">*</span>
              </label>
              <input type="text" className="form-control" name="lastname" id="lastname" ref={lnameRef} />
            </div>

            <div className="col-9">
              <label htmlFor="email" className="form-label mb-1">
                Email
                <span className="required">*</span>
              </label>
              <input type="email" className="form-control" name="email" id="email" ref={emailRef} />
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
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
