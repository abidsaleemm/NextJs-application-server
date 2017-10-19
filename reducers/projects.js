import {
	PAYLOAD_PROJECTS,
} from '../constants/actionTypes';

export const initialState = {
	projects: [],
};

export default (state = initialState, { type, projects = [] }) => {
	switch (type) {
		case PAYLOAD_PROJECTS: return { ...state, projects };
		default: return state;
	}
}