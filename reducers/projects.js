import {
	PAYLOAD_PROJECTS,
	PROJECTS_SET_FILTER,
	PROJECTS_SET_SORT,
} from '../constants/actionTypes';

export const initialState = {
	projects: [],
	filter: {
		status: "",
		patientName: "",
		studyName: "",
		modality: "",
		location: "",
		client: "",
	},
	sort: {
		id: 'status', // Set default soft id
		desc: false,
	}
};

export default (state = initialState, { type, projects = [], filter = {}, sort = {} }) => {
	switch (type) {
		case PAYLOAD_PROJECTS: return { ...state, projects };
		// issue-34 This is reusable cut this reducer up
		case PROJECTS_SET_FILTER:
			return {
				...state,
				filter: {
					...state.filter,
					...filter,
				}
			};
		// issue-34 This is reusable cut this reducer up
		case PROJECTS_SET_SORT: 
			return {
				...state,
				sort: {
					...state.sort,
					...sort,
					desc: state.sort.id === sort.id ? !state.sort.desc : state.sort.desc,
				}
			}
		default: return state;
	}
}