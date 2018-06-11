export default (status = 0) =>
  ((
    statusNames = {
      0: "None",
      1: "Start",
      2: "Segmentation",
      3: "Injuries",
      4: "Review",
      5: "Done"
    }
  ) => statusNames[status])();
