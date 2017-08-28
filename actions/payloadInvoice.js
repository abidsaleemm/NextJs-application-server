import { PAYLOAD_INVOICE } from '../constants/actionTypes';
import * as actions from '../actions';
import axios from 'axios';

// export default async ({studyUID}) => ({ type: PAYLOAD_INVOICE, pdfData: await axios (`http://localhost:3000/invoice/?id=${studyUID}`,{ responseType: 'arraybuffer' })});
export default (studyUID) => {

	const { fetchAction, payloadInvoice } = actions;

	return dispatch => {
		dispatch (fetchAction (true));
		return axios.get (`http://localhost:3000/invoice/?id=${studyUID}`,{ responseType: 'arraybuffer' })
			.then (response => {
				dispatch ({ type: PAYLOAD_INVOICE, pdfData: response.data, showModal: true});
				dispatch ( fetchAction (false));
			}, err => console.error (err));
	}
}