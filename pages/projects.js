import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import Router from "next/router";
import { Button, ButtonGroup } from "reactstrap";
import { initStore } from "../store";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import TableList from "../components/TableList";
import DropDownProjects from "../components/DropDownProjects";
import selectProjectList from "../selectors/selectProjectList";
import ButtonConfirm from "../components/ButtonConfirm";
import UploadFilePopup from "../components/UploadFilePopup";
import UploadButton from "../components/UploadButton";
import Status from "../components/Status";

// TODO This code is duplicated in projectDetail.  Please clean up.
const windowName = "renderWindow";
const width = 1920;
const height = 1080;
const windowSettings = `width=${width},height=${height},resizable=false,toolbar=false,status=false,maximum-scale=1.0,user-scalable=0`;

// TODO Move this to a different file
const RemoveButton = () => (
  <img
    width={20}
    whight={20}
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAF7SURBVGhD7dnBboJAEMZx7u2zeGmxB5uYAL7/a8iVpde2OzCfYsMCwiw7TeafbGIsZfsrK5o1syzLsqw9q8/nV34Yre/L4YUfxsmV71Vb5HVTfXzyU+LRudsyv7oqL/kp2QjhiuNXWx5//EQuBoYRDc1Bc4ljHhEYspghAqPD+Ln5kG3ReqVLPZzgPmQwY4jb8EtZ7DXTXN5OwYk2YiYRMZbwDKZZM+HuCCSJSYZAEpjkCLQFowaB1mDUIdAzGLUItASjHoGmMfTu/PdTAcaym8OuTf/Xx4ZCBFqOUYxAPSa0lPwHQf8z9QiK/sjwa6Ib+iH91fjnS2s5AsNj/N2Of11HUwheZuHbrxbM9JXol9DsMakxSxB86PyxqTDPIJA6zBoEUoPZgkDJMRIIlAwjiUC7Y2IgEJ/bBc8thZnZoNuEQDOYq9gGHe3BjmyZiiDQGEZ0yxQ9YmQRaIiJgkCEoUsdA4E6TJHX0RAo+pcwvj2+TLIsy7Kse1n2C9LWR7iAvc9TAAAAAElFTkSuQmCC"
  />
);

class ProjectsListing extends Component {
  static async getInitialProps({
    store,
    isServer,
    query: { projects = [], projectsSettings = {} } = {}
  }) {
    const {
      payloadProjects,
      fetchAction,
      setProjectsSettings
    } = actions;

    if (isServer) {
      // TODO Should we wrap these in single action?
      store.dispatch(payloadProjects({ projects }));
      store.dispatch(setProjectsSettings(projectsSettings));
      return;
    }

    store.dispatch(fetchAction(true));
    store.dispatch({
      type: "server/pageProjects"
    });
  }

  // TODO Remove handle using redux portalSettings or portal?
  constructor(props) {
    super(props);

    // TODO Move to redux?
    this.state = {
      popupTarget: null,
      popupStudyUID: ""
    };
  }

  // TODO Move to redux action?
  popupOpen({ target, studyUID }) {
    this.setState({
      popupTarget: target,
      popupStudyUID: studyUID
    });
  }

  // TODO Move to redux action?
  popupToggle() {
    this.setState({
      popupTarget: null
    });
  }

  render() {
    const {
      props,
      props: {
        tableData = [],
        tableHeader = {},
        tableSettings = {},
        defaultList = [],
        setProjectsSettings = () => {},
        createProject = () => {},
        videoDelete = () => {},
        uploadDel = () => {},
        handleUpload = () => {},
        setProjectProps = () => {}
      } = {},
      state: { popupTarget, popupStudyUID }
    } = this;

    // TODO Should this be moved?
    const tableDataEnhanced = tableData.map(
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
          ...project
        },
        i,
        self
      ) => ({
        ...project,
        patientBirthDate,
        patientName: `${patientName} (${patientID})`,
        status: <Status {...{ ...props, status, studyUID }} />,
        tableBackground:
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
                    : status === 10
                      ? "rgba(127, 127, 127, 0.2)"
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
        patientAge:
          new Date().getFullYear() -
          new Date(patientBirthDate).getFullYear(),
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
        upload: (
          <ButtonGroup>
            {uploadedFiles.length > 0 ? (
              <Button
                id={`file-popover-${i}`}
                color="success"
                onClick={() =>
                  this.popupOpen({
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
        )
      })
    );

    // Query the study from tableData
    const study = tableData.find(
      ({ studyUID = "" }) => studyUID === popupStudyUID
    );

    const { uploadedFiles = [] } = study || {};

    return (
      <div className="projects">
        <style jsx>
          {`
            .projects {
              width: 100%;
              height: 100%;
            }
          `}
        </style>
        <TableList
          data={tableDataEnhanced}
          header={tableHeader}
          onSort={k => setProjectsSettings({ sortKey: k })}
          onFilter={([k, v]) =>
            setProjectsSettings({ filter: { [k]: v } })
          }
          {...tableSettings}
        />
        <UploadFilePopup
          popupTarget={popupTarget}
          fileList={uploadedFiles}
          toggle={() => this.popupToggle()}
          studyUID={popupStudyUID}
          onDelete={props => {
            uploadDel(props);
            if (uploadedFiles.length <= 1) {
              this.setState({ popupTarget: null });
            }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  projectsSettings,
  defaultList,
  projects: { projects }
}) => ({
  tableHeader: {
    action: { title: "", sort: false },
    multusID: { title: "Multus ID", sort: true },
    status: { title: "Status", sort: true },
    videoOptions: { title: "Rendered", sort: false },
    patientName: { title: "Patient Name", sort: true },
    patientAge: { title: "Age", sort: true },
    patientSex: { title: "Gender", sort: true },
    patientBirthDate: { title: "Patient DOB", sort: true },
    studyName: { title: "Study Name", sort: true },
    studyDate: { title: "Study Date", sort: true },
    location: { title: "Facility", sort: true },
    uploadDateTime: { title: "Date Uploaded", sort: true },
    upload: { title: "Attach Records", sort: false }
  },
  tableSettings: projectsSettings,
  tableData: selectProjectList({
    projects,
    settings: projectsSettings
  }),
  defaultList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export default withRedux(
  initStore,
  mapStateToProps,
  mapDispatchToProps
)(Wrapper(ProjectsListing));
