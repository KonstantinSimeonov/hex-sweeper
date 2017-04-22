import { post as httpPost, get as httpGet } from '../utils/json-requester';

const delayedResolve = delay => new Promise(resolve => setTimeout(resolve, delay));

export const redirect = url => ({ type: 'REDIRECT', url });

export const logoutUser = () => ({ type: 'LOGOUT_USER' });

export const setLoginUsername = username => ({ type: 'SET_LOGIN_USERNAME', username });

export const storeCredentials = () => ({ type: 'STORE_CREDENTIALS' });

export const fetchSpectatableGames = () => ({
    type: 'FETCH_SPECTATABLE_GAMES',
    payload: httpGet('http://localhost:6969/api/spectatable')
});

export const registerUser = (username, password) => ({
    type: 'REGISTER_USER',
    payload: httpPost('http://localhost:6969/api/users', { user: { username, password } })
});

export const loginUser = (username, password) => ({
    type: 'LOGIN',
    payload: Promise.all([
        httpPost('http://localhost:6969/api/authenticate', { user: { username, password } }),
        delayedResolve(1000)
    ])
});

export const fetchRankings = (username = '') => ({
    type: 'FETCH_RANKINGS',
    payload: httpGet('http://localhost:6969/api/highscores/' + username)
});
