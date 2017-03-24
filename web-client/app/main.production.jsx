'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';

window.appConfig = Object.create({ serverDomain: 'https://hexsweepr.herokuapp.com' });
ReactDOM.render(<App />, document.getElementById('app'));
