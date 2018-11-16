export default (store, data) => {
  var offset;

  if (data.cookie.originalMaxAge) {
    offset = data.cookie.originalMaxAge;
  } else {
    offset = store.sessionTimeOut * 60000;
  }

  return offset ? new Date(Date.now() + offset) : null;
};
