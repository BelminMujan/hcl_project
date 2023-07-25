import { combineReducers, legacy_createStore as createStore } from 'redux';
import userReducer from './Reducers/userReducer';

const reducers = combineReducers({
    user: userReducer
})

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
