import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const OthersClass = () => {
  const [othersCourses, setOthersCourses] = useState([]);
  const [update, setUpdate] = useState(false);
  const { id, class_id } = useContext(MainContext);
  const file = useRef();
  const classID = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/courses/${class_id}`)
      .then((res) => {
        console.log(res.data.courses);
        setOthersCourses(res.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDownloadFile = (fileURL) => {
    axios
      .get(`http://localhost:8000/courses/downloadFile/${fileURL}`)
      .then((res) => {
        console.log("file downloaded");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUploadFile = (courseID) => {
    console.log( file.current.files[0]);
    const formData = new FormData();
    formData.append("courseID", courseID);
    formData.append("user_id", id);
    formData.append("file2", file.current.files[0]);

    axios
      .post("http://localhost:8000/courses/uploadFile", formData)
      .then((res) => {
        swal({
          title: res.data.mess,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLeaveClass = () => {
    let x = {
      classID: class_id,
      userID: id,
    };
    axios
      .delete(`http://localhost:8000/classes/leaveClass`, { data: x })
      .then((res) => {
        swal({
          title: res.data.msg,
          icon: "success",
        });
        navigate("/users/dashboard")
      })
      .catch(() => {});
  };

  const handleCopyClassID = () => {
    classID.current.select();
    classID.current.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(classID.current.value);
    alert("Copied the text: " + classID.current.value);
  };

  return (
    <div>
      <div className="class-page  p-4" dir="ltr">
        <div className="row justify-content-center ">
          <div className="alert text-center ct-bg-dark copy-to-clipboard col-lg-7" role="alert">
            <div className="input-group d-flex ">
              <span className="input-group-text bg-light" id="classID-icon">
                Class ID
              </span>
              <input type="text" className="form-control bg-light" id="classID" aria-describedby="classID" value={class_id} ref={classID} disabled />
              <span className="input-group-text bg-light cursor" id="copy-icon" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleCopyClassID}>
                Copy
              </span>
            </div>
            <button className="btn btn-danger mt-2 pt-1 pb-1" onClick={handleLeaveClass}>
              <i className="bi bi-box-arrow-left me-1"></i>
              Exit
            </button>
          </div>

          <hr className="m-2" />
          {othersCourses.length == 0 ? <h3>No File shared</h3> : ""}
          {othersCourses.map((item) => (
            <div className="accordion col-lg-10 mb-2" id={`courseID_${item._id}`} key={Math.random()}>
              <div className="accordion-item ">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#ID_${item._id}`} aria-expanded="false" aria-controls={`ID_${item._id}`}>
                    {item.course_name}
                  </button>
                </h2>
                <div id={`ID_${item._id}`} className="accordion-collapse collapse " data-bs-parent={`courseID_${item._id}`}>
                  <div className="accordion-body p-2 ct-bg-dark">
                    <small className="ms-2 mt-0">{item.description}</small>
                    <small className="ms-2 mt-0">{item.deadline}</small>

                    <div className="row  justify-content-evenly">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary col-5  col-xl-2 mb-2 mt-2"
                        onClick={() => {
                          handleDownloadFile(item.file);
                        }}
                      >
                        <i className="bi bi-file-earmark-pdf me-1"></i>
                        Download
                      </button>

                      <hr />
                      <div className="row  justify-content-evenly  g-0 p-3 pb-1 pt-1">
                        <div className="col-12 col-xl-10  p-0">
                          <label htmlFor="formFile" className="form-label">
                            Upload your file below :
                          </label>
                          <input className="form-control mb-2" type="file" id="formFile" accept=".zip" ref={file} required />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-sm btn-success col-4  col-xl-3 "
                          onClick={() => {
                            handleUploadFile(item._id);
                          }}
                        >
                          <i className="bi bi-file-earmark-pdf me-1"></i>
                          Upload File
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OthersClass;
