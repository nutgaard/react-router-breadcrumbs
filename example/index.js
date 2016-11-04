import { render } from 'react-dom';
import React from 'react';
import { Router, hashHistory } from 'react-router';
import routes from './routes.js';

render((
    <Router history={hashHistory}>{routes}</Router>
), document.getElementById('app'));
