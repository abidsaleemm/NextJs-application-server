import pdfFillForm from "pdf-fill-form";
import path from "path";
import authMiddleware from "../auth/middleware";
import queryProjectDetail from "../query/projectDetail";

const templateFile = path.resolve(
  __dirname,
  "../invoiceTemplate/F245-127-000.pdf"
);

export default ({ server, app }) => {
  server.get("/invoice", authMiddleware(), async (req, res) => {
    const { 
      user: { 
        // Client data
        name,
        address,
        state,
        zip,
        city,
        phone,
        ...user 
      } = {} 
    } = req;

    // TODO Handle multible studies
    // This need to be patient distinct
    const projectDetail = await queryProjectDetail({ studyUID: req.query.id });
    const { 
      patientID,
      patientName,
      patientBirthDate,
      patientSex,
      patientAge,
      patientWeight,
      patientAddress,
      patientTelephoneNumbers,
      institutionName,
      referringPhysicianName,
    } = projectDetail;

    const pdfDetails = {
      // ...projectDetail,
      // ...user,
      pt_name: patientName,
      form_to: `${name}\r\n${address}`,
      price: "$300", //  TODO This will work for now but should decide best way to store
      // taxId: "593784049",
      // TODO Clean up address and break up into street, city, zip, state, country
    };

    const result = await pdfFillForm.write(templateFile, pdfDetails, { save: "pdf" })

    const fileName = `${name} - ${patientName}`;

    res.setHeader("Content-Transfer-Encoding", "binary");
    res.setHeader("Content-Encoding", "none");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", result.length);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}.pdf`
    );
    res.status(200).end(result, "binary");
  });
};
