import dateFormat from "dateformat";
import mapStudyType from "../helpers/mapStudyType";
import mapPatientName from "../helpers/mapPatientName";

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
  studyName = "",
  patientBirthDate = "",
  uploadDateTime,
  referringPhysicianName = "",
  patientSex = "",
  ...study
} = {}) => {
  return {
    studyName,
    ...Object.entries(study).reduce(
      (a, [k, v]) => ({ ...a, [k]: v === undefined ? "" : v }),
      {}
    ),
    patientName: mapPatientName({ patientName }),
    referringPhysicianName: referringPhysicianName
      .replace(/\^/g, " ")
      .trim(),
    studyDate: parseDate(studyDate),
    studyType: mapStudyType({ studyName }),
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
        const studies = await getStudies();
        return studies.map(transform);
      },
      getStudy: async props => transform(await getStudy(props))
    }
  };
};
