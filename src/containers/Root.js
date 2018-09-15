import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import SetUpGame from './SetUpGame';
import Game from './Game';

class Root extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={SetUpGame} />
                <Route path="/game" component={Game} />
            </Switch>
        )
    }
}

export default Root;