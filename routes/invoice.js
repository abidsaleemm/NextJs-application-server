import authMiddleware from "../auth/middleware";
import pdfFillForm from 'pdf-fill-form';
import path from 'path';

const templateFile = path.resolve(__dirname, '../invoiceTemplate/F245-127-000.pdf');

export default ({ server, app }) => {
  server.get("/invoice", authMiddleware(), async (req, res) => {
    console.log(req, "the request")
    pdfFillForm.write(
      templateFile,
      {form_to: "It works!"},
      { "save": "pdf" }
    )
    .then( result => {
      const { user: { name, ...user } = {} } = req;
      const fileName = name;
      res.setHeader('Content-Transfer-Encoding', 'binary');  
      res.setHeader("Content-Encoding", "none");
      res.setHeader("Content-Type", "application/pdf");
    
      res.setHeader("Content-Length", result.length);
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${fileName}.pdf`
      );
      res.status(200).end(result, "binary");
    }, err => {
      console.log( err );
    });
  });
};

