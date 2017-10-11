import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import { initStore } from '../store';
import * as actions from '../actions';
import Wrapper from '../hoc/wrapper';
import TableList from '../components/tableList';

// TODO Move this to a action?
import fetchApi from '../helpers/fetchApi';

// TODO This constant should be handled in redux
export const headers = [
	{
		title: 'Status',
		id: 'status'
	},
	{
		title: 'Patient Name',
		id: 'patientName',

	},
	{
		title: 'Study Name',
		id: 'studyName',

	},
	{
		title: 'Study Date',
		id: 'studyDate',

	},
	{
		title: 'Modality',
		id: 'modality',

	},
	{
		title: 'Location',
		id: 'location',

	},
	{
		title: 'Client',
		id: 'client',

	},
];

class ProjectsListing extends Component {
	static async getInitialProps({ 
		req = {}, 
		store, 
		isServer, 
		query: { projects = [] } = {},
	}) {
		const { 
			payloadProjects,
			fetchAction,
		} = actions;
		
		store.dispatch(fetchAction(true));
		store.dispatch(payloadProjects(isServer ? projects : await fetchApi('projects')));
		store.dispatch(fetchAction(false));

		return { isServer };
	}

	render() {
		const { 
			props: { 
				projects = [], 
				filter = {}, 
				sort = {},
				setProjectsFilter = () => {},
				setProjectsSort = () => {},
			} = {}, 
		} = this;

		return (
			<div className="projects">
				<style jsx>
				{`
					.projects {
						display: flex;
						flex-direction: column;
						width: 100%;
						height: 100%;
						overflow: auto;
					}
				`}
				</style>
				<TableList
					headers={headers}
					data={projects}
					filter={filter}
					sort={sort}
					onRowClick={({ studyUID }) => {
						Router.push({
						pathname: '/projectDetail',
						query: { studyUID }
					})}}
					onFilter={props => setProjectsFilter(props)}
					onSort={props => setProjectsSort(props)}
				/>
			</div>
		)
	}
}

const mapStateToProps = ({ projects }) => ({ ...projects });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
	Wrapper(ProjectsListing));