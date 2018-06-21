export default (status = 0) =>
  ((
    statusNames = {
      0: "None",
      1: "Pending",
      2: "Segmentation",
      3: "Injuries",
      4: "Review",
      5: "Done",
      6: "Rendered",
      7: "Delivered"
    }
  ) => statusNames[status])();
