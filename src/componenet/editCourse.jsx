import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import swal from "sweetalert";
import { MainContext } from "../context/MainContext";

const EditCourse = (props) => {
  const { id, class_id } = useContext(MainContext);
  const title = useRef();
  const description = useRef();
  const date = useRef();
  const file = useRef();

  useEffect(() => {
    title.current.value = props.courseInfo.course_name;
    description.current.value = props.courseInfo.description;
    date.current.value = props.courseInfo.date;
  }, [props.update]);

  const handleEditCourse = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseID", props.courseID);
    formData.append("course_name", title.current.value);
    formData.append("description", description.current.value);
    formData.append("deadline", date.current.value);
    formData.append("file", file.current.files[0] ? file.current.files[0] : props.courseInfo.file);
    axios
      .put("http://localhost:8000/courses/editCourses", formData)
      .then((res) => {
        props.setUpdate(!props.update);
        swal({
          title: res.data.msg,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleEditCourse}>
        <div className="modal fade" id="editCourse" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editCourse" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-fullscreen-md-down">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title h4" id="staticBackdropLabel">
                  Edit Course
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
                  <input className="form-control" type="datetime-local" id="fileDate" ref={date} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Upload your file below
                  </label>
                  <input className="form-control" type="file" id="formFile" accept=".zip,.pdf" ref={file} />
                </div>
              </div>

              <div className="modal-footer row justify-content-center">
                <button type="submit" className="btn btn-success col-4">
                  SUMBIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
