import dateFormat from "dateformat";

// TODO Propose to move this to indexer and store directly in DB
const parseDate = date => {
  try {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);

    return `${year}-${month}-${day}`;
  } catch (e) {
    return "";
  }
};

const transform = ({
  patientName = "",
  studyDate = "",
  patientBirthDate = "",
  uploadDateTime,
  referringPhysicianName = "",
  patientSex = "",
  ...study
}) => {
  return {
    ...Object.entries(study).reduce(
      (a, [k, v]) => ({ ...a, [k]: v === undefined ? "" : v }),
      {}
    ),
    patientName: patientName.replace(/\^/g, " ").trim(),
    referringPhysicianName: referringPhysicianName
      .replace(/\^/g, " ")
      .trim(),
    studyDate: parseDate(studyDate),
    patientBirthDate:
      patientBirthDate !== ""
        ? parseDate(patientBirthDate)
        : undefined,
    uploadDateTime: (() => {
      try {
        return dateFormat(new Date(uploadDateTime), "isoDate");
      } catch (e) {
        return "";
      }
    })(),
    patientSex: patientSex.substring(0, 1)
  };
};

export default props => {
  const {
    dicom: {
      getStudies = () => {},
      getStudy = () => {},
      ...dicomProps
    } = {}
  } = props;

  return {
    ...props,
    dicom: {
      ...dicomProps,
      getStudies: async () => {
        console.log("getStudies");
        const studies = await getStudies();
        return studies.map(transform);
      },
      getStudy: async props => transform(await getStudy(props))
    }
  };
};
