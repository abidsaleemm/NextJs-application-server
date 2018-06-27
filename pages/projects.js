import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Router from "next/router";
import { Button, ButtonGroup, Input } from "reactstrap";

import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import TableList from "../components/TableList";
import DropDownProjects from "../components/DropDownProjects";
import ButtonConfirm from "../components/ButtonConfirm";
import UploadFilePopup from "../components/UploadFilePopup";
import UploadButton from "../components/UploadButton";
import Status from "../components/Status";
import RemoveButton from "../components/RemoveButton";

import SearchInput from "../components/SearchInput";

// TODO This code is duplicated in projectDetail.  Please clean up.
const windowName = "renderWindow";
const width = 1920;
const height = 1080;
const windowSettings = `width=${width},height=${height},resizable=false,toolbar=false,status=false,maximum-scale=1.0,user-scalable=0`;

const sortFunc = {
  status: (a, b) => {
    return 0;
  },
  sample: (a, b) => {
    return 0;
  },
  // videoOptions: (a, b) => {},
  patientName: (a, b) => {
    return 0;
  },
  patientAge: (a, b) => {
    return 0;
  },
  patientSex: (a, b) => {
    return 0;
  },
  patientBirthDate: (a, b) => {
    return 0;
  },
  studyName: (a, b) => {
    return 0;
  },
  studyDate: (a, b) => {
    return 0;
  },
  location: (a, b) => {
    return 0;
  },
  uploadDateTime: (a, b) => {
    return 0;
  }
};

const header = {
  action: "",
  status: "Status",
  sampleRender: "Sample",
  videoOptions: "Rendered",
  patientName: "Patient Name",
  patientAge: "Age",
  patientSex: "Gender",
  patientBirthDate: "Patient DOB",
  studyName: "Study Name",
  studyDate: "Study Date",
  location: "Facility",
  uploadDateTime: "Date Uploaded",
  upload: "Attach Records"
};

const filterRender = ({
  filter: {
    sample = false,
    patientName,
    patientBirthDate,
    studyName,
    location
  } = {},
  toggleFilterSettings = () => {},
  setProjectsSettings = () => {}
}) => ({
  patientName: (
    <SearchInput
      type="text"
      name={`filter-patientName`}
      value={patientName}
      onClear={() =>
        setProjectsSettings({ filter: { patientName: "" } })
      }
      onChange={({ target: { value } = {} }) =>
        setProjectsSettings({ filter: { patientName: value } })
      }
    />
  ),
  patientBirthDate: (
    <SearchInput
      type="text"
      name={`filter-patientBirthDate`}
      value={patientBirthDate}
      onClear={() =>
        setProjectsSettings({ filter: { patientBirthDate: "" } })
      }
      onChange={({ target: { value } = {} }) =>
        setProjectsSettings({ filter: { patientBirthDate: value } })
      }
    />
  ),
  studyName: (
    <SearchInput
      type="text"
      name={`filter-studyName`}
      value={studyName}
      onClear={() =>
        setProjectsSettings({ filter: { studyName: "" } })
      }
      onChange={({ target: { value } = {} }) =>
        setProjectsSettings({ filter: { studyName: value } })
      }
    />
  ),
  location: (
    <SearchInput
      type="text"
      name={`filter-location`}
      value={location}
      onClear={() =>
        setProjectsSettings({ filter: { location: "" } })
      }
      onChange={({ target: { value } = {} }) =>
        setProjectsSettings({ filter: { location: value } })
      }
    />
  ),
  sampleRender: (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <input
        type="checkbox"
        onChange={({ target: { value } }) => {
          toggleFilterSettings("sample");
        }}
        checked={sample}
        style={{
          alignSelf: "center",
          width: "25px",
          height: "25px"
        }}
      />
    </div>
  )
});

// TODO Cut up into separate files
const filterFunc = props => {
  const {
    filter: {
      sample: sampleFilter = false,
      patientName: patientNameFilter,
      patientBirthDate: patientBirthDateFilter,
      studyName: studyNameFilter,
      location: locationFilter
    }
  } = props;

  return {
    patientName: ({ patientName }) =>
      new RegExp(patientNameFilter, "gi").test(patientName),
    patientBirthDate: ({ patientBirthDate }) =>
      new RegExp(patientBirthDateFilter, "gi").test(patientBirthDate),
    studyName: ({ studyName }) =>
      new RegExp(studyNameFilter, "gi").test(studyName),
    location: ({ location }) =>
      new RegExp(locationFilter, "gi").test(location),
    sample: ({ sample }) => sampleFilter === sample
  };
};

class ProjectsListing extends Component {
  static async getInitialProps({
    store,
    isServer,
    query: { projects = [], projectsSettings = {} } = {}
  }) {
    const { payloadProjects, setProjectsSettings } = actions;

    if (isServer) {
      // TODO Should we wrap these in single action?
      store.dispatch(payloadProjects({ projects }));
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
        projects = [],
        sortKey,
        sortDesc,
        filters = {},
        setProjectsSettings = () => {},
        createProject = () => {},
        videoDelete = () => {},
        uploadDel = () => {},
        handleUpload = () => {},
        setProjectProps = () => {},
        toggleProjectDefault = () => {}
      } = {},
      state: { popupTarget, popupStudyUID }
    } = this;

    // TODO Should this be moved? Move this to a componentEnhanced.
    const projectsEnhanced = projects.map(
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
          status: <Status {...{ ...props, status, studyUID }} />,
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
          sortFunc={sortFunc}
          sortKey={sortKey}
          sortDesc={sortDesc}
          header={header}
          filterFunc={filterFunc(props)}
          filterRender={filterRender(props)}
          onSort={k => setProjectsSettings({ sortKey: k })}
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
  //   projectsSettings,
  projectsSettings: { sortKey, sortDesc, filter },
  defaultList,
  projects: { projects }
}) => ({
  projects,
  sortKey,
  sortDesc,
  filter,
  // tableData: compose(
  //   list => (sortDesc ? reverse(list) : list),
  //   sortBy(prop(sortKey))
  // )(projects),
  defaultList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper(ProjectsListing));
