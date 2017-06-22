import React, { Component, PropTypes } from "react";
import { Table, Column, Cell } from "fixed-data-table";

import styleSheet from "styles/fixed-data-table.css";
import styleList from 'styles/projectList.scss';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      height: 100,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        width: parseInt(window.innerWidth),
        height: parseInt(window.innerHeight),
      });
    })

    this.setState({
      width: parseInt(window.innerWidth),
      height: parseInt(window.innerHeight),
    });
  }

  componentWillUnmount() {
    // TODO unmount event listener
  }

  render() {
    const {
      state: { width = 500, height = 100 },
      props: { projects = [] },
    } = this;

    return (
      <div>
        <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
        <style dangerouslySetInnerHTML={{ __html: styleList }} />
        <Table
          onRowClick={(event, index) => {
            const { [index]: { studyUID = 'NA' } = {} } = projects;
            console.log('onRowClick', studyUID)
            
            window.location = `/project/${studyUID}`;
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
            header={<Cell>Location</Cell>}
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