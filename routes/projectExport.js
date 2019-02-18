import authMiddleware from "../auth/middleware";

export default ({ server, app, adapter }) => {
    const {
        dicom: { getStudy = () => { } } = {},
        projects: { getProjectPayload = () => { } } = {}
    } = adapter;

    server.get("/export", authMiddleware(), async (req, res) => {
        const { query: { studyUID = "" } = {} } = req;

        const project = await getProjectPayload({ studyUID });

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
