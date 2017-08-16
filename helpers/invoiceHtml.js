import path from 'path';
import moment from 'moment';


export default async(projectDetail) => {
    const today = moment().format("MM-DD-YYYY");
    const htmlFilePath = path.join(__dirname, '../invoiceTemplate/invoiceTemplate.html');
    var htmlTemplate = fs.readFileSync(htmlFilePath, {
        encoding: "utf-8"
    });
    htmlTemplate = htmlTemplate.replace(/{invoiceName}/g, projectDetail.patientName ? projectDetail.patientName : '-')
        .replace(/{invoiceLocation}/g, projectDetail.location ? projectDetail.location : '-')
        .replace(/{todayDate}/g, today)
        .replace(/{invoiceStudyDate}/g, projectDetail.studyDate ? projectDetail.studyDate : '-')
        .replace(/{invoiceModality}/g, projectDetail.modality ? projectDetail.modality : '-')
        .replace(/{invoiceStudyName}/g, projectDetail.studyName ? projectDetail.studyName : '-')
        .replace(/{invoicePrice}/g, projectDetail.price ? projectDetail.price : '-')
        .replace(/{invoicePrice}/g, projectDetail.price ? projectDetail.price : '-')
        .replace(/{clientId}/g, projectDetail.patientID ? projectDetail.patientID : '-')
        .replace(/{addrssline1}/g, projectDetail.addrssline1)
        .replace(/{addrssline2}/g, projectDetail.addrssline2)
        .replace(/{addrssline3}/g, projectDetail.addrssline3)
        .replace(/{taxId}/g, projectDetail.taxId);


    return htmlTemplate;
}