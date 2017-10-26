import fetchApi from "../helpers/fetchApi";
import fetchAction from "./fetchAction";
import payloadPortal from "./payloadPortal";

export default ({ data, name, studyUID = "" }) => dispatch => new Promise((resolve, reject) => {
  dispatch(fetchAction(true));
  fetchApi("uploadDel", { studyUID, name })
    .then(async v => {
      dispatch(payloadPortal(await fetchApi("portal")));
      dispatch(fetchAction(false));
      resolve();
    })
    .catch(e => {
      console.log(e);
      dispatch(fetchAction(false));
    });
});
