export default ({ server, app }) =>
  server.get("/upload/:boxFolderId", async (req, res) => {
    const { params: { boxFolderId } = {} } = req;

    return app.render(req, res, "/upload", {
      boxFolderId
    });
  });
