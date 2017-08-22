import path from 'path';
import moment from 'moment';

export default async ({
    patientName = '-',
    location = '-',
    studyDate = '-',
    modality = '-',
    studyName = '-',
    price = '-',
    patientID = '-',
    ownerName = '',
    city = '',
    state = '',
    phone = '',
    country= '',
    taxId = '-',
    invoiceDate = moment().format("MM-DD-YYYY"),
}) => {
    const htmlFilePath = path.join(__dirname, '../invoiceTemplate/invoiceTemplate.html');
    let htmlTemplate = fs.readFileSync(htmlFilePath, {
        encoding: "utf-8"
    });

    htmlTemplate = htmlTemplate
        .replace(/{invoiceName}/g, patientName)
        .replace(/{invoiceLocation}/g, location)
        .replace(/{todayDate}/g, invoiceDate)
        .replace(/{invoiceStudyDate}/g, studyDate)
        .replace(/{invoiceModality}/g, modality)
        .replace(/{invoiceStudyName}/g, studyName)
        .replace(/{invoicePrice}/g, price)
        .replace(/{clientId}/g, patientID)
        .replace(/{ownerName}/g, ownerName)
        .replace(/{city}/g, city)
        .replace (/{state}/g, state)
        .replace (/{country}/g, country)
        .replace(/{phone}/g, phone)
        .replace(/{taxId}/g, taxId);

    return htmlTemplate;
}