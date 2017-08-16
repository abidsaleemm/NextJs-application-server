import authMiddleware from "../auth/middleware";
import helperInvoiceHtml from "../helpers/invoiceHtml";
import path from 'path';
import moment from 'moment';
import queryProjectDetail from "../query/projectDetail";
import pdf from 'html-pdf';




  

  
  export default ({ server, app }) => {
  
    server.get("/pdf", authMiddleware(), async (req, res) => {
      const projectDetail =  await queryProjectDetail( { studyUID : req.query.id});

      const fileName = projectDetail.patientName != "undefined" ? projectDetail.patientName : "patient";
      projectDetail.price ="$300";
      projectDetail.taxId ="593784049";
      projectDetail.addrssline1 = 'OPEN MIRI SOLUTION LLC';
      projectDetail.addrssline2 = '1020 E PALMDALE ST STE 150';
      projectDetail.addrssline3 = 'TUCSON, AZ 857143309';
      const htmlTemplate =  await helperInvoiceHtml(projectDetail);
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
       
    });
  };
  