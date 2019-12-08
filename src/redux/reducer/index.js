import { combineReducers } from 'redux';
import countReducer from './countReducer'
import authReducer from './authReducer'

export default combineReducers({
    count : countReducer,
    user : authReducer
})