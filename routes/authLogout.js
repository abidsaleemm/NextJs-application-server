export default ({ server, app }) =>
  server.get("/auth/logout", async (req, res) => {
    return res.redirect("/auth/logout");
  });
