import pdfFillForm from "pdf-fill-form";
import path from "path";
import authMiddleware from "../auth/middleware";
import queryProjectDetail from "../query/projectDetail";
import { getStudiesByPatientID } from '../dicom';

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
      } = {},
      query: {
        id: patientID = 0
      } = {}
    } = req;

    // Do lookup of patient study just need first record for now
    const studies = getStudiesByPatientID({ patientID });
    const { 0: { studyUID: firstStudy = '' } = {} } = studies;

    // This need to be patient distinct
    const projectDetail = await queryProjectDetail({ studyUID: firstStudy });
    const {
      patientName,
      patientBirthDate,
      patientSex,
      patientAge,
      patientWeight,
      patientAddress,
      patientTelephoneNumbers,
      institutionName,
      referringPhysicianName
    } = projectDetail;

    /*
     * TODO: These values are hard coded until we add these fields
     * to the user project model. At that time we might consider making
     * the model fields the same name as the pdf so that we can map 1 to 1
    */

    const pdfDetails = {
      insurance_type: "Medicaid",
      pt_name: patientName,
      form_to: `${name}\r\n3333 E. Diego Dr\r\nTucson AZ`,
      pt_street: "123 W Elm St",
      pt_city: "Tucson",
      pt_state: "AZ",
      pt_zip: "85224",
      pt_AreaCode: "520",
      pt_phone: "555-5555",
      sex: "male",
      rel_to_ins: "spouse",
      employment: "no",
      pt_accident: "yes",
      other_accident: "no",
      pt_signature: "SIGNATURE ON FILE",
      ins_name: "Same",
      ins_street: "Same",
      ins_dob_mm: "01",
      ins_dob_dd: "01",
      ins_dod_yy: "77",
      ins_signature: "SIGNATURE ON FILE",
      add_claim_info: "MEDICAL RECORDS ATTACHED",
      sv1_mm_from: "08",
      sv1_dd_from: "22",
      sv1_yy_from: "17",
      place1: "76377",
      ch1: "500.00",
      tax_id: "593784049",
      ssn: "EIN",
      t_charge: "500.00"
    };

    const result = await pdfFillForm.write(templateFile, pdfDetails, {
      save: "pdf"
    });

    const fileName = `${name} - ${patientName}`;

    res.setHeader("Content-Transfer-Encoding", "binary");
    res.setHeader("Content-Encoding", "none");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", result.length);
    res.setHeader("Content-Disposition", `inline; filename=${fileName}.pdf`);
    res.status(200).end(result, "binary");
  });
};
