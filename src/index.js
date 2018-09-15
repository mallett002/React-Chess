import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import Root from './containers/Root';
import store from './store/configureStore';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

render(
    <Provider store={store}>
        <Router>
            <Root store={store} />
        </Router>
    </Provider>,
    document.getElementById("index")
);
