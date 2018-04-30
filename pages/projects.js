import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import Router from "next/router";
import { Button, Table } from "reactstrap";
import { initStore } from "../store";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import TableList from "../components/TableList";
import DropDownProjects from "../components/DropDownProjects";
import selectProjectList from "../selectors/selectProjectList";

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

  render() {
    const {
      props,
      props: {
        tableData = [],
        tableHeader = {},
        tableSettings = {},
        defaultList = [],
        setProjectsSettings = () => {},
        createProject = () => {}
      } = {}
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
          ...project
        },
        i,
        self
      ) => ({
        ...project,
        patientName: `${patientName} (${patientID})`,
        status: statusName,
        tableBackground: status
          ? status === 2
            ? "rgba(171, 235, 198, 0.2)"
            : undefined
          : "rgba(48, 121, 198, 0.1)",
        action: (
          <div>
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
    patientName: { title: "Patient Name", sort: true },
    patientSex: { title: "Sex", sort: true },
    patientBirthDate: { title: "Patient DOB", sort: true },
    location: { title: "Facility", sort: true },
    status: { title: "Status", sort: true },
    studyName: { title: "Study Name", sort: true },
    studyDate: { title: "Study Date", sort: true },
    uploadDateTime: { title: "Date Uploaded", sort: true }
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
