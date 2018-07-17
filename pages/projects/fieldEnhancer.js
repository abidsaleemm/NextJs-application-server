import React from "react";
import Router from "next/router";
import {
  Button,
  ButtonGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import DropDownProjects from "../../components/DropDownProjects";
import ButtonConfirm from "../../components/ButtonConfirm";
import UploadButton from "../../components/UploadButton";
import Status from "../../components/Status";
import RemoveButton from "../../components/RemoveButton";

// TODO Please clean up.
const windowName = "renderWindow";
const width = 1920;
const height = 1080;
const windowSettings = `width=${width},height=${height},resizable=false,toolbar=false,status=false,maximum-scale=1.0,user-scalable=0`;
const windowSettingsDebug = `width=${parseInt(
  width / 2
)},height=${parseInt(
  height / 2
)},resizable=false,toolbar=false,status=false,maximum-scale=1.0,user-scalable=0`;

export default props => {
  const {
    projects = [],
    createProject = () => {},
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
          // Create a hof for this?
          status === "Pending"
            ? "rgba(255, 0, 0, 0.1)"
            : status === "Segmentation"
              ? "rgba(255, 255, 0, 0.1)"
              : status === "Injuries"
                ? "rgba(255, 255, 0, 0.2)"
                : status === "Review"
                  ? "rgba(0, 255, 0, 0.1)"
                  : status === "Done"
                    ? "rgba(0, 255, 0, 0.2)"
                    : status === "Rendered"
                      ? "rgba(0, 255, 0, 0.5)"
                      : status === "Delivered"
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
                .renderTextNo {
                  color: red;
                }

                .renderTextYes {
                  color: green;
                }

                .renderTextEncoding {
                  color: #b8860b;
                }

                margin-left: 7px;
                align-self: center;

                .renderOption {
                  display: flex;
                  background: green;
                  justify-content: space-between;
                }

                .renderLink {
                  padding-right: 30px;
                  cursor: pointer;
                  padding-left: 0px;
                  margin-left: 0px;
                }
              `}
            </style>

            <UncontrolledDropdown>
              <DropdownToggle caret>Render</DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="renderOption">
                  <a
                    className="renderLink"
                    onClick={() => {
                      window.open(
                        `/static/render/?p=${studyUID}`,
                        windowName,
                        windowSettings
                      );
                    }}
                  >
                    Spine Video
                  </a>
                  <Button
                    color="warning"
                    onClick={() => {
                      window.open(
                        `/static/render/?p=${studyUID}&debug=true`,
                        windowName,
                        windowSettingsDebug
                      );
                    }}
                  >
                    Debug
                  </Button>
                </DropdownItem>
                <DropdownItem>Spine Images</DropdownItem>
                <DropdownItem>Spine Compare</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {encoding !== "" && encoding !== null ? (
              <div className="renderTextEncoding">
                Encoding ({Math.floor(
                  (new Date() - new Date(encoding)) / 1000 / 60
                )}{" "}
                min. elapsed)
              </div>
            ) : videoExists ? (
              <div className="renderTextYes">Yes</div>
            ) : (
              <div className="renderTextNo">No</div>
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
