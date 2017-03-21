'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import io from '../node_modules/socket.io-client/dist/socket.io.js';

import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('app'));
