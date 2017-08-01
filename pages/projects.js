import React from "react";
import ReactTable from 'react-table';
import Link from 'next/link';
import Nav from '../components/nav';
import Router from 'next/router';
import reactTable from 'react-table/react-table.css';

import ApplicationLoaderComponent from '../components/loader-component';
// require ('es6-promise').polyfill
// require ('isomorphic-fetch');
import axios from 'axios';

export default class extends React.Component {

    constructor() {
        console.log ('constructing');
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
            ],
            showLoader: true
        }
    }

    // to be called once the page is rendered
    componentDidMount () {
        this.setState ({...this.state, showLoader: false});
    }

    static async getInitialProps({ req, query }) {
        // loading data
        const response =  await axios({
            method: 'get',
            url: 'http://localhost:3000/projectsListing',
        });

        return {
            session: true,
            ...response.data
        }
    }

    showLoader () {
        this.setState ({...this.state, showLoader: true});
    }


    render() {
        const { props: { projects } } = this;
        const { session } = this.props;

        // console.log (JSON.stringify(projects));

        return (
            <div>
                <style dangerouslySetInnerHTML={{ __html: reactTable }} />
                <Nav def='projects' session={session} navBarAction={this.showLoader}/>

                <br /><br/><br/>
                <style dangerouslySetInnerHTML={{ __html: reactTable }} />
                
                <ApplicationLoaderComponent show={this.state.showLoader}/>
                
                <ReactTable data={projects}
                    columns={this.state.columns}
                    defaultPageSize={20}
                    filterable={true}
                    className='-striped -highlight'
                    noDataText='No data found'
                    index=''
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: e => {
                                {/*alert (rowInfo.row.studyUID);*/}
                                this.showLoader();
                                Router.push ({
                                    pathname: '/projectDetail',
                                    query: { projectId: rowInfo.row.studyUID }
                                });

                                {/*window.location.assign ('/projectDetail?projectId='+ rowInfo.row.studyUID);*/}
                            }
                        }
                    }}
                />
            </div>)
                
    }


    // static async getInitialProps({ req, query }) {
    //     const { projects } = query;
    //     return { projects };
    // }
    // render() {
    //     const { props: { projects = [] } } = this;

    //     return (
    //         <div>
    //             <style dangerouslySetInnerHTML={{ __html: styleBootstrap }} />
    //             <Nav />
                 
    //                     <style dangerouslySetInnerHTML={{ __html: reactTable }} />
    //                     <ReactTable data={projects} columns={this.state.columns} defaultPageSize={10} filterable={true}
    //                         getTdProps={(state, rowInfo, column, instance) => {
    //                             return {
    //                                 onClick: e => {
    //                                     console.log(rowInfo.row.studyUID);
    //                                     window.location = `/projectDetail/` + rowInfo.row.studyUID;
    //                                     {/*console.log('A Td Element was clicked!')
    //                                         console.log('it produced this event:', e)
    //                                         console.log('It was in this column:', column)
    //                                         console.log('It was in this row:', rowInfo )
    //                                         console.log('It was in this table instance:', instance)*/}
    //                                 }
    //                             }
    //                         }}
    //                     />
    //                 </div>
    //     );
    // }
}


