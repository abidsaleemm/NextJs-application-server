import { INVOICE_MODAL } from '../constants/actionTypes';

export default (showModal = false) => ({ type: INVOICE_MODAL, showModal });