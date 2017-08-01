import React from "react";
import { Table } from 'reactstrap';
import ReactTable from 'react-table';


import Nav from '../components/nav'; // TODO use HOC
import styleBootstrap from 'bootstrap/dist/css/bootstrap.css';
import reactTable from 'react-table/react-table.css'

export default class extends React.Component {

    constructor() {
        super();
        this.state = {
            columns: [

                {
                    Header: 'Status',
                    accessor: 'status'
                },
                {
                    Header: 'Patient Name',
                    accessor: 'patientName',

                },
                {
                    Header: 'Study Name',
                    accessor: 'studyName',

                },
                {
                    Header: 'Study Date',
                    accessor: 'studyDate',

                },
                {
                    Header: 'Modality',
                    accessor: 'modality',

                },
                {
                    Header: 'Activity',
                    accessor: 'activity',

                },
                {
                    Header: 'Location',
                    accessor: 'location',

                },
                {
                    Header: 'Client',
                    accessor: 'client',

                },
                {
                    Header: 'Action',
                    accessor: 'studyUID',
                    show: false
                }
            ]
        }

    }


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
                 
                        <style dangerouslySetInnerHTML={{ __html: reactTable }} />
                        <ReactTable data={projects} columns={this.state.columns} defaultPageSize={10} filterable={true}
                            getTdProps={(state, rowInfo, column, instance) => {
                                return {
                                    onClick: e => {
                                        console.log(rowInfo.row.studyUID);
                                        window.location = `/projectDetail/` + rowInfo.row.studyUID;
                                        {/*console.log('A Td Element was clicked!')
                                            console.log('it produced this event:', e)
                                            console.log('It was in this column:', column)
                                            console.log('It was in this row:', rowInfo )
                                            console.log('It was in this table instance:', instance)*/}
                                    }
                                }
                            }}
                        />
                    </div>
             
        );
    }
}


