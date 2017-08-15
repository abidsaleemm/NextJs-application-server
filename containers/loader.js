import { connect } from 'react-redux';
import Loader from '../components/loader';

export default connect(
  ({
    fetching = false,
  }) => ({
    fetching,
  }),
  () => ({}),
)(Loader);
