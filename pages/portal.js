import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import {
  Button,
  Table
} from "reactstrap";
import { initStore } from "../store";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import TableList from "../components/tableList";
import VideoModal from "../containers/videoModal";
import selectProjectList from "../selectors/selectProjectList";

// TODO Move this to a action?
import fetchApi from "../helpers/fetchApi";
const window = {};

const Portal = class extends Component {
  static async getInitialProps({
    store,
    isServer,
    userId: clientId,
    admin,
    query: { portal = {} } = {},
    ...props,
  }) {
    const { payloadPortal, fetchAction } = actions;

    store.dispatch(fetchAction(true));
    store.dispatch(payloadPortal(isServer ? portal : await fetchApi("portal", { clientId, admin })));
    store.dispatch(fetchAction(false));
  }

  handleUpload() {
    console.log(files);
    // console.log('files',file);
    // Extract ref
  }

  render() {
    const {
      props: {
        tableData = [],
      tableHeader = {},
      tableSettings = {},
      tableSubHeader = {},
      admin = false,
      setPortalSettings = () => { },
      setVideo = () => { }
      }
    } = this;

    const tableHeaderEnhanced = admin ? { 
      client: { title: "Client", sort: true },
      ...tableHeader 
    } : tableHeader;

    const tableDataEnhanced = tableData.map(
      ({ studyUID, videoExists = false, ...project }) => ({
        ...project,
        // upload: 
        //   <div>
        //     <label htmlFor="file-upload">
        //       <div className="btn btn-secondary">Upload File</div>
        //     </label>
        //     <input style={{ display: 'none' }} id="file-upload" type="file" onChange={this.handleUpload}/>
        //   </div>,
        // tableSubHeader: {
  //   studyName: { title: "Study Name", sort: true },
  //   studyDate: { title: "Study Date", sort: true },
  //   status: { title: "Status", sort: true },
  //   modality: { title: "Modality", sort: true },
  //   location: { title: "Imaging Center", sort: true },
  //   upload: { title: "Attach Files", sort: false },
  //   video: { title: "", sort: false },
  // },
        invoice: (
          <a
            className="btn btn-primary"
            target="_pdfPreview"
            href={`/invoice/?id=${studyUID}`}
          >
            View invoice
          </a>
        ),
        studies:
        <Table>
          <tbody>
            <tr>
              <td>studyName</td>
              <td>studyDate</td>
              <td>status</td>
              <td>location</td>
              <td>video</td>
            </tr>
          </tbody>
        </Table>,
        video: videoExists ? (
          <Button onClick={() => setVideo(studyUID)}>Video</Button>
        ) : null
      })
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
          `}
        </style>
        <TableList
          data={tableDataEnhanced}
          header={tableHeaderEnhanced}
          onSort={k => setPortalSettings({ sortKey: k })}
          onFilter={([k, v]) => setPortalSettings({ filter: { [k]: v } })}
          {...tableSettings}
        />
        <VideoModal />
      </div>
    );
  }
};

const mapStateToProps = ({ portal: { projects = [], patients = [] }, portalSettings = {} }) => ({
  tableHeader: {
    patientName: { title: "Patient Name", sort: true },
    patientDOB: { title: "DOB", sort: true },
    patientAddress: { title: "Patient Address", sort: true },
    invoice: { title: "Invoice", sort: false },
    studies: { title: "Studies", sort: false }
  },
  // tableSubHeader: {
  //   studyName: { title: "Study Name", sort: true },
  //   studyDate: { title: "Study Date", sort: true },
  //   status: { title: "Status", sort: true },
  //   modality: { title: "Modality", sort: true },
  //   location: { title: "Imaging Center", sort: true },
  //   upload: { title: "Attach Files", sort: false },
  //   video: { title: "", sort: false },
  // },
  tableSettings: portalSettings,
  tableData: selectProjectList({
    projects,
    settings: portalSettings,
  })
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  Wrapper(Portal)
);

/*
<thead>
<tr>
  {Object.entries(header).map(
    ([id, { title = "", sort = false }]) => (
      <th
        className={`${sort
          ? "headerCell"
          : "headerCellDisabled"} ${id === sortKey
          ? "headerCell--active"
          : null}`}
        key={`${title}-${id}`}
        onClick={() => onSort(id)}
      >
        <div className="headerTab">
          {title}
          {id === sortKey && sort ? (
            <div
              className={`arrow ${sortDesc ? "arrow--up" : null}`}
            />
          ) : null}
        </div>
      </th>
    )
  )}
</tr>
<tr className="fieldColor">
  {Object.entries(header).map(([id, { sort }]) => (
    <td className="fieldFilter" key={`${id}-filter`}>
      {filter[id] !== undefined ? (
        <SearchInput
          type="text"
          name={`filter-${id}`}
          value={filter[id]}
          onClear={() => onFilter([id, ""])}
          onChange={({ target: { value } = {} }) =>
            onFilter([id, value])}
        />
      ) : null}
    </td>
  ))}
</tr>
</thead>
*/