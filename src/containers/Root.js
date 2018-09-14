import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import SetUpGame from '../components/SetUpGame';

class Root extends Component {
    render() {
        return (
            <Router>
                <Route path='/' component={SetUpGame} />
            </Router>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root;