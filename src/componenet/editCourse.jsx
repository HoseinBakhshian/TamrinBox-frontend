import React from "react";

const EditCourse = () => {
  return (
    <div>
      <div className="modal fade" id="editFile" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editFile" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-fullscreen-md-down">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit File
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="Title" className="form-label mb-1">
                  Title
                </label>
                <input type="text" className="form-control" id="Title" />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label mb-1">
                  Description :
                </label>
                <textarea className="form-control" id="description" rows="3"></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="fileDate" className="form-label">
                  Set Deadline
                </label>
                <input className="form-control" type="datetime-local" id="fileDate" accept=".zip" />
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Upload your file below
                </label>
                <input className="form-control" type="file" id="formFile" accept=".zip" />
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

export default EditCourse;
