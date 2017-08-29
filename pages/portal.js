import React, { Component } from "react";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { Button } from "reactstrap";
import { initStore } from "../store";
import * as actions from "../actions";
import Wrapper from "../hoc/wrapper";
import TableList from "../components/tableList";
import InvoiceModal from "../containers/invoiceModal";
import fetchApi from "../helpers/fetchApi";

// TODO Should we move these someplace else?
const headers = [
  {
    title: "Status",
    id: "status"
  },
  {
    title: "Patient Name",
    id: "patientName",
  },
  {
    title: "Study Name",
    id: "studyName",
  },
  {
    title: "Study Date",
    id: "studyDate"
  },
  {
    title: "Modality",
    id: "modality",
  },
  {
    title: "Location",
    id: "location",
  },
  {
    title: "Video",
    id: "video"
  },
  {
    title: "Invoice",
    id: "invoice"
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
    console.log(this.props);
    const {
      props: {
        projects = [],
        filter = {},
        sort = {},
        setInvoice = () => {},
        setPortalFilter = () => {},
        setPortalSort = () => {},
      }
    } = this;

    const projectsEnhanced = projects.map(({ ...project, studyUID }) => ({
      ...project,
      invoice: <Button onClick={() => setInvoice(studyUID)}>Invoice</Button>,
      video: <Button onClick={() => {}}>Video</Button>
    }));

    return (
      <div>
        <TableList
          headers={headers}
          sort={sort}
					filter={filter}
          data={projectsEnhanced}
          onFilter={props => setPortalFilter(props)}
          onSort={props => setPortalSort(props)}
        />
        <InvoiceModal />
      </div>
    );
  }
};

const mapStateToProps = ({ portal }) => ({ ...portal });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  Wrapper(Portal)
);
