import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import { initStore } from '../store';
import * as actions from '../actions';
import Wrapper from '../hoc/wrapper';
import TableList from '../components/tableList';
import {
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

// TODO Move this to a action?
import fetchApi from '../helpers/fetchApi';

// TODO This constant should be handled in redux
export const headers = [
	{
		title: 'Action',
		id: 'action'
	},
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

/*

<Button onClick={() => 
						Router.push({
							pathname: '/projectDetail',
							query: { studyUID }
						})}
					>Create</Button>
*/

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
			setProjectsFilter = () => { },
			setProjectsSort = () => { },
			} = {},
		} = this;

		// TODO Should this be moved?
		const projectsEnhanced = projects.map(({ ...project, studyUID, status = '' }) =>
			({
				...project,
				action: status === '' ?
					// TODO Create as Button dropdown
					<UncontrolledDropdown>
						<DropdownToggle caret>
							Create
					</DropdownToggle>
						<DropdownMenu>
							<DropdownItem onClick={() =>
								Router.push({
									pathname: '/projectDetail',
									query: { studyUID }
								})}
							>
								Spine Lumbar
						</DropdownItem>
							<DropdownItem onClick={() =>
								Router.push({
									pathname: '/projectDetail',
									query: { studyUID }
								})}
							>
								Spine Cervical
					</DropdownItem>

						</DropdownMenu>
					</UncontrolledDropdown> :
					<Button onClick={() =>
						Router.push({
							pathname: '/projectDetail',
							query: { studyUID }
						})}
					>Edit</Button>,
			}));

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
					data={projectsEnhanced}
					filter={filter}
					sort={sort}
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