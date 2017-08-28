import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setInvoice } from '../actions';
import PdfModal from '../components/pdfModal';

export default connect(
  ({ portal: { invoiceRoute = '' } = {} }) => ({ 
    url: invoiceRoute,
    show: invoiceRoute,
  }),
  (dispatch) => bindActionCreators({ onClose: setInvoice }, dispatch),
)(PdfModal);
