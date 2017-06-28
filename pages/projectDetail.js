import React, { Component, PropTypes } from "react";
import Nav from '../components/nav'; // TODO wrap in HOC
import {
  Table,
  Button, 
  ButtonGroup,
  ButtonDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
  Card, 
  CardImg, 
  CardText, 
  CardBlock, 
  CardLink,
  CardTitle, 
  CardSubtitle,
} from 'reactstrap';
import Iframe from 'react-iframe';

// TODO Handle this some place else
import getStatusName from '../helpers/getStatusName';
import getClientList from '../helpers/getClientList';
import getClientNameById from '../helpers/getClientNameById';

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
    const { status = 0, client = 0 } = props;

    this.state = {
      height: 200,
      openStatus: false,
      openClient: false,
      status,
      client,
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

  // TODO Move to helper directory?
  setStatus = async (status = 0) => {
    const { 
      props: { projectDetail: { studyUID = '' } = {} } = {} 
    } = this;

    const { status: retStatus } = await fetch(
      `/api/setProjectStatus/${studyUID}/${status}`,
      { credentials: 'same-origin' }
    ).then(res => res.json());

    this.setState({ status: retStatus });
  }

  // TODO Move to helper directory?
  setClient = async (client = 0) => {
    const { 
      props: { projectDetail: { studyUID = '' } = {} } = {} 
    } = this;

    const { client: retClient } = await fetch(
      `/api/setProjectClient/${studyUID}/${client}`,
      { credentials: 'same-origin' }
    ).then(res => res.json());

    console.log('retClient', retClient)
    this.setState({ client: retClient });
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
      // client = 0, // Set this with API
    } = {},
      },
      state: {
        height,
        openStatus,
        openClient,
        status = 0,
        client = 0,
      } = {},
      toggleStatus,
      toggleClient,
      setStatus,
    } = this;


    const clients = getClientList();
    
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
                          { getStatusName(status) || 'Uploaded' }
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem onClick={() => this.setStatus(0)}>{ getStatusName(0) }</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus(1)}>{ getStatusName(1) }</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus(2)}>{ getStatusName(2) }</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus(3)}>{ getStatusName(3) }</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus(4)}>{ getStatusName(4) }</DropdownItem>
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
                          { getClientNameById(client) || 'None' }
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem onClick={() => this.setClient(0)}>None</DropdownItem>
                          { clients.map(({ id, name}) => (
                            <DropdownItem 
                              key={`${name}-${id}`} onClick={() => 
                                this.setClient(id)}
                            >{name}</DropdownItem>
                          ))}
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
            <Iframe url={`/client/?p=${studyUID}`}
              width="100%"
              height={`${height}px`}
              display="initial"
              position="relative"
              marginheight={0}
              frameborder={0}
              marginwidth={0}
            />
          </div>
        </div>
      </div>
    );
  }
}
