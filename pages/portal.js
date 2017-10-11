import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { Button } from "reactstrap";
import { initStore } from "../store";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import TableList from "../components/tableList";
import VideoModal from "../containers/videoModal";
import fetchApi from "../helpers/fetchApi";

// TODO Should we move these someplace else?
const headers = [
  {
    title: "Status",
    id: "status"
  },
  {
    title: "Patient Name",
    id: "patientName"
  },
  {
    title: "Study Name",
    id: "studyName"
  },
  {
    title: "Study Date",
    id: "studyDate"
  },
  {
    title: "Modality",
    id: "modality"
  },
  {
    title: "Location",
    id: "location"
  },
  {
    title: "Video",
    id: "video",
    sortDisabled: true
  },
  {
    title: "Invoice",
    id: "invoice",
    sortDisabled: true
  }
];

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
        projects = [],
        filter = {},
        sort = {},
        setVideo = () => {},
        setPortalFilter = () => {},
        setPortalSort = () => {}
      }
    } = this;

    const projectsEnhanced = projects.map(
      ({ studyUID, videoExists = false, ...project }) => ({
        ...project,
        invoice: (
          <a
            className="btn btn-primary"
            target="_blank"
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
          headers={headers}
          sort={sort}
          filter={filter}
          data={projectsEnhanced}
          onFilter={props => setPortalFilter(props)}
          onSort={props => setPortalSort(props)}
        />
        <VideoModal />
      </div>
    );
  }
};

const mapStateToProps = ({ portal }) => ({ ...portal });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  Wrapper(Portal)
);
