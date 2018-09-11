export default ({ role, userID, userList = [] }) => ([
  study,
  { userID: projectUserID, status } = {}
]) => {
  if (
    role !== "admin" &&
    status !== "Start" &&
    status !== "Segmentation" &&
    status !== "QC" &&
    status !== "Review" &&
    status !== "Done" // TODO Should we remove this?
  ) {
    return false;
  }

  // TODO Fix with type check?
  if (projectUserID == userID) {
    return true;
  }

  if (role === "admin") {
    return true;
  }

  if (role === "teamAdmin" && projectUserID === undefined) {
    return true;
  }

  // TODO Fix with type check?
  return userList.some(({ id }) => id == projectUserID);
};
