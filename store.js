/**
 * the default store for the whole application
 * @author gaurav
 */
import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import applicationReducers from './reducers';

// the state structure for the whole application
// const initialState = {
// 	projects: {
// 		fetching: true,
// 		fetched: false,
// 		projects: [],
// 		error: null
// 	},
// 	projectDetails: {
// 		details: {},
// 		fetching: true,
// 		fetched: false,
// 		error: null,
// 		openStatus: false,
// 		openClient: false,
// 		status: 0,
// 		client: 0
// 	}
// }

// import { createStore, applyMiddleware, compose } from 'redux';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// + const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
// - const store = createStore(reducer, /* preloadedState, */ compose(
    // applyMiddleware(...middleware)
	// ));

const enhancer = compose(
	applyMiddleware(thunk, createLogger()),
)

// const middleware = applyMiddleware ( thunk, createLogger());

export const initStore = (initialState = {}) => {
	return createStore(
		applicationReducers,
		initialState, 
		enhancer);
}
