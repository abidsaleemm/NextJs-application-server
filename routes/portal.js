import { getStudies } from '../dicom';
import { getProjectList } from '../projects';
import pdf from 'html-pdf';
import fs from 'fs';
import path from 'path';
import moment from 'moment';

export default ({ server, app }) => {

    server.get("/portal", async (req, res) => {
        if (req.isAuthenticated()) { // issue-15
            // TODO This should be integrated in as middleware
            // Check if Client
            const { user: { client = false, id } } = req;
            if (client === true) {
                const studies = await getStudies();
                let projects = await getProjectList();
                projects = projects
                    .filter(v => v.client == id) // TODO fix typing?
                    .map(v => {
                        // Find matching Study
                        const study = studies.find(({ studyUID }) => v.studyUID === studyUID);
                        return { ...v, ...study };
                    });

                return app.render(req, res, "/portal", { ...req.query, projects });
            }

            return res.redirect('/projects');
        }

        // TODO create this as a reusable function
        // Also user the Flash to send an error message
        console.log('/portal not auth');
        return res.redirect('/');
    });

    /*  api service to download invoice pdf for portle
        used html-pdf npm module
        used fs to read html template for th format
     */
    server.get("/pdf", async (req, res) => {
        var fileName = (req.query.invoiceName != 'undefined') ? req.query.invoiceName : "patient";
        invoiceHtml(req.query, '../invoice_template/invoiceTemplate.html', (htmlTemplate) => {
            pdf.create(htmlTemplate).toBuffer(function (err, stream) {
                if (err) res.send(err);
                res.setHeader('Content-Disposition', 'attachment; filename= ' + fileName + '.pdf');
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Length', stream.length);
                res.status(200).end(stream, 'binary');
            });
        })
    });

    /**
     * returns callback with modified html template.
     * @param  data object, for values to be changed in html
     * @param  htmlPath string, html path with name.
     * @param  done callback 
     */

    const invoiceHtml = (data, htmlPath, done) => {
        if(data.hasOwnProperty('id')){
            delete data['id'];
        }
        const today = moment().format('MM-DD-YYYY');
        data.todayDate = today;
        const htmlFilePath = path.join(__dirname, htmlPath);
        var htmlTemplate = fs.readFileSync(htmlFilePath, { encoding: 'utf-8' });
        
        for (var key in data){ 
            if(data[key] != 'undefined'){
               htmlTemplate = htmlTemplate.replace((new RegExp('{'+key+'}', "g")), data[key]);
            }else{
                 htmlTemplate = htmlTemplate.replace((new RegExp('{'+key+'}', "g")), '_');
            }
        }
        done(htmlTemplate);
    }


}


