import axios from "axios";
import React, { useEffect, useState } from "react";

const Inbox = (props) => {


  const handleDownloadFile = (fileURL) => {
    axios
      .get(`http://localhost:8000/courses/downloadFile/${fileURL}`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div class="modal fade" id="inboxModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="inboxModal" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-fullscreen-lg-down ">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Recived Files
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
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
                    {props.inbox.map((item) => (
                      <tr>
                        <th scope="row">{item.number}</th>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={() => {
                              handleDownloadFile(item.file_id);
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

            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
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
