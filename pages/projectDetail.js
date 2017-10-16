import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBlock,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  Button,
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
} from 'reactstrap';
import Sidebar from '../components/Sidebar';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { initStore } from '..//store';
import * as actions from '../actions';
import Wrapper from '../hoc/wrapper';

// TODO Move these to different Area?
import getStatusName from '../helpers/getStatusName';

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

  render() {
    const {
      props: {
      // Actions
      setProjectStatus,
      setProjectClient,
      videoRender,
      // State
      studyUID,
      studyName,
      patientName,
      studyDate,
      modality,
      location,
      status = 0,
      client = 0,
      clientList = [],
      },
    } = this;

    const { name: selectedClient = "None" } =
      clientList.find(({ id }) => id === client) || {};

    // TODO Used for render video will be removed in the future
    const windowName = 'renderWindow';
    const width = 1920 / 2; // TODO Add a few different presets
    const height = 1080 / 2;
    const windowSettings = `width=${width},height=${height},resizable=false,toolbar=false,status=false`;

    return <div className="root" ref={input => {
      this.container = input;
    }}>
      <style jsx>
        {`
            .root {
              display: flex;
              flex-direction: row;
              height: 100%;
              width: 100%;
            }

            .projectDetailLeft {
              width: 100%;
              height: 100%;
            }

            .projectDetailRight {
              width: 100%;
              height: 100%;
              background: lightGray;
            }
          `}
      </style>
      <Sidebar width={400}>
        <div className="projectDetailLeft">
          <Card>
            <CardBlock>
              <CardTitle>Project Details</CardTitle>
              <CardSubtitle>
                {patientName}
              </CardSubtitle>
            </CardBlock>
            <br />
            <Button onClick={() => window.open(`/static/render/?p=${studyUID}`, windowName, windowSettings)}>Render Video</Button>
            <br />
            <Table>
              <tbody>
                <tr>
                  <th scope="row">Status</th>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle caret>
                        {getStatusName(status)}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => setProjectStatus({
                          studyUID,
                          status: 1
                        })}>
                          {getStatusName(1)}
                        </DropdownItem>
                        <DropdownItem onClick={() => setProjectStatus({
                          studyUID,
                          status: 2
                        })}>
                          {getStatusName(2)}
                        </DropdownItem>
                        <DropdownItem onClick={() => setProjectStatus({
                          studyUID,
                          status: 3
                        })}>
                          {getStatusName(3)}
                        </DropdownItem>
                        <DropdownItem onClick={() => setProjectStatus({
                          studyUID,
                          status: 4
                        })}>
                          {getStatusName(4)}
                        </DropdownItem>

                      </DropdownMenu>
                    </UncontrolledDropdown>
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
                    <UncontrolledDropdown>
                      <DropdownToggle caret>
                        {selectedClient}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() =>
                          setProjectClient({ studyUID, client: 0 })}>
                          None
                          </DropdownItem>
                        {clientList.map(({ id, name }) =>
                          <DropdownItem
                            key={`${name}-${id}`}
                            onClick={() =>
                              setProjectClient({ studyUID, client: id })}
                          >
                            {name}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
          <div>
            <div>Data functions</div>
            <div>
              <Button>Import</Button>
              <Button>Export</Button>
              <Button color="danger">Delete</Button>
            </div>
          </div>
          <div>
            <div><b>Defaults</b></div>
            <div>
              <Input />
              <Button>Create</Button>
              <Button>Create From File</Button>
            </div>
            <Table>
              No Defaults
            </Table>
          </div>

        </div>
      </Sidebar>
      <iframe
        className="projectDetailRight"
        src={`/static/interface/?p=${studyUID}`}
        title="iframe"
        width="100%"
        height="100%"
        style={{ margin: 0, border: 0, padding: 0 }}
      />
    </div>;
  }
};

const mapStateToProps = ({ projectDetail }) => ({ ...projectDetail });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
  Wrapper(ProjectDetails));