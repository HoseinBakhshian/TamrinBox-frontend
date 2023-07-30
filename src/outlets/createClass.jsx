import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../context/MainContext";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateClass = () => {
  const { id, SetId } = useContext(MainContext);
  const classname = useRef();
  const password = useRef();
  const capacity = useRef();
  const thumbnail = useRef();
  const [enable_password, set_Enable_Password] = useState(false);
  const [enable_capacity, set_Enable_Capacity] = useState(false);
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
    }
  }, []);

  const handleCreateClass = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("class_name", classname.current.value);
    formData.append("password", password.current.value);
    formData.append("capacity", capacity.current.value);
    formData.append("thumbnail", thumbnail.current.files[0]);
    formData.append("owner", id.toString());

    axios
      .post("http://localhost:8000/classes/createClass", formData)
      .then((res) => {
        if (res.status == 200) {
          swal({
            title: res.data.mess,
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handle_Password = (e) => {
    if(!e.target.checked){
      password.current.value="";
    }
    set_Enable_Password(e.target.checked);
  };

  const handle_Capacity = (e) => {
    if(!e.target.checked){
      capacity.current.value="";
    }
    set_Enable_Capacity(e.target.checked);
  };

  return (
    <div className="row justify-content-center align-items-baseline pt-0 g-0">
      <div className="col-10  col-sm-9  col-md-8 col-lg-7 col-xl-6 text-bg-light mt-5 rounded-3  shadow border border-1">
        <form action="" className="row p-4  gy-3" dir="ltr" onSubmit={handleCreateClass}>
          <legend className=" h3 fw-normal text-success mb-0" htmlFor="tt">
            Create new class
          </legend>
          <div className="form-text">Please enter following information to create new class</div>
          <hr />
          <div className="col-12">
            <label htmlFor="classname" className="form-label mb-1">
              Class Name
            </label>
            <span className="required">*</span>
            <input type="text" className="form-control" name="classname" id="classname" ref={classname} required />
          </div>

          <div className="col-8">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="enable_password" onChange={handle_Password} />
              <label className="form-label mb-1 d-flex" htmlFor="enable_password">
                Password
              </label>
            </div>
            <input type="password" className="form-control" name="password" id="password" disabled={enable_password ? "" : "disabled"} ref={password} required />
          </div>

          <div className="col-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="enable_capacity" onChange={handle_Capacity} />
              <label htmlFor="enable_capacity" className="form-label mb-1">
                Capacity
              </label>
            </div>

            <input type="number" className="form-control" name="capacity" id="capacity" min="0" disabled={enable_capacity ? "" : "disabled"} ref={capacity} required />
          </div>

          <div className="col-12">
            <label htmlFor="Thumbnail" className="form-label mb-1">
              Class Thumbnail
            </label>
            <input type="file" className="form-control" name="Thumbnail" id="Thumbnail" ref={thumbnail} accept="image/*" />
          </div>

          <div className="col-4">
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
