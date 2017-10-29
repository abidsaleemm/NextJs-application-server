import {createStore, combineReducers} from 'redux';
import {
    projectsSettings,
    portalSettings,
    projectDetailSettings
} from './reducers';

export default (init = undefined) => createStore(combineReducers({
    projectsSettings,
    portalSettings,
    projectDetailSettings
}), init);
