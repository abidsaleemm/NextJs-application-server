import socketApi from '../helpers/socketApi';

export default (apiFunction = '', data = {}) => dispatch => {
  // await ?
  // Add some sort of progress

  socketApi(apiFunction, data)
};