import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import Router from "next/router";
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { initStore } from "../store";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import TableList from "../components/tableList";
import selectProjectList from "../selectors/selectProjectList";

class ProjectsListing extends Component {
  static async getInitialProps({
    store,
    isServer,
    query: { projects = [] } = {}
  }) {
    const { payloadProjects } = actions;

    isServer
      ? store.dispatch(payloadProjects({ projects }))
      : store.dispatch({
          type: "server/pageProjects"
        });
  }

  render() {
    const {
      props: {
        tableData = [],
        tableHeader = {},
        tableSettings = {},
        setProjectsSettings = () => {},
        createProject = () => {}
      } = {}
    } = this;

    // TODO Should this be moved?
    const tableDataEnhanced = tableData.map(
      ({ studyUID, status = "", ...project }) => ({
        ...project,
        status,
        tableBackground:
          status === "None" ? undefined : "rgba(48, 121, 198, 0.1)",
        action: (
          <div>
            {status === "None" ? (
              // TODO Create as Button dropdown
              <UncontrolledDropdown>
                <DropdownToggle caret>Create</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => createProject({ studyUID })}
                  >
                    Spine Lumbar
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => createProject({ studyUID })}
                  >
                    Spine Cervical
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <Button
                onClick={() =>
                  Router.push({
                    pathname: "/projectDetail",
                    query: { studyUID }
                  })}
              >
                Edit
              </Button>
            )}
          </div>
        )
      })
    );

    return (
      <div className="projects">
        <style jsx>
          {`
            .projects {
              display: flex;
              flex-direction: column;
              width: 100%;
              height: 100%;
              overflow: auto;
            }
          `}
        </style>
        <TableList
          data={tableDataEnhanced}
          header={tableHeader}
          onSort={k => setProjectsSettings({ sortKey: k })}
          onFilter={([k, v]) =>
            setProjectsSettings({ filter: { [k]: v } })}
          {...tableSettings}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  projectsSettings,
  projects: { projects }
}) => ({
  tableHeader: {
    action: { title: "", sort: false },
    status: { title: "Status", sort: true },
    patientName: { title: "Patient Name", sort: true },
    studyName: { title: "Study Name", sort: true },
    studyDate: { title: "Study Date", sort: true },
    modality: { title: "Modality", sort: true },
    location: { title: "Location", sort: true },
    client: { title: "Client", sort: true },
    uploadDateTime: { title: "Date Uploaded", sort: true }
  },
  tableSettings: projectsSettings,
  tableData: selectProjectList({
    projects,
    settings: projectsSettings
  })
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export default withRedux(
  initStore,
  mapStateToProps,
  mapDispatchToProps
)(Wrapper(ProjectsListing));
