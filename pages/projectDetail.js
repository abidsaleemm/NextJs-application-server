import React, { Component, PropTypes } from "react";
import Nav from '../components/nav'; // issue-16
import Iframe from 'react-iframe';

import getStatusName from '../helpers/getStatusName';
import getClientList from '../helpers/getClientList';
import getClientNameById from '../helpers/getClientNameById';
import fetchApi from '../helpers/fetchApi';

// import { Grid, Row, Col, Alert, FormGroup, FormControl, Form, Button, Table, DropdownButton, InputGroup, MenuItem } from 'react-bootstrap';
import {
  Container, Row, Col, Card, CardBlock, CardTitle, CardSubtitle, CardText, CardLink, Button, Table,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import ApplicationLoaderComponent from '../components/loader-component';

import axios from 'axios';

// TODO Wrap this in a HOC
// import styleBootstrap from 'bootstrap/dist/css/bootstrap.css';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '100%',
  },
};

export default class extends Component {

  constructor(props) {
    super(props);

    console.log ('calling constructor');
    const { status = 0, client = 0 } = props;
    // const client = 0;

    this.state = {
      height: 800,
      openStatus: false,
      openClient: false,
      status,
      client,
      showLoader: true
    }

    this.showLoader = this.showLoader.bind (this);
  }
  /**
   * hit on Link route hit
   * @param {} param 
   */
  static async getInitialProps({ req, query }) {

    console.log('fetching for id : ' + query.projectId)
    const response = await axios.get('http://localhost:3000/fetchProjectDetails/' + query.projectId);

    // console.log(response);
    return {
      session: true,
      studyUID: query.projectId,
      ...response.data
    };
  };


  componentDidMount() {
    const { container } = this;

    this.resize();
    window.addEventListener('resize', this.resize);
    this.setState({ ...this.state, showLoader: false });
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

  iframeData = (url) => {
    axios.get(url)
      .then(function (response) {
        if (response.data) {
          //return url;
        }
      })
      .catch(function (error) {
        if (error.response) {

          if (error.response.status === 403) {
            return window.location = '/';
          }
        }
      });
  }

  showLoader () {
    this.setState ({...this.state, showLoader: true});
  }

  render() {

    // console.log(this.props);

    const {
      props: {
        projectDetail: {
          studyUID,
      studyName,
      patientName,
      studyDate,
      modality,
      location
        },
      session
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
      <section>
        {/*<style dangerouslySetInnerHTML={{ __html: styleBootstrap }} />*/}
        <Nav session={session} transitionCallback = {this.showLoader}/>
        <br /><br /><br />

        <ApplicationLoaderComponent show={this.state.showLoader} />

        <section className='container-fluid'>
          <Row>
            <Col md="4">
              <Card>
                <CardBlock>
                  <CardTitle>
                    Project Detail&nbsp;
                    <Button size="small">
                      <span className="fa fa-video-camera" aria-hidden="true"></span>
                      &nbsp;Preview Video
                    </Button>
                  </CardTitle>
                  <CardSubtitle></CardSubtitle>
                  {/*<CardText>*/}
                    <Table striped responsive>
                      <tbody>
                        <tr>
                          <td>
                            <b>Status</b>
                          </td>
                          <td>
                            <ButtonDropdown
                              isOpen={ openStatus }
                              toggle={() => {
                                this.setState({
                                  openStatus: !this.state.openStatus
                                });
                              }}>
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
                          <td>
                            <b>Study Name</b>
                          </td>
                          <td>
                            { studyName }
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Study Date</b>
                          </td>
                          <td>
                            { studyDate }
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Modality</b>
                          </td>
                          <td>{ modality }</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Location</b>
                          </td>
                          <td>{location}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Client</b>
                          </td>
                          <td>
                            <ButtonDropdown
                              isOpen={openClient}
                              toggle={() => {
                                this.setState({
                                  openClient: !this.state.openClient
                                });
                              }}>
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
                        <tr rowSpan={5}></tr>
                      </tbody>
                    </Table>
                  {/*</CardText>*/}
                </CardBlock>
              </Card>
            </Col>

            <Col md="8">
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
            </Col>
          </Row>
        </section>
        {/* <Grid bsClass='container-fluid' >
          <Row>
            <Col md={4}>
              <section className='panel panel-default'>
                <section className='panel-heading'>
                  <h3 className='panel-title'>
                    Project Details&nbsp;
                      <Button>
                      <span className="glyphicon glyphicon-facetime-video" aria-hidden="true"></span>
                      &nbsp;Preview Video
                      </Button>
                  </h3>
                </section>
                <section className='panel-body'>
                  <Table responsive striped>
                    <tbody>
                      <tr>
                        <td>
                          <b>Status</b>
                        </td>
                        <td>
                          <DropdownButton
                            componentClass={InputGroup.Button}
                            title={getStatusName(status)}>
                            <MenuItem onClick={() => this.setStatus(0)}>{getStatusName(0)}</MenuItem>
                            <MenuItem onClick={() => this.setStatus(1)}>{getStatusName(1)}</MenuItem>
                            <MenuItem onClick={() => this.setStatus(2)}>{getStatusName(2)}</MenuItem>
                            <MenuItem onClick={() => this.setStatus(3)}>{getStatusName(3)}</MenuItem>
                            <MenuItem onClick={() => this.setStatus(4)}>{getStatusName(4)}</MenuItem>
                          </DropdownButton>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Study Name</b>
                        </td>
                        <td>
                          {studyName}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Study Date</b>
                        </td>
                        <td>
                          {studyDate}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Modality</b>
                        </td>
                        <td>{modality}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Location</b>
                        </td>
                        <td>{location}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Client</b>
                        </td>
                        <td>
                          <DropdownButton
                            open={openClient}
                            componentClass={InputGroup.Button}
                            onToggle={() => {
                              this.setState({
                                openClient: !this.state.openClient
                              });
                            }}
                            title={getClientNameById(client) || 'None'}>
                            <MenuItem onClick={() => this.setClient(0)}>None</MenuItem>
                            {clients.map(({ id, name }) => (
                              <MenuItem
                                key={`${name}-${id}`} onClick={() =>
                                  this.setClient(id)}
                              >{name}</MenuItem>
                            ))}
                          </DropdownButton>
                        </td>
                      </tr>
                      <tr rowSpan={5}></tr>
                    </tbody>
                  </Table>
                </section>
                <section className='panel-footer'>
                  <a href='#'>Snapshots</a>&nbsp;
                  <a href='#'>Backup / Restore</a>
                </section>
              </section>
            </Col>

            <Col md={8}>
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
            </Col>
          </Row>
        </Grid> */}
      </section >
    );
  }
}