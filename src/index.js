import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import {CurrentUserProvider} from "./contexts/currentUser";
import CurrentUserChecker from "./components/currentUserChecker";

ReactDOM.render(
    <CurrentUserProvider>
        <CurrentUserChecker>
            <Router>
                <App/>
            </Router>
        </CurrentUserChecker>
    </CurrentUserProvider>,
  document.getElementById('root')
);

