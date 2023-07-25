import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../context/MainContext";
import Inbox from "../componenet/inbox";
import axios from "axios";
import swal from "sweetalert";

const OthersCourse = () => {
  const [othersCourses, setOthersCourses] = useState([]);
  const [update, setUpdate] = useState(false);
  const { id, class_id } = useContext(MainContext);
  const file = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/courses/${class_id}`)
      .then((res) => {
        setOthersCourses(res.data.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

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
    const formData = new FormData();
    formData.append("courseID", courseID);
    formData.append("user_id", id);
    formData.append("file", file.current.files[0]);

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

  return (
    <div>
      <div className="class-page  p-4" dir="ltr">
        <div className="row justify-content-center ">
          <div className="alert  ct-bg-dark copy-to-clipboard col-lg-7" role="alert">
            <div className="input-group d-flex align-items-center">
              <span className="input-group-text bg-light" id="classID-icon">
                Class ID
              </span>
              <input type="text" className="form-control bg-light" id="classID" aria-describedby="classID" value={class_id} disabled />
              <span className="input-group-text bg-light cursor" id="copy-icon">
                Copy
              </span>
            </div>
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
                    {/* <label className="form-label d-block  mb-0">Description and Download :</label> */}
                    <small className="ms-2 mt-0">{item.description}</small>
                   

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
                      <form
                        className="row  justify-content-evenly  g-0 p-3 pb-1 pt-1"
                        onSubmit={() => {
                          handleUploadFile(item._id);
                        }}
                      >
                        <div className="col-12 col-xl-10  p-0">
                          <label htmlFor="formFile" className="form-label">
                            Upload your file below :
                          </label>
                          <input className="form-control mb-2" type="file" id="formFile" accept=".zip" ref={file} required />
                        </div>

                        <button type="submit" className="btn btn-sm btn-success col-4  col-xl-3 ">
                          <i className="bi bi-file-earmark-pdf me-1"></i>
                          Upload File
                        </button>
                      </form>
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

export default OthersCourse;
