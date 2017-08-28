import { PAYLOAD_INVOICE } from '../constants/actionTypes';

export default async  ({studyUID}) => ({ type: PAYLOAD_INVOICE, clientDetails: {name: 'sample'} });