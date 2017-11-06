import dateFormat from "dateformat";

// TODO Propose to move this to indexer and store directly in DB
const parseDate = date => {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  return `${year}-${month}-${day}`;
};

const transform = ({
  patientName = "",
  studyDate = "",
  patientBirthDate = "",
  uploadDateTime,
  referringPhysicianName,
  ...study
}) => ({
  ...Object.entries(study).reduce(
    (a, [k, v]) => ({ ...a, [k]: v === undefined ? "" : v }),
    {}
  ),
  patientName: patientName.replace(/\^/g, " "),
  referringPhysicianName: referringPhysicianName.replace (/\^/g, " "),
  studyDate: parseDate(studyDate),
  patientBirthDate: parseDate(patientBirthDate),
  uploadDateTime: dateFormat(new Date(uploadDateTime), "isoDate")
});

module.exports = (({ getStudies, getStudy, ...adapter }) => ({
  ...adapter,
  getStudies: async () => {
    const studies = await getStudies();
    return studies.map(transform);
  },
  getStudy: async props => transform(await getStudy(props))
}))(
  process.env.LOCAL !== undefined
    ? require("./adapterLocal")
    : require("./adapterAzure")
);
