import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { Button, ButtonGroup, Table } from "reactstrap";
import { initStore } from "../store";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import TableList from "../components/tableList";
import VideoModal from "../containers/videoModal";
import TooltipPopup from "../components/TooltipPopup";

import selectProjectList from "../selectors/selectProjectList";
import uuid from "uuid";

// TODO Move this to a action?
import fetchApi from "../helpers/fetchApi";
import socketApi from "../helpers/socketApi";

// TODO Move to separate file?
const CellTableWrapper = (array, key) => (
  <Table
    style={{
      margin: 0,
      padding: 0,
      background: "inherit",
      height: "100%"
    }}
  >
    <tbody>
      {array.map(({ [key]: value }, i) => (
        <tr
          key={`cell-table-wrapper-${key}-${i}`}
          style={{ background: "inherit" }}
        >
          <td
            style={{ margin: 0, padding: 0, verticalAlign: "middle" }}
          >
            {value}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const Portal = class extends Component {
  static async getInitialProps({
    store,
    isServer,
    userId: clientID,
    admin,
    query: { portal = {} } = {},
    ...props
  }) {
    const { payloadPortal, fetchAction } = actions;

    store.dispatch(fetchAction(true));
    store.dispatch(
      payloadPortal(isServer ? portal : await fetchApi("portal"))
    );
    store.dispatch(fetchAction(false));

    return { clientID };
  }

  constructor(props) {
    super(props);

    // TODO Move to redux
    this.state = {
      popupTarget: null,
      popupFileList: []
    };
  }

  // TODO Move to redux
  handleUpload({ target, studyUID }) {
    const { props: { payloadPortal, fetchAction } } = this;

    // TODO Handle multiple files?
    const { 0: file } = target.files;
    const name = file.name;

    const reader = new FileReader();
    reader.onload = ({ target: { result } = {} }) => {
      // TODO Handle as single action?
      fetchAction(true);
      socketApi("uploadPut", { studyUID, name, data: result })
        .then(async v => {
          console.log("File pushed", name);
          payloadPortal(await fetchApi("portal"));
          fetchAction(false);
        })
        .catch(e => {
          console.log(e);
          fetchAction(false);
        });
    };

    reader.readAsDataURL(file);
  }

  // TODO Move to redux
  popupOpen({ target, fileList = [] }) {
    this.setState({
      popupTarget: target,
      popupFileList: fileList
    });
  }

  // TODO Move to redux
  popupToggle() {
    this.setState({
      popupTarget: null
    });
  }

  render() {
    const {
      props: {
        tableData = [],
        tableHeader = {},
        tableSettings = {},
        tableSubHeader = {},
        admin = false,
        setPortalSettings = () => {},
        setVideo = () => {}
      },
      state: { popupTarget, popupFileList }
    } = this;

    // TODO Move this to prop mapping instead
    const tableHeaderEnhanced = admin
      ? {
          client: { title: "Client", sort: true },
          ...tableHeader
        }
      : tableHeader;

    const tableDataEnhanced = tableData.map(
      ({
        studyUID,
        patientID,
        videoExists = false,
        patientName,
        client,
        patientBirthDate,
        studies = []
      }) => {
        const studiesEnhanced = studies.map(
          ({
            studyUID,
            videoExists,
            uploadedFiles = [],
            ...study
          }) => {
            const id = `file-upload-${studyUID}`;
            const popoverID = `file-popover-${studyUID}`;

            return {
              ...study,
              upload: (
                <ButtonGroup>
                  {uploadedFiles.length > 0 ? (
                    <Button
                      id={popoverID}
                      color="success"
                      onClick={() =>
                        this.popupOpen({
                          target: popoverID,
                          fileList: uploadedFiles
                        })}
                    >
                      {uploadedFiles.length}
                    </Button>
                  ) : null}
                  <label
                    htmlFor={id}
                    style={{ padding: 0, margin: 0 }}
                  >
                    <div
                      className="btn btn-secondary"
                      style={
                        uploadedFiles.length > 0
                          ? { borderRadius: "0 5px 5px 0" }
                          : {}
                      }
                    >
                      Upload File
                    </div>
                  </label>
                  <input
                    style={{ display: "none" }}
                    id={id}
                    type="file"
                    onChange={({ target }) =>
                      this.handleUpload({ target, studyUID })}
                  />
                </ButtonGroup>
              ),
              video: videoExists ? (
                <Button onClick={() => setVideo(studyUID)}>
                  Video
                </Button>
              ) : (
                "No Video"
              )
            };
          }
        );

        return {
          client,
          patientName,
          patientBirthDate,
          invoice: (
            <a
              className="btn btn-secondary"
              target="_pdfPreview"
              href={`/invoice/?id=${patientID}`}
            >
              View invoice
            </a>
          ),
          studies: CellTableWrapper(studiesEnhanced, "studyName"),
          studyDate: CellTableWrapper(studiesEnhanced, "studyDate"),
          status: CellTableWrapper(studiesEnhanced, "status"),
          location: CellTableWrapper(studiesEnhanced, "location"),
          upload: CellTableWrapper(studiesEnhanced, "upload"),
          video: CellTableWrapper(studiesEnhanced, "video")
        };
      }
    );

    return (
      <div className="portal">
        <style jsx>
          {`
            .custom-file-upload {
              border: 1px solid #ccc;
              display: inline-block;
              padding: 6px 12px;
              cursor: pointer;
            }

            .portal {
              display: flex;
              flex-direction: column;
              width: 100%;
              height: 100%;
              overflow: auto;
            }

            .tooltip-inner {
              background: white;
            }

            .popupFiles {
              border-radius: 0px;
              background: white;
            }
          `}
        </style>
        <TableList
          data={tableDataEnhanced}
          header={tableHeaderEnhanced}
          onSort={k => setPortalSettings({ sortKey: k })}
          onFilter={([k, v]) =>
            setPortalSettings({
              filter: { [k]: v }
            })}
          {...tableSettings}
        />
        <VideoModal />
        <TooltipPopup
          popupTarget={popupTarget}
          fileList={popupFileList}
          toggle={() => this.popupToggle()}
        />
      </div>
    );
  }
};

const mapStateToProps = ({
  portal: { projects = [] },
  portalSettings = {}
}) => ({
  tableHeader: {
    patientName: { title: "Patient Name", sort: true },
    patientBirthDate: { title: "Patient DOB", sort: true },
    invoice: { title: "Invoice", sort: false },
    studies: { title: "Studies", sort: false },
    studyDate: { title: "Study Date", sort: false },
    status: { title: "Status", sort: true },
    location: { title: "Imaging Center", sort: false },
    upload: { title: "Attach Files", sort: false },
    video: { title: "Video", sort: false }
  },
  tableSettings: portalSettings,
  tableData: selectProjectList({
    projects,
    settings: portalSettings
  })
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export default withRedux(
  initStore,
  mapStateToProps,
  mapDispatchToProps
)(Wrapper(Portal));
