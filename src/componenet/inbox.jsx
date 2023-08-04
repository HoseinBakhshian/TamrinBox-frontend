import axios from "axios";
import React from "react";


const Inbox = (props) => {
  
  const downloadInboxFile = (fileURL) => {
    axios
      .get(`http://localhost:8000/courses/downloadInboxFile/${fileURL}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDownloadAll=(courseID)=>{
    axios
    .get(`http://localhost:8000/courses/downloadAll/${courseID}`)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <div className="modal fade" id="inboxModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="inboxModal" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-fullscreen-lg-down ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title h4" id="staticBackdropLabel">
                Inbox
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="container-md">
                <table className="table align-middle table-light table-hover table-bordered text-center">
                  <thead className="table-dark ">
                    <tr>
                      <th scope="col" className="">
                        #
                      </th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Download</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {props.inbox.length != 0 ? (
                      <tr>
                        <th scope="row">0</th>
                        <td>All</td>
                        <td>{props.courseID}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              handleDownloadAll(props.courseID);
                            }}
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ) : (
                      ""
                    )}
                    {props.inbox.map((item) => (
                      <tr key={Math.random()}>
                        <th scope="row">{item.number}</th>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => {
                              downloadInboxFile(item.file_id);
                            }}
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
