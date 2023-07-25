import React from "react";

const EditFile = () => {
  return (
    <div>
      <div class="modal fade" id="editFile" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editFile" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-fullscreen-md-down">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Edit File
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <div class="mb-3">
                <label for="Title" class="form-label mb-1">
                  Title
                </label>
                <input type="text" class="form-control" id="Title" />
              </div>

              <div class="mb-3">
                <label for="description" class="form-label mb-1">
                  Description :
                </label>
                <textarea class="form-control" id="description" rows="3"></textarea>
              </div>

              <div class="mb-3">
                <label for="fileDate" class="form-label">
                  Set Deadline
                </label>
                <input class="form-control" type="datetime-local" id="fileDate" accept=".zip" />
              </div>

              <div class="mb-3">
                <label for="formFile" class="form-label">
                  Upload your file below
                </label>
                <input class="form-control" type="file" id="formFile" accept=".zip" />
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

export default EditFile;
