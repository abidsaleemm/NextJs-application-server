// TODO This should be a reusable helper function?
export default (
  socket,
  criteria = "",
  { eventName = "action" } = {}
) => ({ dispatch }) => {
  socket.on(eventName, (payload, callback = () => {}) => {
    dispatch(payload);
    callback(null, "done");
  });

  return next => action => {
    const { type } = action;

    if (type.indexOf(criteria) === 0) {
      socket.emit(eventName, action);
    }

    return next(action);
  };
};
