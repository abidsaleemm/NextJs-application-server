import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux'
import Router from 'next/router';
import { initStore } from '../store';
import * as actions from '../actions';
import Wrapper from '../hoc/wrapper';
import TableList from '../components/tableList';
import { PROJECTS_TABLE_COLUMNS } from '../constants/constants';

// TODO Move this to a action
import fetchApi from '../helpers/fetchApi';

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
		const { props: { projects = [] } = {}, props } = this;
		return (
			<div>
				<TableList
					headers={PROJECTS_TABLE_COLUMNS}
					data={projects}
					onRowClick={({ studyUID }) => {
						Router.push({
						pathname: '/projectDetail',
						query: { studyUID }
					})}}
				/>
			</div>
		)
	}
}

const mapStateToProps = ({ projects }) => ({ ...projects });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(
	Wrapper(ProjectsListing));