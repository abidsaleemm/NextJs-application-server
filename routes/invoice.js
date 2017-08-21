import authMiddleware from "../auth/middleware";
import helperInvoiceHtml from "../helpers/invoiceHtml";
import queryProjectDetail from "../query/projectDetail";
import pdf from "html-pdf";

export default ({ server, app }) => {
  server.get("/pdf", authMiddleware(), async (req, res) => {
    const { user: { name, ...user} = {} } = req;

    const projectDetail = await queryProjectDetail({ studyUID: req.query.id });
    const invoiceDetails = {
      ...projectDetail,
      ...user,
      price: "$300", //  TODO This will work for now but should decide best way to store
      taxId: "593784049", 
      // TODO Clean up address and break up into street, city, zip, state, country
      addrssline1: name,
      addrssline2: "1020 E PALMDALE ST STE 150",
      addrssline3: 'TUCSON, AZ 857143309',
    };

    // TODO Decide best way to name file?
    const fileName =
      projectDetail.patientName != "undefined"
        ? projectDetail.patientName
        : "patient";

    const htmlTemplate = await helperInvoiceHtml(invoiceDetails);
    
    pdf.create(htmlTemplate).toBuffer((err, stream) => {
      if (err) {
        res.send(err);
        return;
      }

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${fileName}.pdf`
      );

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Length", stream.length);
      res.status(200).end(stream, "binary");
    });
  });
};
