import React from "react";
import { Table, Button } from 'reactstrap';
import styleBootstrap from 'bootstrap/dist/css/bootstrap.css';
import Nav from '../components/nav'; // issue-16
import getStatusName from '../helpers/getStatusName';
import axios from 'axios';


// TODO Create invoice
// TODO create video preview and download link

export default class extends React.Component {

  static async getInitialProps({ req, query }) {
    const { projects } = query;
    return { projects };
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
                <tr>
                  <td>{getStatusName(status)}</td>
                  <td>{patientName}</td>
                  <td>{studyName}</td>
                  <td>{studyDate}</td>
                  <td>{modality}</td>
                  <td>{location}</td>
                  <td><Button>Download</Button></td>
                  <td><Button>Preview</Button></td>
                  <td><a className="btn btn-secondary" href={"/pdf?id="+studyUID+'&invoiceName='+patientName+"&invoiceLocation="+location+"&invoiceModality="+modality+'&invoiceStudyDate='+studyDate+'&invoiceStudyName='+studyName+'&invoicePrice=$300'} >Invoice</a></td>
                </tr>
              ))}
          </tbody>
        </Table>

      </div>
    );
  }
}
