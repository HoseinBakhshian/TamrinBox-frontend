import React, { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../context/MainContext";
import Inbox from "../componenet/inbox";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import AddCourse from "../componenet/addCourse";
import EditClass from "../componenet/editClass";
import EditCourse from "../componenet/editCourse";

const MyClass = () => {
  const [courses, setCourses] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [update, setUpdate] = useState(false);
  const [courseID, setCourseID] = useState("");
  const [classInfo, setClassInfo] = useState({});
  const [courseInfo, setCourseInfo] = useState({});

  const classID = useRef();
  const { id, class_id } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (class_id != "") {
      axios
        .get(`http://localhost:8000/courses/getMyCourses/${class_id}`)
        .then((res) => {
          setCourses(res.data.courses);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/users/dashboard");
    }
  }, [update, inbox, id]);

  const handleCopyClassID = () => {
    classID.current.select();
    classID.current.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(classID.current.value);
    alert("Copied the text: " + classID.current.value);
  };

  const handleDownloadFile = (fileURL) => {
    axios
      .get(`http://localhost:8000/courses/downloadFile/${fileURL}`, { credentials: "include" })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleRemoveCourse = (courseID) => {
  //   swal({
  //     title: "?Are you sure",
  //     text: "Once deleted, you will not be able to recover this  course",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       axios
  //         .delete(`http://localhost:8000/courses/removeCourse/${courseID}`)
  //         .then((res) => {
  //           if (res.data.deleted == true) {
  //             swal({
  //               title: "!course has been deleted",
  //               icon: "success",
  //             });
  //             setUpdate(!update);
  //           } else {
  //             swal({
  //               title: res.data.mess,
  //               icon: "error",
  //             });
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   });
  // };

  const handleRemoveCourse = (courseID) => {
    swal({
      title: "?Are you sure",
      text: "Once deleted, you will not be able to recover this  course",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:8000/courses/removeCourse/${courseID}`)
          .then((res) => {
            if (res.data.deleted == true) {
              swal({
                title: "!course has been deleted",
                icon: "success",
              });
              // setUpdate(!update);
              document.getElementById(`courseID_${courseID}`).style.display = "none";
            } else {
              swal({
                title: res.data.mess,
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleInbox = (courseID) => {
    setCourseID(courseID);
    axios
      .get(`http://localhost:8000/courses/getInbox/${courseID}`)
      .then((res) => {
        setInbox(res.data.files);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClassInfo = () => {
    axios
      .get(`http://localhost:8000/classes/getClassInfo/${class_id}`)
      .then((res) => {
        setClassInfo(res.data.info);
        setUpdate(!update);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCourseInfo = (courseID) => {
    axios
      .get(`http://localhost:8000/courses/getCourseInfo/${courseID}`)
      .then((res) => {
        setCourseInfo(res.data.info);
        setCourseID(courseID);
        setUpdate(!update);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (

    <div className="class-page   p-4 pb-5" dir="ltr">
      <div className="row justify-content-center pb-5">
        <div className="alert  ct-bg-dark copy-to-clipboard col-lg-8" role="alert">
          <div className="input-group d-flex align-items-center">
            <span className="input-group-text bg-light" id="classID-icon">
              Class ID
            </span>
            <input type="text" className=" form-control bg-light" id="classID" ref={classID} aria-describedby="classID" value={class_id} disabled />
            <span className="input-group-text bg-light cursor" id="copy-icon" onClick={handleCopyClassID}>
              Copy
            </span>
          </div>
        </div>

        <div className="row justify-content-evenly col-lg-8 col-xl-6">
          <button type="button" className="btn btn-success col-5 col-sm-4 col-md-4 " data-bs-toggle="modal" data-bs-target="#addCourse" onClick={()=>{
              document.getElementById("addCourseform").reset();
          }}>
            <i className="bi bi-plus-circle me-1"></i>
            Add New
          </button>
          <button type="button" className="btn btn-warning col-5 col-sm-4 col-md-4" data-bs-toggle="modal" data-bs-target="#editClass" onClick={handleClassInfo}>
            <i className="bi bi-pencil-fill me-1 "></i>
            Edit Class
          </button>
        </div>

        <hr className="m-2" />

        {courses.length == 0 ? <h3>No File shared</h3> : ""}

        {courses.map((item) => (
          <div className="accordion col-lg-10 col-xl-8 mb-2" id={`courseID_${item._id}`} key={Math.random()}>
            <div className="accordion-item shadow-sm ">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#ID_${item._id}`} aria-expanded="false" aria-controls={`ID_${item._id}`}>
                  {item.course_name}
                </button>
              </h2>
              <div id={`ID_${item._id}`} className="accordion-collapse collapse " data-bs-parent={`courseID_${item._id}`}>
                <div className="accordion-body ct-bg-dark">
                  <p>{item.description}</p>
                  <p className={`h6 text-success ${new Date(item.deadline) < Date.now() ? "text-danger" : ""}`}>Deadline : {item.deadline ? item.deadline.replace("T", " ") : "?"}</p>
                  <div className="row g-2 justify-content-evenly mt-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary col-5  col-xl-2 "
                      onClick={() => {
                        handleDownloadFile(item.file);
                      }}
                    >
                      <i className="bi bi-file-earmark-pdf me-1"></i>
                      Download
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-success col-5  col-xl-2"
                      data-bs-toggle="modal"
                      data-bs-target="#inboxModal"
                      onClick={() => {
                        handleInbox(item._id);
                      }}
                    >
                      <i className="bi bi-cloud-arrow-down me-1"></i>
                      Inbox
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-warning col-5  col-xl-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editCourse"
                      onClick={() => {
                        handleCourseInfo(item._id);
                      }}
                    >
                      <i className="bi bi-pencil-fill me-1 "></i>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger col-5  col-xl-2"
                      onClick={() => {
                        handleRemoveCourse(item._id);
                      }}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Inbox inbox={inbox} courseID={courseID} />
        <AddCourse setUpdate={setUpdate} update={update} />
        <EditClass classInfo={classInfo} update={update} setUpdate={setUpdate} />
        <EditCourse courseInfo={courseInfo} courseID={courseID} update={update} setUpdate={setUpdate} />
      </div>
    </div>
  );
};

export default MyClass;
