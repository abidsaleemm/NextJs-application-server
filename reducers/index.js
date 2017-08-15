import { combineReducers } from 'redux';
import projects from './projects';
import projectDetail from './projectDetail';
import portal from './portal';
import fetching from './fetching';

export default combineReducers ({
	projects,
	projectDetail,
	fetching,
	portal,
});