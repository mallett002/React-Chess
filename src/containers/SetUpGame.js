import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUserInfo } from '../actions/actions';
import PlayerSetup from '../components/PlayerSetup';

class SetUpGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            player1: { userName: "", color: "" },
            player2: { userName: "", color: "" }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.userNameOne = this.userNameOne.bind(this);
        this.userNameTwo = this.userNameTwo.bind(this);
        this.handleColor = this.handleColor.bind(this);
    }

    userNameOne(e) {
        if (e.target.name === "username" && e.target.id === "player1") {
            // Put entered data in the component state
            this.setState({
                player1: { userName: e.target.value, color: this.state.player1.color }
            });
        }
    }

    userNameTwo(e) {
        if (e.target.name === "username" && e.target.id === "player2")
            // Put entered data in the component state
            this.setState({
                player2: { userName: e.target.value, color: this.state.player2.color }
            });
    }

    handleColor(e) {
        const { player1, player2 } = this.state;
        console.log("e.target.value", e.target.value);
        // Set player one's color to selected value

        // Make player2's color opposite of p1
        if (e.target.value === "white") {
            console.log("updating p2 to black");
            this.setState({
                player1: { userName: player1.userName, color: e.target.value },
                player2: { userName: player2.userName, color: "black" }
            });
        // otherwise it's black
        } else { 
            console.log("updating p2 to white");
            this.setState({
                player1: { userName: player1.userName, color: e.target.value },
                player2: { userName: player2.userName, color: "white" }
            });
        }
    }

    handleSubmit(e) {
        e.preventDefualt();
        // Dispatch an action with the info
        // addUserInfo(player1, player2)
        addUserInfo(this.state.player1, this.state.player2);
    }

    render() {
        const { player1, player2 } = this.props;
        console.log("State is:", this.state);

        return (
            <div>
                <h1>REACT CHESS</h1>
                <h3>GAME SETUP</h3>

                <form onSubmit={this.handleSubmit}>
                    <PlayerSetup user="Player One" id="player1"
                        updateUserName={this.userNameOne}
                        handleColor={this.handleColor}
                        color={player1.color}
                    />
                    <PlayerSetup
                        user="Player Two"
                        id="player2" updateUserName={this.userNameTwo}
                    />

                    <Link to="/game">
                        <button
                            type="submit"
                        >START GAME
                    </button>
                    </Link>

                </form>
            </div>
        )
    }
};

const mapStateToProps = state => ({
    player1: state.player1,
    player2: state.player2,
    board: state.board
});

export default connect(mapStateToProps, { addUserInfo })(SetUpGame);