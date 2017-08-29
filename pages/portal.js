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
	sort  (id, data){
		//sorted data array need to be done with redux to change props.projects array.
		let d =	data.sort(
			function (a, b) {
			let compare1 = (a[id] !== undefined && a[id] !== null) ? a[id].toString().toUpperCase() : '';
			let compare2 = (b[id] !== undefined && b[id] !== null) ? b[id].toString().toUpperCase() : '';
			if (compare1 === "" || compare1 === null) return 1;
			if (compare2 === "" || compare2 === null) return -1;
			if (compare1 === compare2) return 0;
				return (compare1 < compare2) ? -1 : 1;
			//todo need to return unsorted array on toggle click
			//return (type === 'sort') ? ((compare1 < compare2) ? -1 : 1) : (compare1 < compare2 ? 1 : -1);
		}
	)
		

		
	}
	render() {
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
				<TableList headers={headers} data={projectsEnhanced} sort={(id, data) => this.sort(id, data)} />
				<InvoiceModal />
			</div>
		);
	}
}

const mapStateToProps = ({ portal, pdfData, showModal }) => ({ ...portal, ...pdfData, showModal });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Wrapper(Portal));
