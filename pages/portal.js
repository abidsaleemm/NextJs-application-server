import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux'
import { initStore } from '../store';
import * as actions from '../actions';
import Wrapper from '../hoc/wrapper';
import TableList from '../components/tableList';
import InvoicePreview, { showModal, closeModal } from '../components/pdfPreviewModal';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

// TODO Move this to an action?
import fetchApi from '../helpers/fetchApi';
import PDFJS from 'pdfjs-dist';

// TODO should we build this value in query function?
import getStatusName from '../helpers/getStatusName';

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
		action: studyUID => showModal(studyUID)
	}
];

const Portal = class extends Component {
  static async getInitialProps({
    req: { session } = {},  
    store, 
    isServer, 
    query: { portal = {} } = {} 
  }) {
		const {
			payloadPortal,
			fetchAction,
		} = actions;
    
    // console.log('session', session);

		store.dispatch(fetchAction(true));
		store.dispatch(payloadPortal(isServer ? portal : await fetchApi('portal')));
		store.dispatch(fetchAction(false));

		return { isServer, client: true };
	}

  render() {
    const { 
      props: { projects = [] } 
		} = this;

    return (
      <div>
        <TableList
					headers={headers}
					data={projects}
				/>

				
				<InvoicePreview />
      </div>
    );
  }
}

const mapStateToProps = ({ portal }) => ({ ...portal });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
	Wrapper(Portal));
