import React, { Component, PropTypes } from "react";
import io from "socket.io-client";
import { Table, Column, Cell } from "fixed-data-table";
import Router from 'next/router';

import styleSheet from "styles/fixed-data-table.css";
import styleList from 'styles/projectList.scss';

export default class extends Component {
  static getInitialProps = ({ req }) => ({ 
    projects: [],
  });

  constructor(props) {
    super(props);
    // TODO server/socket should be passed down
    this.socket = io("http://localhost:3000"); // TODO setup for dev and prod and include
    this.state = { ...props };
  }

  componentDidMount() {
    const { socket } = this;

    // Handle State changes here
    socket.emit("queryStudies", {});
    socket.on("queryStudies", studies => this.setState({ projects: studies }));
    window.addEventListener('resize', () => {
      this.setState({ 
        width: parseInt(window.innerWidth),
        height: parseInt(window.innerHeight),
      });
    })

    // Add event listeners for resize
    // Set initial window size
    this.setState({ 
        width: parseInt(window.innerWidth),
        height: parseInt(window.innerHeight),
      });
  }

  render() {
    const { state: { 
      projects = [],
      width = 500,
      height = 100,
    } } = this;

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
        <style dangerouslySetInnerHTML={{ __html: styleList }} />
        <Table
          onRowClick={(event, index) => {
            const { [index]: { studyUID = 'NA' } = {} } = projects;
            console.log('onRowClick', studyUID)
            Router.push('/projectDetail')
          }}
          rowHeight={50}
          rowsCount={projects.length}
          width={width}
          height={height}
          headerHeight={50}
        >
          <Column
            header={<Cell>Patient Name</Cell>}
            cell={({ rowIndex, ...props }) =>
              <Cell {...props}>
                {projects[rowIndex].patientName}
              </Cell>}
            width={200}
          />
          <Column
            header={<Cell>Study Name</Cell>}
            cell={({ rowIndex, ...props }) =>
              <Cell {...props}>
                {projects[rowIndex].studyName}
              </Cell>}
            flexGrow={2}
            width={200}
          />
          <Column
            header={<Cell>Study Date</Cell>}
            cell={({ rowIndex, ...props }) =>
              <Cell {...props}>
                {projects[rowIndex].studyDate}
              </Cell>}
            flexGrow={2}
            width={200}
          />
          <Column
            header={<Cell>Modality</Cell>}
            cell={({ rowIndex, ...props }) =>
              <Cell {...props}>
                {projects[rowIndex].modality}
              </Cell>}
            flexGrow={2}
            width={200}
          />
          <Column
            header={<Cell>Status</Cell>}
            cell={({ rowIndex, ...props }) =>
              <Cell {...props}>
                {projects[rowIndex].status}
              </Cell>}
            flexGrow={2}
            width={200}
          />
        </Table>

      </div>
    );
  }
}

/*
<style dangerouslySetInnerHTML={{ __html: styleSheet }} />
        <ReactTable
          data={projects}
          columns={columns}
          defaultPageSize={20}
          getTrProps={(state, { row: { studyUID = '' } = {} } = {}, column, instance) => {
            return {
              onClick: e => {
                console.log('Study selected!', studyUID)
              }
            }
          }}
        />

        */
