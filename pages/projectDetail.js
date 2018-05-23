import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input
} from "reactstrap";
import Sidebar from "../components/Sidebar";
import Status from "../components/Status";
import { connect } from "react-redux";
// import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
// import { initStore } from "..//store";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import UploadButton from "../components/UploadButton";
import ButtonConfirm from "../components/ButtonConfirm";
import DropDownProjects from "../components/DropDownProjects";

// TODO This code is duplicated in projects component.  Please clean up.
// TODO Used for render video will be removed in the future
const windowName = "renderWindow";
const width = 1920;
const height = 1080;

const windowSettings = `width=${width},height=${height},resizable=false,toolbar=false,status=false,maximum-scale=1.0,user-scalable=0`;
const windowSettingsDebug = `width=${parseInt(
  width / 2
)},height=${parseInt(
  height / 2
)},resizable=false,toolbar=false,status=false`;

const ProjectDetails = class extends Component {
  static async getInitialProps({
    store,
    isServer,
    query: {
      projectDetail = {},
      projectDetailSettings = {},
      projects = {},
      studyUID = ""
    }
  }) {
    const {
      payloadProjectDetail,
      payloadProjects,
      setProjectDetailSettings,
      fetchAction
    } = actions;

    if (isServer) {
      // TODO Should we wrap these in single action?
      store.dispatch(payloadProjectDetail(projectDetail));
      store.dispatch(payloadProjects({ projects }));
      store.dispatch(setProjectDetailSettings(projectDetailSettings));
      return;
    }

    store.dispatch(fetchAction(true));
    store.dispatch({
      type: "server/pageProjectDetail",
      studyUID
    });
  }

  render() {
    const {
      props,
      props: {
        sidebarIsOpen,
        studyUID,
        studyName,
        patientName,
        patientBirthDate,
        patientSex,
        studyDate,
        status = 0,
        uploadedFiles = [],
        defaultStudyUID = "",
        location,
        user: { admin = false },
        projects = [],
        setProjectProps = () => {},
        videoRender = () => {},
        toggleSidebar = () => {},
        resetProject = () => {},
        handleProjectImport = () => {},
        destroyProject = () => {}
      }
    } = this;

    const selectedDefaultProject =
      projects.find(
        ({ studyUID: testStudyUID }) =>
          defaultStudyUID === testStudyUID
      ) || {};

    const {
      patientName: defaultPatientName,
      patientSex: defaultPatientSex,
      patientBirthDate: defaultPatientBirthDate
    } = selectedDefaultProject;

    // Setting up defaults
    // TODO Calculate using current date for now
    const defaultPatientAge =
      new Date().getFullYear() -
      new Date(defaultPatientBirthDate).getFullYear();

    const defaultLabel =
      defaultStudyUID !== ""
        ? `${defaultPatientName} - ${defaultPatientAge} - ${defaultPatientSex}`
        : "None";

    // TODO Calculate using current date for now
    const patientAge =
      new Date().getFullYear() -
      new Date(patientBirthDate).getFullYear();

    return (
      <div
        className="root"
        ref={input => {
          this.container = input;
        }}
      >
        <style jsx>
          {`
            .root {
              display: flex;
              flex-direction: row;
              height: 100%;
              width: 100%;
            }

            .projectDetailLeft {
              width: 100%;
              margin-bottom: 50px;
            }

            .projectDetailRight {
              width: 100%;
              height: 100%;
              background: lightGray;
            }

            .Sidebar-header {
              margin-bottom: 30px;
            }

            .renderButton {
              margin-bottom: 10px;
            }

            .dataFunctionGroup {
              display: flex;
              justify-content: space-around;
            }

            .dataFunction {
              margin-right: 10px;
            }

            .dataFunction:last-child {
              margin-right: 0;
            }

            .dataDefaults {
              display: flex;
              width: 100%;
              white-space: nowrap;
              align-items: center;
            }

            .dataDefaultsLabel {
              padding-right: 5px;
            }

            tr {
              white-space: nowrap;
            }
          `}
        </style>
        <Sidebar
          toggleSidebar={toggleSidebar}
          isOpen={sidebarIsOpen}
          width={400}
        >
          <div className="projectDetailLeft">
            <div>
              <div className="Sidebar-header">Project Details</div>
              <div className="renderButton">
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
                    Render Video
                  </Button>
                  <Button
                    color="warning"
                    onClick={() =>
                      window.open(
                        `/static/render/?p=${studyUID}&debug=true`,
                        windowName,
                        windowSettingsDebug
                      )
                    }
                  >
                    Debug
                  </Button>
                </ButtonGroup>
              </div>
              <Table>
                <tbody>
                  <tr>
                    <th scope="row">Status</th>
                    <td>
                      <Status {...props} />
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Patient Name</th>
                    <td>{patientName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Gender</th>
                    <td>{patientSex}</td>
                  </tr>
                  <tr>
                    <th scope="row">Age</th>
                    <td>{patientAge}</td>
                  </tr>
                  <tr>
                    <th scope="row">DOB</th>
                    <td>{patientBirthDate}</td>
                  </tr>

                  <tr>
                    <th scope="row">Study Name</th>
                    <td>{studyName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Study Date</th>
                    <td>{studyDate}</td>
                  </tr>
                  <tr>
                    <th scope="row">Facility</th>
                    <td>{location}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <Table hover>
                <thead>
                  <tr>
                    <td>Files</td>
                  </tr>
                </thead>
                <tbody>
                  {uploadedFiles.map((name, i) => (
                    <tr key={`attached-files-${i}`}>
                      <td>
                        <a
                          href={`/uploadGet/?id=${studyUID}&name=${name}`}
                          target="_UploadPreview"
                        >
                          {name}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div>
              <hr />
              <div>Data functions</div>
              <div className="dataFunctionGroup">
                <div className="dataFunction">
                  <UploadButton
                    studyUID={studyUID}
                    handleUpload={handleProjectImport}
                    label="Import"
                  />
                </div>
                <div className="dataFunction">
                  <a
                    className="btn btn-secondary"
                    target="_projectExport"
                    href={`/export/?studyUID=${studyUID}`}
                  >
                    Export
                  </a>
                </div>
                <div className="dataFunction">
                  <ButtonConfirm
                    tipID="resetButton"
                    color="warning"
                    message="You are about to reset a project to the selected default.  This action can't be undone. Please confirm."
                    onConfirm={() => resetProject({ studyUID })}
                  >
                    Reset
                  </ButtonConfirm>
                </div>
                <div className="dataFunction">
                  <ButtonConfirm
                    tipID="destroyButton"
                    color="warning"
                    message="You are about to destroy a project and all it's snapshots.  This action can't be undone. Please confirm."
                    onConfirm={() => destroyProject({ studyUID })}
                  >
                    Destroy
                  </ButtonConfirm>
                </div>
              </div>
            </div>
            <hr />
            <div className="dataDefaults">
              <div className="dataDefaultsLabel">Set Default</div>
              <DropDownProjects
                label={defaultLabel}
                studyUID={studyUID}
                projects={projects.filter(
                  ({ studyUID: testStudyUID }) =>
                    studyUID !== testStudyUID
                )}
                onClick={(defaultStudyUID = "") => {
                  setProjectProps({ studyUID, defaultStudyUID });
                }}
              />
            </div>
            <div />
          </div>
        </Sidebar>
        <iframe
          className="projectDetailRight"
          src={`/static/interface/?p=${studyUID}`}
          title="iframe"
          width="100%"
          height="100%"
          style={{ margin: 0, border: 0, padding: 0 }}
        />
      </div>
    );
  }
};

const mapStateToProps = ({
  projectDetail,
  projects: { projects },
  projectDetailSettings: { sidebarIsOpen }
}) => ({ ...projectDetail, sidebarIsOpen, projects });

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export default connect(
  //   initStore,
  mapStateToProps,
  mapDispatchToProps
)(Wrapper(ProjectDetails));
