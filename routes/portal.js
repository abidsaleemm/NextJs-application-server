const invoiceHtml = (data, htmlPath, done) => {
  if (data.hasOwnProperty("id")) {
    delete data["id"];
  }
  const today = moment().format("MM-DD-YYYY");
  data.todayDate = today;
  const htmlFilePath = path.join(__dirname, htmlPath);
  var htmlTemplate = fs.readFileSync(htmlFilePath, { encoding: "utf-8" });

  for (var key in data) {
    if (data[key] != "undefined") {
      htmlTemplate = htmlTemplate.replace(
        new RegExp("{" + key + "}", "g"),
        data[key]
      );
    } else {
      htmlTemplate = htmlTemplate.replace(
        new RegExp("{" + key + "}", "g"),
        "_"
      );
    }
  }

  done(htmlTemplate);
};

import authMiddleware from "../auth/middleware";
import queryPortal from "../query/portal";

export default ({ server, app }) => {
  server.get(
    "/portal",
    authMiddleware(),
    async ({ ...req, user: { client = false, id: clientId }, query }, res) =>
      app.render(req, res, "/portal", {
        ...query,
        portal: await queryPortal({ clientId })
      })
  );

  server.get("/pdf", async (req, res) => {
    const fileName =
      req.query.invoiceName != "undefined" ? req.query.invoiceName : "patient";
    invoiceHtml(
      req.query,
      "../invoice_template/invoiceTemplate.html",
      htmlTemplate => {
        pdf.create(htmlTemplate).toBuffer(function(err, stream) {
          if (err) res.send(err);
          res.setHeader(
            "Content-Disposition",
            "attachment; filename= " + fileName + ".pdf"
          );
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader("Content-Length", stream.length);
          res.status(200).end(stream, "binary");
        });
      }
    );
  });
};
