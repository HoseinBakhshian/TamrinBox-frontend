import axios from "axios";
import React, { useContext, useRef } from "react";
import swal from "sweetalert";
import { MainContext } from "../context/MainContext";

const AddCourse = (props) => {
  const { id, class_id } = useContext(MainContext);
  const title = useRef();
  const description = useRef();
  const date = useRef();
  const file = useRef();

  const handleAddCourse = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("class_id", class_id);
    formData.append("title", title.current.value);
    formData.append("description", description.current.value);
    formData.append("deadline", date.current.value);
    formData.append("file", file.current.files[0]);


    axios
      .post("http://localhost:8000/courses/createCourse", formData)
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

  return (
    <div>
      <form onSubmit={handleAddCourse} id="addCourseform">
        <div className="modal fade" id="addCourse" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addCourse" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-fullscreen-md-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title h4" id="staticBackdropLabel">
                  Add new Course
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label mb-1">
                    Title
                  </label>
                  <span className="required">*</span>

                  <input type="text" className="form-control" id="Title" ref={title} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label mb-1">
                    Description :
                  </label>
                  <textarea className="form-control" id="description" rows="3" ref={description}></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="fileDate" className="form-label">
                    Deadline
                  </label>
                  <input className="form-control" type="datetime-local" id="fileDate" ref={date} />
                </div>

                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Upload your file below
                  </label>
                  <span className="required">*</span>

                  <input className="form-control" type="file" id="formFile" accept=".zip,.pdf" ref={file} required />
                </div>
              </div>

              <div className="modal-footer text-center">
                <div className="col-12">
                  <button type="submit" className="btn btn-success col-3">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
