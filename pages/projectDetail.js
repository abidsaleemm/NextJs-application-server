import React, { Component } from 'react';
import Iframe from 'react-iframe';

// TODO Move these to different Area?
import getStatusName from '../helpers/getStatusName';
import getClientList from '../helpers/getClientList';
import getClientNameById from '../helpers/getClientNameById';

import {
  Container, Row, Col, Card, CardBlock, CardTitle, CardSubtitle, CardText, CardLink, Button, Table,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { initStore } from '..//store';
import * as actions from '../actions';
import Wrapper from '../hoc/wrapper';

// TODO Move this to an action?
import fetchApi from '../helpers/fetchApi';

const ProjectDetails = class extends Component {
  static async getInitialProps({ store, isServer, query: { projectDetail = {}, studyUID = '' } }) {
    const { 
      fetchAction,
      payloadProjectDetail 
    } = actions;

    store.dispatch(fetchAction(true));
    store.dispatch(
      payloadProjectDetail(isServer ? 
        projectDetail : await fetchApi("projectDetail", { studyUID })));
    store.dispatch(fetchAction(false));

    return { isServer };
  }

  constructor(props) {
    super(props);
    this.state = {
      height: 800,
      openStatus: false,
      openClient: false,
    };
  }

  componentDidMount() {
    const { container } = this;
    this.resize();
    window.addEventListener("resize", this.resize);
  }

  resize = () => {
    const { container } = this;

    if (container) {
      const { offsetTop = 0, clientTop = 0 } = container;
      const height = window.innerHeight - (offsetTop + 8);
      this.setState({ height });
    }
  };

  render() {
    const {
      props: {
        // Actions
        setProjectStatus,
        setProjectClient,
        // State
        studyUID,
        studyName,
        patientName,
        studyDate,
        modality,
        location,
        status = 0, 
        client = 0,
      },
      state: { height, openStatus, openClient } = {},
      setStatus
    } = this;

    const clients = getClientList();

    return <div className="root" ref={input => {
          this.container = input;
        }}>
        <style jsx>
          {`.root {
              display: flex;
              justifyContent: space-between;
              flexDirection: row;
              height: 100%;
              width: 100%;
            }

            .projectDetailLeft {
              min-width: 400px;
            }

            .projectDetailRight {
              width: 100%;
            }`}
        </style>
        <div className="projectDetailLeft">
          <Card>
            <CardBlock>
              <CardTitle>Project Details</CardTitle>
              <CardSubtitle>
                {patientName}
              </CardSubtitle>
            </CardBlock>
            <br />
            <Button>Preview Video</Button>
            <br />
            <Table>
              <tbody>
                <tr>
                  <th scope="row">Status</th>
                  <td>
                    <ButtonDropdown isOpen={openStatus} toggle={() => {
                        this.setState({
                          openStatus: !this.state.openStatus
                        });
                      }}>
                      <DropdownToggle caret>
                        {getStatusName(status)}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => setProjectStatus({ studyUID , status: 0 })}>
                          {getStatusName(0)}
                        </DropdownItem>
                        <DropdownItem onClick={() => setProjectStatus({ studyUID , status: 1 })}>
                          {getStatusName(1)}
                        </DropdownItem>
                        <DropdownItem onClick={() => setProjectStatus({ studyUID , status: 2 })}>
                          {getStatusName(2)}
                        </DropdownItem>
                        <DropdownItem onClick={() => setProjectStatus({ studyUID , status: 3 })}>
                          {getStatusName(3)}
                        </DropdownItem>
                        <DropdownItem onClick={() => setProjectStatus({ studyUID , status: 4 })}>
                          {getStatusName(4)}
                        </DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Study Name</th>
                  <td>
                    {studyName}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Study Date</th>
                  <td>
                    {studyDate}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Modality</th>
                  <td>
                    {modality}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Location</th>
                  <td>
                    {location}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Client</th>
                  <td>
                    <ButtonDropdown isOpen={openClient} toggle={() => {
                        this.setState({
                          openClient: !this.state.openClient
                        });
                      }}>
                      <DropdownToggle caret>
                        {getClientNameById(client) || "None"}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => this.setClient(0)}>
                          None
                        </DropdownItem>
                        {clients.map(({ id, name }) =>
                          <DropdownItem
                            key={`${name}-${id}`}
                            onClick={() => setProjectClient({ studyUID , client: id })}
                          >
                            {name}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </ButtonDropdown>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>
        <div className="projectDetailRight">
          <Iframe 
            url={`/client/?p=${studyUID}`} 
            width="100%" 
            height={`${height}px`} 
            display="initial" 
            position="relative" 
            marginheight={0} 
            frameborder={0} 
            marginwidth={0} 
          />
        </div>
      </div>;
  }
};

const mapStateToProps = ({ projectDetail }) => ({ ...projectDetail });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  Wrapper(ProjectDetails));