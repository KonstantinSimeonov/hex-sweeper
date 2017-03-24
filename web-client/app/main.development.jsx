'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

window.appConfig = Object.freeze({
    serverDomain: 'http://localhost:6969'
});

ReactDOM.render(<App />, document.getElementById('app'));
