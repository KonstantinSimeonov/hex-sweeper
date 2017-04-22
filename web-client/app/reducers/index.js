import { Router, Route, location } from 'react-router-dom';
import { combineReducers } from 'redux';

export const appConfigReducer = () => ({ serverDomain: 'http://localhost:6969' });

const initialUsersState = {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token')
};

export const usersReducer = (state = initialUsersState, action) => {
    switch (action.type) {
        case 'SET_LOGIN_USERNAME':
            return Object.assign({}, state, { loginUsername: action.username });
        case 'LOGIN_PENDING':
            return Object.assign({}, state, { loginLoading: true });
        case 'LOGOUT_USER':
            return Object.assign({}, state, { username: undefined, token: undefined });
        case 'REGISTER_USER_FULFILLED':
            return Object.assign({}, state, { registrationSuccessful: true });
        case 'LOGIN_FULFILLED':
            return Object.assign({}, state, { token: action.payload.token, username: state.loginUsername, loginLoading: false });
        case 'LOGIN_REJECTED':
            // do smth, smartass
            return state;
        case 'STORE_CREDENTIALS':
            localStorage.setItem('username', state.users.username);
            localStorage.setItem('token', action.users.token);
        default:
            return state;
    }
}

export const rankingsReducer = (state = { rankings: [] }, action) => {
    switch (action.type) {
        case 'FETCH_RANKINGS':
        case 'FETCH_RANKINGS_PENDING':
            return Object.assign({}, state, { fetchingRankings: true });
        case 'FETCH_RANKINGS_FULFILLED':
            return Object.assign({}, state, { rankings: action.payload, fetchingRankings: false });
        default:
            return state;
    }
}

export const gamesReducer = (state = { spectatableGames: [] }, action) => {
    switch (action.type) {
        case 'FETCH_SPECTATABLE_GAMES_PENDING':
            return Object.assign({}, state, { isLoading: true });
        case 'FETCH_SPECTATABLE_GAMES_FULFILLED':
            return Object.assign({}, state, { spectatableGames: action.payload, isLoading: false });
        case 'FETCH_SPECTATABLE_GAMES_REJECTED':
            alert('failz');
        default:
            return state;
    }
}

export default combineReducers({
    users: usersReducer,
    rankings: rankingsReducer,
    games: gamesReducer,
    appConfig: appConfigReducer
})
