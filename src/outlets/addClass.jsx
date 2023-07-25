import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../context/MainContext";
import swal from "sweetalert";
import axios from "axios";

const Addclass = () => {
  const { id, SetId } = useContext(MainContext);
  const classname = useRef();
  const password = useRef();
  const capacity = useRef();

  const [Fname, setFname] = useState([]);
  const [Lname, setLname] = useState([]);
  const [Email, setEmail] = useState([]);
  const [thumbnail, set_Thumbnail] = useState("");
  const [enable_password, set_Enable_Password] = useState(false);
  const [enable_capacity, set_Enable_Capacity] = useState(false);


  
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

    let new_class = {
      class_name: classname.value,
      password: enable_password ? password.value : "",
      capacity: enable_capacity ? capacity.value : "",
      thumbnail: thumbnail,
      owner: id.toString(),
    };
    axios
      .post(`http://localhost:8000/classes`, new_class)
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

  const handle_Thumbnail = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      set_Thumbnail(reader.result);
    };
    reader.onerror = () => {
      console.log("errror");
    };
  };

  const handle_Password = (e) => {
    set_Enable_Password(e.target.checked);
  };

  const handle_Capacity = (e) => {
    set_Enable_Capacity(e.target.checked);
  };

  return (
    <div className="row justify-content-center register pt-0 g-0">
      <div className="col-10  col-sm-9  col-md-8 col-lg-7 col-xl-6 text-bg-light mt-5 rounded-3  shadow border border-1">
        <form action="" className="row p-4  gy-3" dir="ltr" onSubmit={handleAddClass}>
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
              <label htmlFor="password" className="form-label mb-1 d-flex" for="enable_password">
                Password
              </label>
            </div>
            <input type="password" className="form-control" name="password" id="password" disabled={enable_password ? "" : "disabled"} ref={password} required />
          </div>

          <div className="col-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="enable_capacity" onChange={handle_Capacity} />
              <label htmlFor="capacity" className="form-label mb-1" id="enable_capacity">
                Capacity
              </label>
            </div>

            <input type="number" className="form-control" name="capacity" id="capacity" min="2" disabled={enable_capacity ? "" : "disabled"} ref={capacity} required />
          </div>

          <div className="col-12">
            <label htmlFor="Thumbnail" className="form-label mb-1">
              Class Thumbnail
            </label>
            <input type="file" className="form-control" name="Thumbnail" id="Thumbnail" accept="image/*" onChange={handle_Thumbnail} />
          </div>

          <div className="col-4">
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
          {/* <Card name={"khali"} master={"khali"} institution={"khali"} members={"khali"} semester={"khali"} thumbnail={thumbnail}/> */}
        </form>
      </div>
    </div>
  );
};

export default Addclass;
