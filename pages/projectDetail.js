import React, { Component, PropTypes } from "react";
import Nav from '../components/nav'; // issue-16
import axios from "axios";
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

import getStatusName from '../helpers/getStatusName';
import getClientList from '../helpers/getClientList';
import getClientNameById from '../helpers/getClientNameById';
import fetchApi from '../helpers/fetchApi';

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
    return { ...projectDetail };
  };

  constructor(props) {
    super(props);
    const { status = 0, client = 0 } = props;

    this.state = {
      height: 800,
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
      const height = window.innerHeight - (offsetTop + 8);
      this.setState({ height });
    }
  }

  // TODO Move fetch actions to helper directory?
  setStatus = async (status = 0) => {
    const { props: { studyUID = '' } = {} } = this;
    this.setState(await fetchApi('setProject', { studyUID, status }));
  }

  // TODO Move fetch actions to helper directory?
  setClient = async (client = 0) => {
    const { props: { studyUID = '' } = {} } = this;
    this.setState(await fetchApi('setProject', { studyUID, client }));
  }
  iframeData = (url)=>{
  axios.get(url)
      .then(function (response) {
        if (response.data) {
          //return url;
        }
      })
      .catch(function (error) {
        if (error.response) {
           return  window.location = '/';
          
        }
      });
}

  render() {
    const {
      props: {
      studyUID,
      studyName,
      patientName,
      studyDate,
      modality,
      location,
    },
      state: {
        height,
        openStatus,
        openClient,
        status = 0,
        client = 0,
      } = {},
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
                        toggle={() => {
                          this.setState({
                            openStatus: !this.state.openStatus
                          });
                        }}
                      >
                        <DropdownToggle caret>
                          {getStatusName(status)}
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem onClick={() => this.setStatus(0)}>{getStatusName(0)}</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus(1)}>{getStatusName(1)}</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus(2)}>{getStatusName(2)}</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus(3)}>{getStatusName(3)}</DropdownItem>
                          <DropdownItem onClick={() => this.setStatus(4)}>{getStatusName(4)}</DropdownItem>
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
                        toggle={() => {
                          this.setState({
                            openClient: !this.state.openClient
                          });
                        }}
                      >
                        <DropdownToggle caret>
                          {getClientNameById(client) || 'None'}
                        </DropdownToggle>
                        <DropdownMenu >
                          <DropdownItem onClick={() => this.setClient(0)}>None</DropdownItem>
                          {clients.map(({ id, name }) => (
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
              onload={this.iframeData(`/client/?p=${studyUID}`)}
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
