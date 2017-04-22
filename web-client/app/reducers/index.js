import { Router, Route, location } from 'react-router-dom';
import { combineReducers } from 'redux';

export const usersReducer = (state = {}, action) => {
    switch(action.type) {
        case 'LOGIN_PENDING':
        console.log('u piece oshit');
            return Object.assign({}, state, { loginLoading: true, loginUsername: 'achko-hrachko' });
        case 'LOGOUT_USER':
            return Object.assign({}, state, { username: undefined, token: undefined });
        case 'REGISTER_USER_FULFILLED':
            return Object.assign({}, state, { registrationSuccessful: true });
        case 'LOGIN_FULFILLED':
            console.log(action);
            return Object.assign({}, state, { token: action.payload.token, username: state.loginUsername, loginLoading: false });
        case 'LOGIN_REJECTED':
            console.log('FAIL WE', action);
            return state;
        default:
            return state;
    }
}

export const rankingsReducer = (state = { rankings: [] }, action) => {
    switch(action.type) {
        case 'FETCH_RANKINGS':
        case 'FETCH_RANKINGS_PENDING':
            return Object.assign({}, state, { fetchingRankings: true });
        case 'FETCH_RANKINGS_FULFILLED':
            return Object.assign({}, state, { rankings: action.payload, fetchingRankings: false });
        default:
            return state;
    }
}

export default combineReducers({
    users: usersReducer,
    rankings: rankingsReducer
})
