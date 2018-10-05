import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import Sidebar from "../components/Sidebar";
import Status from "../components/Status";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import UploadButton from "../components/UploadButton";
import ButtonConfirm from "../components/ButtonConfirm";
import CreateProjectModal from "../components/CreateProjectModal";
import RichTextEditorModal from "../components/RichTextEditorModal";
import checkPlainTextNull from "../helpers/checkPlainTextNull";

const ProjectDetails = class extends Component {
  static async getInitialProps({
    store,
    isServer,
    query: {
      projectDetail = {},
      projectDetailSettings = {},
      projects,
      projectsListDefault,
      studyUID = ""
    }
  }) {
    const {
      payloadProjectDetail,
      payloadProjects,
      setProjectDetailSettings
    } = actions;

    if (isServer) {
      // TODO Should we wrap these in single action?
      store.dispatch(payloadProjectDetail(projectDetail));
      store.dispatch(payloadProjects({ projects, projectsListDefault }));
      store.dispatch(setProjectDetailSettings(projectDetailSettings));
      return;
    }

    store.dispatch({
      type: "server/pageProjectDetail",
      studyUID
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      modalProjectsList: false // TODO Move this to HOC
    };
  }

  render() {
    const {
      props,
      props: {
        sidebarIsOpen,
        studyUID,
        studyName,
        studyType,
        patientName,
        patientBirthDate = 0,
        patientSex,
        studyDate,
        uploadedFiles = [],
        defaultStudyUID = "",
        location,
        notes,
        projectsListDefault = [],
        projectsListSortKey = "",
        projectsListSortDesc = false,
        user: { role = "user" } = {},
        toggleSidebar = () => {},
        handleProjectImport = () => {},
        destroyProject = () => {},
        setProjectDetailSettings = () => {},
        setProjectProps = () => {},
        setNotesEditor = () => {},
        toggleProjectDefault = () => {}
      },
      state: { modalProjectsList = false }
    } = this;

    const selectedDefaultProject =
      projectsListDefault.find(
        ({ studyUID: testStudyUID }) => defaultStudyUID === testStudyUID
      ) || {};

    const {
      patientName: defaultPatientName,
      patientSex: defaultPatientSex,
      patientBirthDate: defaultPatientBirthDate
    } = selectedDefaultProject;

    // TODO Calculate using current date for now
    const patientAge =
      new Date().getFullYear() - new Date(patientBirthDate).getFullYear();

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
              margin-right: 2px;
              margin-left: 2px;
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
                  <Button
                    color={checkPlainTextNull(notes) ? "primary" : "secondary"}
                    onClick={() => {
                      setNotesEditor({
                        studyUID,
                        notes,
                        isOpen: true,
                        header: `${patientName}`
                      });
                    }}
                  >
                    Notes
                  </Button>
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
                <div className="dataFunction">
                  <Button
                    color="secondary"
                    onClick={() => {
                      this.setState({ modalProjectsList: true });
                    }}
                  >
                    Default
                  </Button>
                </div>
              </div>
            </div>
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
        <CreateProjectModal
          studyType={studyType}
          sortKey={projectsListSortKey}
          sortDesc={projectsListSortDesc}
          onSort={k => {
            setProjectDetailSettings({ projectsListSortKey: k });
          }}
          projects={projectsListDefault
            .filter(({ studyUID: testStudyUID }) => studyUID !== testStudyUID)
            .map(
              v =>
                defaultStudyUID === v.studyUID
                  ? {
                      ...v,
                      tableBackground: "lightgreen"
                    }
                  : v
            )}
          onToggle={() => {
            this.setState({
              modalProjectsList: !modalProjectsList
            });
          }}
          onDefault={() => {
            setProjectProps({ studyUID, defaultStudyUID: "" });
            this.setState({
              modalProjectsList: false
            });
          }}
          isOpen={modalProjectsList}
          onRowClick={({ studyUID: defaultStudyUID }) => {
            setProjectProps({ studyUID, defaultStudyUID });
            this.setState({
              modalProjectsList: false
            });
          }}
        />
        <RichTextEditorModal />
      </div>
    );
  }
};

const mapStateToProps = ({
  projectDetail,
  projectsListDefault,
  projectDetailSettings: {
    sidebarIsOpen,
    projectsListSortKey = "",
    projectsListSortDesc = false
  }
}) => ({
  ...projectDetail,
  projectsListDefault,
  sidebarIsOpen,
  projectsListSortKey,
  projectsListSortDesc
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper(ProjectDetails));
