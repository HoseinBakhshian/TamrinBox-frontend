import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../context/MainContext";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditClass = (props) => {
  const { id, class_id } = useContext(MainContext);
  const classname = useRef();
  const password = useRef();
  const capacity = useRef();
  const [enable_password, set_Enable_Password] = useState(false);
  const [enable_capacity, set_Enable_Capacity] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    classname.current.value = props.classInfo.class_name;
    password.current.value = props.classInfo.password;
    capacity.current.value = props.classInfo.capacity;
  }, [props.update]);

  const handleEditClass = (e) => {
    e.preventDefault();
    let x = {
      class_id: class_id,
      class_name: classname.current.value,
      password: enable_password ? password.current.value : props.classInfo.password,
      capacity: enable_capacity ? capacity.current.value : props.classInfo.capacity,
    };
    axios
      .put("http://localhost:8000/classes/updateClass", x)
      .then((res) => {
        props.setUpdate(!props.update);
        swal({
          title: res.data.mess,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handle_Password = (e) => {
    set_Enable_Password(e.target.checked);
  };

  const handle_Capacity = (e) => {
    set_Enable_Capacity(e.target.checked);
  };

  const handleRemoveClass = () => {
    swal({
      title: "?Are you sure",
      text: "Once deleted, you will not be able to recover this class",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:8000/classes/removeClass/${class_id}`)
          .then((res) => {
            if (res.data.deleted) {
              swal({
                title: res.data.msg,
                icon: "success",
                timer: 1500,
              });
              navigate("/users/dashboard");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      <div className="modal fade" id="editClass" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editClass" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title h4" id="staticBackdropLabel">
                Edit Class
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <form className="row p-1  gy-3" dir="ltr" onSubmit={handleEditClass}>
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
                  <input type="text" className="form-control" name="password" id="password" disabled={enable_password ? "" : "disabled"} ref={password} required />
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

                <div className="col-12 text-center">
                  <div className="row justify-content-evenly">
                    <button type="submit" className="btn  btn-success col-3">
                      <i className="bi bi-pencil-fill me-1 "></i>
                      Edit
                    </button>
                    <button type="button" className="btn  btn-danger col-3" onClick={handleRemoveClass}>
                      <i className="bi bi-trash me-1"></i>
                      Remove
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClass;
