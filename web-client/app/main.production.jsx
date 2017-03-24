'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

window.appConfig = Object.create({ serverDomain: 'http://hexsweepr.herokuapp.com' });
ReactDOM.render(<App />, document.getElementById('app'));
