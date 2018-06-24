import authMiddleware from "../auth/middleware";
// import { getProjectSnapshot } from "../projects";
// import { getStudy } from "../dicom";
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
    const { patientName } = await getStudy({ studyUID });

    // TODO Add some sort of try /catch here and handle error
    const serialize = JSON.stringify(project);

    res.setHeader("Content-Transfer-Encoding", "binary");
    res.setHeader("Content-Encoding", "none");
    res.setHeader("Content-Length", serialize.length);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${patientName}.json"`
    );
    res.status(200).end(serialize, "binary");
  });
};
