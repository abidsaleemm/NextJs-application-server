import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { Button } from "reactstrap";
import { initStore } from "../store";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import TableList from "../components/tableList";
import VideoModal from "../containers/videoModal";
import selectProjectList from "../selectors/selectProjectList";

// TODO Move this to a action?
import fetchApi from "../helpers/fetchApi";

const Portal = class extends Component {
  static async getInitialProps({
    req: { session } = {},
    store,
    isServer,
    query: { portal = {} } = {}
  }) {
    const { payloadPortal, fetchAction } = actions;

    store.dispatch(fetchAction(true));
    store.dispatch(payloadPortal(isServer ? portal : await fetchApi("portal")));
    store.dispatch(fetchAction(false));

    return { isServer, client: true };
  }

  render() {
    const {
      props: {
        tableData = [],
        tableHeader = {},
        tableSettings = {},
        setPortalSettings = () => {},
        setVideo = () => {}
      }
    } = this;

    const tableDataEnhanced = tableData.map(
      ({ studyUID, videoExists = false, ...project }) => ({
        ...project,
        invoice: (
          <a
            className="btn btn-primary"
            target="_pdfPreview"
            href={`/invoice/?id=${studyUID}`}
          >
            View invoice
          </a>
        ),
        video: videoExists ? (
          <Button onClick={() => setVideo(studyUID)}>Video</Button>
        ) : null
      })
    );

    return (
      <div className="portal">
        <style jsx>
          {`
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
          header={tableHeader}
          onSort={k => setPortalSettings({ sortKey: k })}
          onFilter={([k, v]) => setPortalSettings({ filter: { [k]: v } })}
          {...tableSettings}
        />
        <VideoModal />
      </div>
    );
  }
};

const mapStateToProps = ({ portal: { projects }, portalSettings }) => ({
  tableHeader: {
    status: { title: "Status", sort: true },
    patientName: { title: "Patient Name", sort: true },
    studyName: { title: "Study Name", sort: true },
    studyDate: { title: "Study Date", sort: true },
    modality: { title: "Modality", sort: true },
    location: { title: "Location", sort: true },
    video: { title: "", sort: false },
    invoice: { title: "", sort: false }
  },
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
