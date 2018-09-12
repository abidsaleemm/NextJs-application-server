import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions";
import Wrapper from "../../hoc/wrapper";
import TableList from "../../components/TableList";
import UploadFilePopup from "../../components/UploadFilePopup";
import CreateProjectModal from "../../components/CreateProjectModal";
import RichTextEditorModal from "../../components/RichTextEditorModal";

import fieldEnhancer from "./fieldEnhancer";
import header from "./header";
import sortFunc from "./sortFunc";
import filterRender from "./filterRender";
import filterFunc from "./filterFunc";

class ProjectsListing extends Component {
  static async getInitialProps({
    store,
    isServer,
    query: {
      users = [],
      projects,
      renders = [],
      projectsListDefault,
      projectsSettings = {}
    } = {}
  }) {
    const {
      payloadProjects,
      payloadUsers,
      payloadRenders,
      setProjectsSettings
    } = actions;

    if (isServer) {
      // TODO Should we wrap these in single action?
      store.dispatch(payloadUsers({ data: users }));
      store.dispatch(payloadProjects({ projects, projectsListDefault }));
      store.dispatch(payloadRenders(renders));

      store.dispatch(setProjectsSettings(projectsSettings));
      return;
    }

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
      popupStudyUID: "",
      modalCreateProjects: false,
      selectedStudyUID: null
    };
  }

  // TODO Move to redux action?
  popupOpen = ({ target, studyUID }) => {
    this.setState({
      popupTarget: target,
      popupStudyUID: studyUID
    });
  };

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
        projects = [],
        projectsListDefault = [],
        sortKey,
        sortDesc,
        projectsListSortKey,
        projectsListSortDesc,
        user: { role } = {},
        setProjectsSettings = () => {},
        uploadDel = () => {},
        createProject = () => {},
        richText = () => {}
      } = {},
      state: {
        popupTarget,
        popupStudyUID,
        modalRichText = false,
        modalCreateProjects = false,
        selectedStudyUID = null,
        notes = ""
      }
    } = this;

    const projectsEnhanced = fieldEnhancer({
      ...props,
      onCreate: ({ studyUID }) => {
        // TODO Don't like this.  Could cause side effects. WG
        this.setState({
          modalCreateProjects: true,
          selectedStudyUID: studyUID
        });
      },
      onRichText: ({ studyUID, notes }) => {
        this.setState({
          modalRichText: true,
          selectedStudyUID: studyUID,
          notes
        });
      },
      popupOpen: this.popupOpen
    });

    // Query the study from tableData
    const study = projects.find(
      ({ studyUID = "" }) => studyUID === popupStudyUID
    );

    const { uploadedFiles = [] } = study || {};

    return (
      <div className="projects">
        <style jsx>
          {`
            .projects {
              display: flex;
              width: 100%;
              height: 100%;
            }
          `}
        </style>
        <TableList
          data={projectsEnhanced}
          sortFunc={sortFunc()}
          sortKey={sortKey}
          sortDesc={sortDesc}
          header={header({ admin: role === "admin" })}
          filterFunc={filterFunc(props)}
          filterRender={filterRender(props)}
          onSort={k => setProjectsSettings({ sortKey: k })}
        />

        <RichTextEditorModal
          toggle={() => {
            this.setState({
              modalRichText: !modalRichText
            });
          }}
          setProjectProps={() => {
            richText({
              studyUID: selectedStudyUID,
              defaultStudyUID: ""
            });

            this.setState({
              modalRichText: false
            });
          }}
          isOpen={modalRichText}
          studyUID={selectedStudyUID}
          notes={notes}
        />

        <CreateProjectModal
          sortKey={projectsListSortKey}
          sortDesc={projectsListSortDesc}
          onSort={k => setProjectsSettings({ projectsListSortKey: k })}
          projects={projectsListDefault}
          onToggle={() => {
            this.setState({
              modalCreateProjects: !modalCreateProjects
            });
          }}
          onDefault={() => {
            createProject({
              studyUID: selectedStudyUID,
              defaultStudyUID: ""
            });

            this.setState({
              modalCreateProjects: false
            });
          }}
          isOpen={modalCreateProjects}
          onRowClick={({ studyUID: defaultStudyUID }) => {
            createProject({
              studyUID: selectedStudyUID,
              defaultStudyUID
            });
          }}
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
  projectsSettings: {
    // TODO Makebe use a container for settings instead of pass through props?
    sortKey,
    sortDesc,
    filter,
    projectsListSortKey,
    projectsListSortDesc
  },
  projectsListDefault,
  defaultList,
  projects: { projects },
  user,
  renders,
  userList: { data: userList = [] }
}) => ({
  projects,
  projectsListDefault,
  sortKey,
  sortDesc,
  filter,
  projectsListSortKey,
  projectsListSortDesc,
  defaultList,
  user,
  renders,
  userList
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper(ProjectsListing));
