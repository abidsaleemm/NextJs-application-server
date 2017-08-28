import { PAYLOAD_PORTAL, INVOICE_SET } from '../constants/actionTypes'; 

export const initialState = {
	projects: [],
	invoiceRoute: null,
};

export default  ( state = initialState, { type, portal = {}, pdfData, invoiceRoute = null, showModal = false} ) => {
	switch ( type ) {
		case PAYLOAD_PORTAL: return { ...state, ...portal };
		case INVOICE_SET: return { ...state, invoiceRoute }
		default: return state;
	}
};