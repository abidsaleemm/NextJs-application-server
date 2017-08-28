import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux'
import { initStore } from '../store';
import * as actions from '../actions';
import Wrapper from '../hoc/wrapper';
import TableList from '../components/tableList';
import InvoicePreview, { openModal, closeModal } from '../components/pdfPreviewModal';

// TODO Should we move this to query function instead and send with data?
export const headers = [
	{
		title: 'Status',
		id: 'status'
	},
	{
		title: 'Patient Name',
		id: 'patientName'
	},
	{
		title: 'Study Name',
		id: 'studyName'
	},
	{
		title: 'Study Date',
		id: 'studyDate'
	},
	{
		title: 'Modality',
		id: 'modality'
	},
	{
		title: 'Location',
		id: 'location'
	},
	{
		title: 'Download',
    id: 'download',
    type: 'button',
	},
	{
		title: 'Preview',
    id: 'preview',
    type: 'button',
	},
	{
		title: 'Invoice',
    id: 'invoice',
		type: 'button',
		// action: studyUID => openModal(studyUID)
	}
];

var invoiceAction;

const Portal = class extends Component {

	static async getInitialProps({ req: { session } = {},  store, isServer, query: { portal = {} } = {} }) {
		const { payloadPortal,fetchAction, payloadInvoice } = actions;

		store.dispatch(fetchAction(true));
		store.dispatch(payloadPortal(isServer ? portal : await fetchApi('portal')));
		store.dispatch(fetchAction(false));

		return { isServer, client: true };
	}

  render() {
		console.log (this.props);
		const { props: { projects = [], dispatch, fetchAction, payloadInvoice } } = this;

		headers[8].action = studyUID => dispatch (payloadInvoice (studyUID))

    return (
      <div>
        <TableList headers={headers} data={projects}/>	
				<InvoicePreview showModal={ this.props.showModal } data={ this.props.pdfData }/>
      </div>
    );
  }
}

const mapStateToProps = ({ portal, pdfData, showModal }) => ({ ...portal, ...pdfData, showModal });
// const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
const mapDispatchToProps = dispatch => ({dispatch: dispatch, ...actions});

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Wrapper(Portal));
