export default ({
  studyType = "",
  patientName = "",
  studyDate = ""
}) => `${patientName} - ${studyType} - ${studyDate}.mp4`;
