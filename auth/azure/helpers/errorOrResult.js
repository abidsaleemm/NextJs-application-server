export default (error, result, fn) => {
  return error ? fn(error) : fn(null, result);
};
