'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

window.appConfig = Object.create({ serverDomain: 'http://hexsweepr.herokuapp.com' });
console.log(window.appConfig);
ReactDOM.render(<App appConfig={config} />, document.getElementById('app'));
