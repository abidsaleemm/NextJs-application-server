import authMiddleware from "../auth/middleware";
import { adapter } from "../server";

export default ({ server, app }) => {
  const {
    dicom: { getStudy = () => {} } = {},
    projects: { getProjectSnapshot = () => {} } = {}
  } = adapter;

  server.get("/export", authMiddleware(), async (req, res) => {
    const { query: { studyUID = "" } = {} } = req;

    const project = await getProjectSnapshot({ studyUID });

    // Lookup DICOM tag info
    const { patientName, studyType, studyDate } = await getStudy({ studyUID });

    const filename = `${patientName} - ${studyType} - ${studyDate}`;

    // TODO Add some sort of try /catch here and handle error
    const serialize = JSON.stringify(project);

    res.setHeader("Content-Transfer-Encoding", "binary");
    res.setHeader("Content-Encoding", "none");
    res.setHeader("Content-Length", serialize.length);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}.json"`
    );
    res.status(200).end(serialize, "binary");
  });
};
