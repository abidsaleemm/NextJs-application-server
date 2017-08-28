import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux'
import { Button } from 'reactstrap';
import { initStore } from '../store';
import * as actions from '../actions';
import Wrapper from '../hoc/wrapper';
import TableList from '../components/tableList';
import InvoiceModal from '../containers/invoiceModal';
import fetchApi from '../helpers/fetchApi';

// TODO Should we move this to query function instead and send with data?
// TODO Should just add filters here?
export const headers = [
	// {
	// 	title: 'Status',
	// 	id: 'status',
	// 	filter: '',
	// },
	{
		title: 'Patient Name',
		id: 'patientName',
		filter: '',
	},
	{
		title: 'Study Name',
		id: 'studyName',
		filter: '',
	},
	{
		title: 'Study Date',
		id: 'studyDate'
	},
	{
		title: 'Modality',
		id: 'modality',
		filter: '',
	},
	{
		title: 'Location',
		id: 'location',
		filter: '',
	},
	{
		title: 'Video',
		id: 'video',
	},
	{
		title: 'Invoice',
		id: 'invoice',
	}
];

const Portal = class extends Component {
	static async getInitialProps({ req: { session } = {}, store, isServer, query: { portal = {} } = {} }) {
		const { payloadPortal, fetchAction } = actions;

		store.dispatch(fetchAction(true));
		store.dispatch(payloadPortal(isServer ? portal : await fetchApi('portal')));
		store.dispatch(fetchAction(false));

		return { isServer, client: true };
	}

	render() {
		console.log(this.props);
		const {
			props: {
				projects = [],
			setInvoice = () => { }
			} } = this;

		const projectsEnhanced = projects.map(({ ...project, studyUID }) =>
			({
				...project,
				invoice: <Button onClick={() => setInvoice(studyUID)} >Invoice</Button>,
				video: <Button onClick={() => {}} >Video</Button>
			}))

		return (
			<div>
				<TableList headers={headers} data={projectsEnhanced} />
				<InvoiceModal />
			</div>
		);
	}
}

const mapStateToProps = ({ portal, pdfData, showModal }) => ({ ...portal, ...pdfData, showModal });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Wrapper(Portal));
