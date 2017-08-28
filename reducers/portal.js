import { PAYLOAD_PORTAL, PAYLOAD_INVOICE, INVOICE_MODAL } from '../constants/actionTypes'; 

export const initialState = {
	projects: [],
};

export default  ( state = initialState, { type, portal = {}, pdfData, showModal = false} ) => {
	switch ( type ) {
		case PAYLOAD_PORTAL: return { ...state, ...portal };
		case PAYLOAD_INVOICE: return {...state, ...portal, pdfData }
		case INVOICE_MODAL: return { ...state, showModal }
		default: return state;
	}
};