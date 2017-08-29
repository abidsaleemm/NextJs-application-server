import {
	PAYLOAD_PROJECTS,
	PROJECTS_SET_FILTER,
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
	}
};

export default (state = initialState, { type, projects = [], filter = {} }) => {
	switch (type) {
		case PAYLOAD_PROJECTS: return { ...state, projects };
		case PROJECTS_SET_FILTER:
			return {
				...state,
				filter: {
					...state.filter,
					...filter,
				}
			};
		default: return state;
	}
}