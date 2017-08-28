import { PAYLOAD_INVOICE } from '../constants/actionTypes';
import * as actions from '../actions';
import axios from 'axios';

// export default async ({studyUID}) => ({ type: PAYLOAD_INVOICE, pdfData: await axios (`http://localhost:3000/invoice/?id=${studyUID}`,{ responseType: 'arraybuffer' })});
export default (studyUID) => {

	const url = `http://localhost:3000/invoice/?id=${studyUID}`;
	const { fetchAction, payloadInvoice, invoiceModalAction } = actions;

	return dispatch => {
		dispatch (fetchAction (true));
		return axios.get (url, { responseType: 'arraybuffer' })
			.then (response => {
				dispatch ({ type: PAYLOAD_INVOICE, pdfData: response.data, showModal: true});
				dispatch ( fetchAction (false));
				dispatch ( invoiceModalAction (true));
			}, err => console.error (err));
	}
}