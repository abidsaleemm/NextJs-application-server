import React from "react";
import Router from "next/router";
import { Button, ButtonGroup } from "reactstrap";

import DropDownProjects from "../../components/DropDownProjects";
import ButtonConfirm from "../../components/ButtonConfirm";
import UploadButton from "../../components/UploadButton";
import Status from "../../components/Status";
import RemoveButton from "../../components/RemoveButton";

// TODO This code is duplicated in projectDetail.  Please clean up.
const windowName = "renderWindow";
const width = 1920;
const height = 1080;
const windowSettings = `width=${width},height=${height},resizable=false,toolbar=false,status=false,maximum-scale=1.0,user-scalable=0`;

export default props => {
  const {
    projects = [],
    createProject = () => {},
    videoDelete = () => {},
    handleUpload = () => {},
    setProjectProps = () => {},
    toggleProjectDefault = () => {},
    popupOpen = () => {}
  } = props;

  return projects.map(
    (
      {
        studyUID,
        status,
        statusName,
        hasProjectSnapshots,
        patientID,
        patientName,
        patientBirthDate,
        videoExists,
        encoding = "",
        uploadedFiles = [],
        sample = false,
        ...project
      },
      i,
      self
    ) => {
      return {
        ...project,
        patientBirthDate,
        patientName: `${patientName} (${patientID})`,
        status,
        statusRender: <Status {...{ ...props, status, studyUID }} />,
        tableBackground:
          // TODO Create helper to set color
          // Create a hof for this.
          status === 1
            ? "rgba(255, 0, 0, 0.1)"
            : status === 2
              ? "rgba(255, 255, 0, 0.1)"
              : status === 3
                ? "rgba(255, 255, 0, 0.2)"
                : status === 4
                  ? "rgba(0, 255, 0, 0.1)"
                  : status === 5
                    ? "rgba(0, 255, 0, 0.2)"
                    : status === 6
                      ? "rgba(0, 255, 0, 0.5)"
                      : status === 7
                        ? "rgba(0, 0, 255, 0.3)"
                        : "rgba(0, 0, 0, 0.0)",
        action: (
          <ButtonGroup>
            {!hasProjectSnapshots ? (
              <DropDownProjects
                studyUID={studyUID}
                projects={self}
                onClick={defaultStudyUID => {
                  createProject({ studyUID, defaultStudyUID });
                }}
              />
            ) : (
              <Button
                onClick={() =>
                  Router.push({
                    pathname: "/projectDetail",
                    query: { studyUID }
                  })
                }
                color="success"
              >
                Edit
              </Button>
            )}
            <ButtonConfirm
              className="buttonGroupRight"
              tipID="removeProject"
              color="warning"
              message="You are about to remove an uploaded project . Please confirm."
              onConfirm={() => {
                console.log("removing project");
                setProjectProps({ studyUID, deleted: true });
              }}
              style={{ borderRadius: "0 5px 5px 0" }}
            >
              <RemoveButton />
            </ButtonConfirm>
          </ButtonGroup>
        ),
        patientAge: patientBirthDate
          ? new Date().getFullYear() -
            new Date(patientBirthDate).getFullYear()
          : "",
        videoExists,
        videoOptions: (
          <div style={{ display: "inline-flex" }}>
            <style jsx>
              {`
                .renderText {
                  color: red;
                }

                .renderTextEncoding {
                  color: #b8860b;
                }

                margin-left: 7px;
                align-self: center;
              `}
            </style>
            <ButtonGroup>
              <Button
                onClick={() =>
                  window.open(
                    `/static/render/?p=${studyUID}`,
                    windowName,
                    windowSettings
                  )
                }
              >
                R
              </Button>
              {videoExists ? (
                <ButtonConfirm
                  tipID="deleteVideoButton"
                  color="warning"
                  message="You are about to delete a rendered video from this case.  This action can't be undone. Please confirm."
                  onConfirm={() => videoDelete({ studyUID })}
                  style={{ borderRadius: "0 5px 5px 0" }}
                >
                  <RemoveButton />
                </ButtonConfirm>
              ) : null}
            </ButtonGroup>
            {encoding !== "" && encoding !== null ? (
              <div className="renderTextEncoding">
                Encoding ({Math.floor(
                  (new Date() - new Date(encoding)) / 1000 / 60
                )}{" "}
                min. elapsed)
              </div>
            ) : videoExists ? (
              <a
                href={`/video/?id=${studyUID}&patientName=${patientName}`}
                target="_videoPreview"
              >
                Download
              </a>
            ) : (
              <div className="renderText">No</div>
            )}
          </div>
        ),
        uploadedFiles,
        upload: (
          <ButtonGroup>
            {uploadedFiles.length > 0 ? (
              <Button
                id={`file-popover-${i}`}
                color="success"
                onClick={() =>
                  popupOpen({
                    studyUID,
                    target: `file-popover-${i}`
                  })
                }
              >
                {uploadedFiles.length}
              </Button>
            ) : null}
            <UploadButton
              studyUID={studyUID}
              hasFiles={uploadedFiles.length > 0}
              handleUpload={handleUpload}
            />
          </ButtonGroup>
        ),
        sample,
        sampleRender: (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around"
            }}
          >
            <input
              type="checkbox"
              onChange={({ target: { value } }) => {
                toggleProjectDefault(studyUID);
              }}
              checked={sample === true}
              style={{
                alignSelf: "center",
                width: "20px",
                height: "20px"
              }}
            />
          </div>
        )
      };
    }
  );
};
