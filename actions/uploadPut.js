import socketApi from '../helpers/socketApi';
import fetchApi from '../helpers/fetchApi';
import fetchAction from './fetchAction';
import payloadPortal from './payloadPortal';

export default ({ data, name, studyUID = ''}) => dispatch => {
  dispatch(fetchAction(true));
  socketApi("uploadPut", { studyUID, name, data })
    .then(async v => {
      dispatch(payloadPortal(await fetchApi("portal")));
      dispatch(fetchAction(false));
    })
    .catch(e => {
      console.log(e);
      dispatch(fetchAction(false));
    });
};