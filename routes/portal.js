import { getStudies } from '../dicom';
import { getProjectList } from '../projects';
import pdf from 'html-pdf';
import fs from 'fs';

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
    server.get("/pdf", async (req, res) => {
        console.log("inside pdf===========");
        var path = require('path'),
            filePath = path.join(__dirname, 'te.html');

        var html = fs.readFileSync(filePath, { encoding: 'utf-8' });

        var file = fs.createWriteStream("file.pdf");
        var options = { format: 'Letter' };
        pdf.create(html).toBuffer(function (err, stream) {
            console.log(err);
           // console.log(stream)
            //stream.pipe(file);
            //    stream.pipe(res);
            //res.download(stream, 'test.pdf')

            // res.setHeader('Content-Length', stream.length);
            // res.setHeader('Content-Type', 'application/pdf');
            // res.setHeader('Content-Disposition', 'attachment; filename=your_file_name.pdf');
            // res.write(stream, 'binary');
            // res.end();

                console.log(stream.length);
                res.setHeader('Content-Disposition', 'attachment; filename= name1.pdf');
                res.setHeader('Content-Type', 'application/pdf');                
                res.setHeader('Content-Length', stream.length);
                res.status(200).end(stream, 'binary');
                });

 });

// pdf.create(html).toBuffer(function (err, buffer) {
//     if (err) return res.send(err);
//     res.type('pdf');
//     res.setHeader('Content-Type', 'application/pdf');
//     res.end(buffer, 'binary');
// });

  //  })

}


