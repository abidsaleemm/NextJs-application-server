import React, { Component, PropTypes } from "react";
import Nav from '../components/nav'; // TODO wrap in HOC
import {
  Table,
  Button, ButtonGroup
} from 'reactstrap';

import { Card, CardImg, CardText, CardBlock, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap';
  
// TODO Wrap this in a HOC
import styleBootstrap from 'bootstrap/dist/css/bootstrap.css';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
};

export default class extends Component {
  static getInitialProps({ req, query }) {
    const { projectDetail } = query;
    return { projectDetail };
  };

  render() {
    const {
      props: {
        projectDetail: {
          studyUID,
      studyName,
      patientName,
      studyDate,
      modality,
      location,
      client = 'NHF', // Set this with API
    } = {},
      },
    } = this;

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styleBootstrap }} />
        <Nav />
        <div style={styles.container}>
          <div style={{ minWidth: '400px', background: 'red' }}>
            <Card>
        <CardBlock>
          <CardTitle>Project Details</CardTitle>
          <CardSubtitle>{ patientName }</CardSubtitle>
        </CardBlock>
            <Table>
              <tbody>
                <tr>
                  <th scope="row">Status</th>
                  <td>
                    <ButtonGroup>
                      <Button>Left</Button>{' '}
                      <Button>Middle</Button>{' '}
                      <Button>Right</Button>
                    </ButtonGroup>

                  </td>
                </tr>
                <tr>
                  <th scope="row">Study Name</th>
                  <td>{studyName}</td>
                </tr>
                <tr>
                  <th scope="row">Study Date</th>
                  <td>{studyDate}</td>
                </tr>
                <tr>
                  <th scope="row">Modality</th>
                  <td>{modality}</td>
                </tr>
                <tr>
                  <th scope="row">Location</th>
                  <td>{location}</td>
                </tr>
                <tr>
                  <th scope="row">Client</th>
                  <td>{client}</td>
                </tr>
              </tbody>
            </Table>
             <CardBlock>
          <CardLink href="#">Snapshots</CardLink>
          <CardLink href="#">Back / Restore</CardLink>
        </CardBlock>
      </Card>
          </div>
          <div style={{ width: '100%', background: 'blue' }}>
            Insights go here
          </div>
        </div>
      </div>
    );
  }
}