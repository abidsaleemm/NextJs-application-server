import pdfFillForm from "pdf-fill-form";
import path from "path";
import authMiddleware from "../auth/middleware";
import { getStudiesByPatientID, getStudy } from "../dicom";
import { getClientInfo } from "../authUsers";

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
      query: { id: patientID = 0 } = {}
    } = req;

    // Do lookup of patient study just need first record for now
    const studies = await getStudiesByPatientID({ patientID });
    const { 0: { studyUID: firstStudy = "" } = {} } = studies;

    const study = await getStudy({ studyUID: firstStudy });
    const {
      patientName,
      patientBirthDate,
      patientSex,
      clientID = 0,
      patientAge,
      studyDate,
      referringPhysicianName
    } = study;

    console.log (study);
    const dates = patientBirthDate.split ('-');
    const birthDay = dates[2];
    const birthMonth = dates[1];
    const birthYear = dates[0];

    const studyDates = studyDate.split ('-');
    const studyDay = studyDates[2];
    const studyMonth = studyDates[1];
    const studyYear = studyDates[0];

    const clientInfo = await getClientInfo ({ clientID });
    const {
      name: clientName,
      address: clientAddress,
      city: clientCity,
      state: clientState,
      country: clientCountry,
      zip: clientZip
    } = clientInfo;

    console.log (clientInfo);
    /*
     * TODO: These values are hard coded until we add these fields
     * to the user project model. At that time we might consider making
     * the model fields the same name as the pdf so that we can map 1 to 1
    */

    const taxEIN = "593784049";

    // TODO If multiple studies create multiple charges

    const pdfDetails = {
      // insurance_type: "Medicaid",
      pt_name: patientName,
      form_to: `${clientName}\r\n${clientAddress}\r\n${clientCity} ${clientState}`,
      // pt_street: "",
      // pt_city: "Tucson",
      // pt_state: "AZ",
      // pt_zip: "85224",
      // pt_AreaCode: "520",
      // pt_phone: "555-5555",
      sex: patientSex === "Male" ? "male" : "female",
      ins_sex: patientSex === "Male" ? "male" : "female",
      rel_to_ins: "spouse",
      employment: "no",
      pt_accident: "yes",
      other_accident: "no",
      pt_signature: "SIGNATURE ON FILE",
      ins_name: patientName,
      // ins_street: "Same",
      ins_dob_mm: birthMonth,
      ins_dob_dd: birthDay,
      ins_dob_yy: birthYear,
      birth_mm: birthMonth,
      birth_dd: birthDay,
      birth_yy: birthYear,
      ins_signature: "SIGNATURE ON FILE",
      add_claim_info: "MEDICAL RECORDS ATTACHED",
      sv1_mm_from: studyMonth,
      sv1_dd_from: studyDay,
      sv1_yy_from: studyYear,
      place1: "76377",
      ch1: "500.00",
      tax_id: "593784049",
      ssn: taxEIN,
      t_charge: "500.00",
      ref_physician: referringPhysicianName
    };

    const result = await pdfFillForm.write(templateFile, pdfDetails, {
      save: "pdf"
    });

    const fileName = `${name} - ${patientName}`;

    console.log('fileName', fileName);

    res.setHeader("Content-Transfer-Encoding", "binary");
    res.setHeader("Content-Encoding", "none");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Length", result.length);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${fileName}.pdf"`
    );
    res.status(200).end(result, "binary");
  });
};
