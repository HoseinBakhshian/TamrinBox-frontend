import axios from "axios";
import React, { useContext, useRef } from "react";
import swal from "sweetalert";
import { MainContext } from "../context/MainContext";

const AddFile = (props) => {
  const { id, class_id } = useContext(MainContext);

  const title = useRef();
  const description = useRef();
  const date = useRef();
  const file = useRef();

  const handleAddFile = () => {
    console.log( file.current.files[0]);
    const formData = new FormData();
    formData.append("class_id", class_id);
    formData.append("title", title.current.value);
    formData.append("description", description.current.value);
    formData.append("deadline", date.current.value);
    formData.append("file", file.current.files[0]);
    axios
      .post("http://localhost:8000/courses", formData)
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
      <div className="modal fade" id="addFile"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="addFile" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add new File
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="Title" className="form-label mb-1">
                  Title
                </label>
                <input type="text" className="form-control" id="Title" ref={title} />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label mb-1">
                  Description :
                </label>
                <textarea className="form-control" id="description" rows="3" ref={description}></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="fileDate" className="form-label">
                  Set Deadline
                </label>
                <input className="form-control" type="datetime-local" id="fileDate" ref={date} />
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Upload your file below
                </label>
                <input className="form-control" type="file" id="formFile" accept=".zip" ref={file} />
              </div>
            </div>

            <div className="modal-footer d-flex justify-content-center">
              <button type="button" className="btn btn-success" onClick={handleAddFile}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFile;
