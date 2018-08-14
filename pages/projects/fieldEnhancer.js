import React from "react";
import Router from "next/router";
import { Button, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import ButtonConfirm from "../../components/ButtonConfirm";
import UploadButton from "../../components/UploadButton";
import Status from "../../components/Status";
import RemoveButton from "../../components/RemoveButton";
import DropDownRenderOptions from "../../components/DropDownRenderOptions";

const tableRowColor = status => {
  const options = {
    Start: "rgba(255, 0, 0, 0.1)",
    Segmentation: "rgba(255, 255, 0, 0.1)",
    Injuries: "rgba(255, 255, 0, 0.2)",
    Review: "rgba(0, 255, 0, 0.1)",
    Done: "rgba(0, 255, 0, 0.2)",
    Rendered: "rgba(0, 255, 0, 0.5)",
    Delivered: "rgba(0, 0, 255, 0.3)"
  };

  return options[status] || "rgba(0, 0, 0, 0.0)";
};

export default props => {
  const {
    projects = [],
    user, // TODO Check for admin or team admin
    userList = [],
    handleUpload = () => {},
    setProjectProps = () => {},
    toggleProjectDefault = () => {},
    popupOpen = () => {},
    onCreate = () => {}
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
        userID,
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
        tableBackground: tableRowColor(status),
        action: (
          <ButtonGroup>
            {!hasProjectSnapshots ? (
              <Button onClick={() => onCreate({ studyUID })}>Create</Button>
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
        patientAge: patientBirthDate ? new Date().getFullYear() - new Date(patientBirthDate).getFullYear() : "",
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
              `}
            </style>
            <DropDownRenderOptions studyUID={studyUID} />
            {encoding !== "" && encoding !== null ? (
              <div className="renderTextEncoding">
                Encoding ({Math.floor((new Date() - new Date(encoding)) / 1000 / 60)} min. elapsed)
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
            <UploadButton studyUID={studyUID} hasFiles={uploadedFiles.length > 0} handleUpload={handleUpload} />
          </ButtonGroup>
        ),
        sample,
        userRender: (
          <UncontrolledDropdown>
            <DropdownToggle caret>
              {(userList.find(({ id }) => userID && id === userID) || {}).name || "None"}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setProjectProps({ studyUID, userID: "" })}>None</DropdownItem>
              <DropdownItem header>Team Users</DropdownItem>
              {userList.map(({ id: userID, name, username }) => (
                <DropdownItem
                  key={`dropdown-item-user-${userID}`}
                  onClick={() => setProjectProps({ studyUID, userID })}
                >{`${name} - ${username}`}</DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledDropdown>
        ),
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
