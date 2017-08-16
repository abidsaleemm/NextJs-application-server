import fetchApi from "../helpers/fetchApi";
import { PROJECTDETAIL_SET_CLIENT } from '../constants/actionTypes';

export default ({ studyUID, client }) => dispatch => {
    console.log('setting project client')
    fetchApi("setProject", { studyUID, client })
      .then(success => dispatch({ type: PROJECTDETAIL_SET_CLIENT, client }))
      .catch(error => {
        // TODO Wrap globally in fetch action
      });
  };
