import { INVOICE_SET } from '../constants/actionTypes';

export default (studyUID) => ({
    type: INVOICE_SET,
    invoiceRoute: studyUID ? `/invoice/?id=${studyUID}` : null,
});