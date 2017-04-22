'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { Provider } from 'react-redux';

import App from './App.jsx';
import appReducers from './reducers';

const store = createStore(appReducers, applyMiddleware(promiseMiddleware()));

window.appConfig = Object.freeze({
    serverDomain: 'http://localhost:6969'
});

const BootstrappedApp = <Provider store={store}><App /></Provider>;

ReactDOM.render(BootstrappedApp, document.getElementById('app'));
