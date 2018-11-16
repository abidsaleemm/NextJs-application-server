export default (sid) => {
  return sid.replace(/[^0-9A-Za-z]/g, "");
}