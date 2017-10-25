import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import {
  Button,
  ButtonGroup,
  Table,
  Popover,
  PopoverHeader,
  PopoverBody,
  Tooltip
} from "reactstrap";
import { initStore } from "../store";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import TableList from "../components/tableList";
import VideoModal from "../containers/videoModal";
import selectProjectList from "../selectors/selectProjectList";
import uuid from "uuid";

// TODO Move this to a action?
import fetchApi from "../helpers/fetchApi";
import socketApi from '../helpers/socketApi';

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
      {array.map(({ [key]: value }) => (
        <tr style={{ background: "inherit" }}>
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

// TODO Move to separate file?
const ToolTipPopUp = ({
  popupTarget = null,
  fileList = [],
  toggle = () => {}
}) =>
  popupTarget !== null ? (
    <div>
      <Tooltip
        placement="left"
        isOpen={true}
        autohide={false}
        target={popupTarget}
        toggle={() => {
          toggle();
        }}
      >
        <style jsx>
          {`
            :global(div.tooltip.show) {
              opacity: 1;
            }

            :global(div.tooltip-inner) {
              background: white;
              color: black;
              border-radius: 5px;
              width: 200px;
              padding: 5px;
              -webkit-box-shadow: 3px 3px 23px 0px rgba(0,0,0,0.75);
              -moz-box-shadow: 3px 3px 23px 0px rgba(0,0,0,0.75);
              box-shadow: 3px 3px 23px 0px rgba(0,0,0,0.75);
            }

            .tableCellHeader {
              display: flex;
              padding: 5px;
              background: lightgray;
            }

            .tableCell {
              padding: 5px;
              text-align: left;
            }
          `}
        </style>

        <Table>
          <thead>
            <tr>
              <td className="tableCellHeader">Files</td>
            </tr>
          </thead>
          <tbody>
            {fileList.map(v => (
              <tr>
                <td className="tableCell">
                  <a href="">{v}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Tooltip>
    </div>
  ) : null;

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
      payloadPortal(
        isServer
          ? portal
          : await fetchApi("portal", { clientID, admin })
      )
    );
    store.dispatch(fetchAction(false));

    return { clientID };
  }

  constructor(props) {
    super(props);

    this.state = {
      popupTarget: null,
      popupFileList: []
    };
  }

  handleUpload({ target, studyUID }) {
    const { props: { clientID, admin }} = this;

    // TODO Handle multiple files?
    const { 0: file } = target.files;
    const name = file.name;

    const reader = new FileReader();
    reader.onload = ({ target: { result } = {} }) => {
      socketApi("uploadPut", { studyUID, name, data: result })
        .then(v => {
          console.log('uploadPut', clientID, admin)
          fetchApi("portal", { clientID, admin })
        }).catch(e => {
          console.log(e);
        });

      // TODO wrap in socket function
      // const socket = io();
      // socket.emit(
      //   "uploadPut",
      //   { studyUID, name, data: result },
      //   () => {
      //     console.log("socket done");
      //     // TODO Call payload action to refresh list
      //   }
      // );
    };

    reader.readAsDataURL(file);
  }

  popupOpen({ target, fileList = [] }) {
    this.setState({
      popupTarget: target,
      popupFileList: fileList
    });
  }

  popupToggle() {
    this.setState({
      // popupOpen: !this.state.popupOpen,
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
              video: (
                <Button
                  disabled={!videoExists}
                  onClick={() => setVideo(studyUID)}
                >
                  Video
                </Button>
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
        <ToolTipPopUp
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
