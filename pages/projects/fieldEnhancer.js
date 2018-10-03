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

import UploadButton from "../../components/UploadButton";
import Status from "../../components/Status";
import DropDownRenderOptions from "../../components/DropDownRenderOptions";
import checkPlainTextNull from "../../helpers/checkPlainTextNull";
import ProjectType from "../../components/ProjectType";

const renderTemplateMap = {
  spine: "Video",
  spineImages: "Images",
  spineComparison: "Comparison"
};

const tableRowColor = status => {
  const options = {
    Start: "rgba(255, 0, 0, 0.1)",
    Segmentation: "rgba(255, 255, 0, 0.1)",
    Injuries: "rgba(255, 255, 0, 0.2)",
    QC: "rgba(0, 255, 100, 0.2)",
    Review: "rgba(0, 255, 0, 0.1)",
    Done: "rgba(0, 255, 0, 0.2)",
    Rendered: "rgba(0, 255, 0, 0.5)",
    Delivered: "rgba(0, 0, 255, 0.3)"
  };

  return options[status] || "rgba(0, 0, 0, 0.0)";
};

export default props => {
  const {
    sessions = {},
    user: { role = "" } = {},
    projects = [],
    userList = [],
    renders = [],
    handleUpload = () => {},
    setProjectProps = () => {},
    popupOpen = () => {},
    onCreate = () => {},
    setNotesEditor = () => {},
    delRender = () => {}
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
        encoding = "",
        uploadedFiles = [],
        userID,
        notes = "",
        projectType = "Live",
        ...project
      },
      i
    ) => {
      const rendersSelected = renders.filter(
        (v = {}) => v.studyUID === studyUID
      );

      return {
        ...project,
        activeUser: sessions[studyUID] ? (
          <div style={{ color: "green" }}>{sessions[studyUID].userName}</div>
        ) : (
          ""
        ),
        patientBirthDate,
        patientName: `${patientName} (${patientID})`,
        status,
        statusRender: <Status {...{ ...props, status, studyUID, role }} />,
        tableBackground: tableRowColor(status),
        notes: (
          <Button
            color={checkPlainTextNull(notes) ? "primary" : "secondary"}
            onClick={() => {
              setNotesEditor({
                studyUID,
                notes,
                isOpen: true,
                header: `${patientName} (${patientID})`
              });
            }}
          >
            Notes
          </Button>
        ),
        action: (
          <div>
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
                disabled={sessions[studyUID] !== undefined}
              >
                Edit
              </Button>
            )}
          </div>
        ),
        patientAge: patientBirthDate
          ? new Date().getFullYear() - new Date(patientBirthDate).getFullYear()
          : "",
        videoOptions: hasProjectSnapshots ? (
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

                .renderList {
                  display: flex;
                  flex-direction: column;
                  flex-wrap: nowrap;
                  padding-left: 10px;
                }

                .renderListItemSpacing {
                  padding: 2px;
                }

                .renderListItem {
                  display: flex;
                  white-space: nowrap;
                  margin: 2px;
                  justify-content: space-between;
                  align-items: center;
                }

                .renderTextProgress {
                  color: green;
                }

                .renderTextQueue {
                  color: orange;
                }
              `}
            </style>
            <DropDownRenderOptions studyUID={studyUID} />

            {rendersSelected.length > 0 ? (
              <div className="renderList">
                {rendersSelected.map(
                  (
                    {
                      template,
                      rendering = false,
                      debug,
                      anonymous,
                      progress = 0,
                      encoding
                    },
                    index
                  ) => (
                    <div key={index} className="renderListItem">
                      <div className="renderListItemSpacing">
                        {renderTemplateMap[template] || template}
                      </div>
                      {debug ? (
                        <div className="renderListItemSpacing">D</div>
                      ) : null}
                      {anonymous ? (
                        <div className="renderListItemSpacing">A</div>
                      ) : null}
                      {rendering ? (
                        encoding ? (
                          <div className="renderListItemSpacing renderTextProgress">{`Encoding`}</div>
                        ) : (
                          <div className="renderListItemSpacing renderTextProgress">{`Progress ${progress}%`}</div>
                        )
                      ) : (
                        <div className="renderListItemSpacing renderTextQueue">
                          Queued
                        </div>
                      )}
                      <Button
                        color="danger"
                        onClick={() => {
                          delRender({ template, studyUID, debug, anonymous });
                        }}
                      >
                        X
                      </Button>
                    </div>
                  )
                )}
              </div>
            ) : null}
          </div>
        ) : null,
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
        userName:
          (userList.find(({ id }) => userID && id === userID) || {}).name || "",
        userRender: (
          <UncontrolledDropdown color="secondary">
            <DropdownToggle caret>
              {(userList.find(({ id }) => userID && id === userID) || {})
                .name || "None"}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                onClick={() => setProjectProps({ studyUID, userID: "" })}
              >
                None
              </DropdownItem>
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
        projectType,
        projectTypeRender: (
          <ProjectType
            type={projectType}
            admin={role === "admin"}
            onChange={value => {
              setProjectProps({
                studyUID,
                projectType: value
              });
            }}
          />
        )
      };
    }
  );
};
