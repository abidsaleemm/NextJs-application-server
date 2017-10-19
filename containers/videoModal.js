import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setVideo } from "../actions";
import VideoModal from "../components/videoModal";

export default connect(
  ({ videoRoute = "" }) => ({
    url: videoRoute,
    show: videoRoute
  }),
  dispatch => bindActionCreators({ onClose: setVideo }, dispatch)
)(VideoModal);
