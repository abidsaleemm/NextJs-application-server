import React from "react";
import { Table, Button } from 'reactstrap';

import Nav from '../components/nav'; // issue-16
import styleBootstrap from 'bootstrap/dist/css/bootstrap.css';

import getStatusName from '../helpers/getStatusName';
import axios from 'axios';


// TODO Create invoice
// TODO create video preview and download link

export default class extends React.Component {
  constructor() {
    super();
    //  this.getCanvas = this.getCanvas.bind(this);
    //  this.appendHtml = this.appendHtml.bind(this);
  }
  static async getInitialProps({ req, query }) {
    const { projects } = query;
    return { projects };
  }

  componentDidMount() {
    console.log("done mounting");

  }
  downloadPdf(e) {
e.preventDefault();
// axios({
//             method: 'get',
//             url: 'http://localhost:3000/pdf',
//             credentials : 'same-origin'
//         });


axios.get('/pdf', {
    credentials : 'same-origin'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    
    // need to require here because page throwing 'ReferenceError: window is not defined'. 
    //may be due to server side rendering..

    // const jsPdf = require('jspdf');
    // var invoice = require('./te.html');
    // var html2canvas = require('html2canvas');
    // var rasterizeHTML = require('rasterizehtml');



    // var canvas = document.createElement("canvas"),
    //   context = canvas.getContext('2d'),
    //   html = invoice;

    // rasterizeHTML.drawHTML(html).then(function (renderResult) {
    //   context.drawImage(renderResult.image, 10, 10);
    //   setTimeout(() => {
    //     var image = canvas.toDataURL('image/png');
    //     document.body.appendChild(canvas);
    //     console.log(image)

    //   }, 2000)
    // });


    //var d = document.createElement('div');
    //d.appendChild = invoice;
    
    // var h = d.firstChild;
    // console.log(doc)
    // console.log(h);
    // var doc = (new DOMParser).parseFromString(invoice, 'text/html');
    // html2canvas(doc).then(function (canvas) {
    //   var image = canvas.toDataURL('image/png');
    //   console.log(image)
    // });


    // const pdf = new jsPdf('p', 'mm', 'a4');
    // pdf.fromHTML(invoice, 7, 7,{'width': 100});
    // pdf.save('test.pdf');




  }






  render() {
    const { props: { projects = [] } } = this;

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styleBootstrap }} />
        <Nav />
        <Table striped hover>
          <thead>
            <tr>
              <th>Status</th>
              <th>Patient Name</th>
              <th>Study Name</th>
              <th>Study Date</th>
              <th>Modality</th>
              <th>Location</th>
              <th>Download</th>
              <th>Preview</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(({
              studyUID,
              status,
              patientName,
              studyName,
              studyDate,
              modality,
              activity,
              location,
        }) => (
                <tr onClick={() => window.location = `/projectDetail/${studyUID}`}>
                  <td>{getStatusName(status)}</td>
                  <td>{patientName}</td>
                  <td>{studyName}</td>
                  <td>{studyDate}</td>
                  <td>{modality}</td>
                  <td>{location}</td>
                  <td><Button onClick={(e) => {this.downloadPdf(e)}} >Download</Button></td>
                  <td><Button>Preview</Button></td>
                  <td><Button>Invoice</Button></td>
                </tr>
              ))}
          </tbody>
        </Table>

      </div>
    );
  }
}
