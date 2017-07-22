'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { Provider } from 'react-redux';

import App from './App';
import appReducers from './reducers';

const store = createStore(appReducers, applyMiddleware(promiseMiddleware()));

window.appConfig = Object.freeze({
    serverDomain: process.env.APP_DOMAIN
});

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('app')
);
