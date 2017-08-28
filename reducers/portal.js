import { PAYLOAD_PORTAL, PAYLOAD_INVOICE, INVOICE_MODAL } from '../constants/actionTypes'; 

export const initialState = {
	projects: [],
};

export default  ( state = initialState, { type, portal = {}, pdfData, showModal = false} ) => {
	switch ( type ) {
		case PAYLOAD_PORTAL: return { ...state, ...portal };
		case PAYLOAD_INVOICE: return {...state, ...portal, pdfData, showModal }
		case INVOICE_MODAL: return { ...state, showModal }
		// case PAYLOAD_INVOICE: return Object.assign ({}, state, {...portal, pdfData});
		default: return state;
	}
};