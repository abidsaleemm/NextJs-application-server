import React, { Component, PropTypes } from "react";
import Nav from '../components/nav'; // TODO wrap in HOC
import {
  Table,
  Button, ButtonGroup
} from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import Iframe from 'react-iframe';

import {
  Card, CardImg, CardText, CardBlock, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';

// TODO Wrap this in a HOC
import styleBootstrap from 'bootstrap/dist/css/bootstrap.css';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '100%',
  },
};

export default class extends Component {
  static getInitialProps({ req, query }) {
    const { projectDetail } = query;
    return { projectDetail };
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 200,
      openStatus: false,
      openClient: false,
      status: props.status,
    }
  }

  componentDidMount() {
    const { container } = this;

    this.resize();
    window.addEventListener('resize', this.resize);
  }

  resize = () => {
    const { container } = this;

    if (container) {
      const { offsetTop = 0, clientTop = 0 } = container;
      const height = window.innerHeight - (offsetTop + 6);
      this.setState({ height });
    }
  }

  toggleStatus = () => {
    this.setState({
      openStatus: !this.state.openStatus
    });
  }

  toggleClient = () => {
    this.setState({
      openClient: !this.state.openClient
    });
  }

  setStatus = (status) => {
    // fetch()
    console.log('status', status)
    this.setState({ status });
  }

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
      state: {
        height,
        openStatus,
        openClient,
        status = 'Uploaded',
      } = {},
      toggleStatus,
      toggleClient,
      setStatus,
    } = this;

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styleBootstrap }} />
        <Nav />
        <div style={styles.container} ref={(input) => { this.container = input; }}>
          <div style={{ minWidth: '400px' }}>
            <Card>
              <CardBlock>
                <CardTitle>Project Details</CardTitle>
                <CardSubtitle>{patientName}</CardSubtitle>
              </CardBlock>
              <br />
              <Button>Preview Video</Button>
              <br />
              <Table>
                <tbody>
                  <tr>
                    <th scope="row">Status</th>
                    <td>
                      <ButtonDropdown
                        isOpen={openStatus}
                        toggle={toggleStatus}
                      >
                        <DropdownToggle caret>
                          { status }
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem onClick={() => this.setStatus('Uploaded')}>Uploaded</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus('Segmentation')}>Segmentation</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus('Injuries')}>Injuries</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus('Review')}>Review</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus('Done')}>Done</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
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
                    <td>
                      <ButtonDropdown
                        isOpen={openClient}
                        toggle={toggleClient}
                      >
                        <DropdownToggle caret>
                          NHF
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem>None</DropdownItem>
                          <DropdownItem>NHF</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <CardBlock>
                <CardLink href="#">Snapshots</CardLink>
                <CardLink href="#">Backup / Restore</CardLink>
              </CardBlock>
            </Card>
          </div>
          <div style={{ width: '100%' }}>
            <Iframe url={`http://localhost:8081/?p=${studyUID}`}
              width="100%"
              height={`${height}px`}
              display="initial"
              position="relative" />
          </div>
        </div>
      </div>
    );
  }
}
