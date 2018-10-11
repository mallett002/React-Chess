import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Components:
import Board from '../components/Board';
import FallenSoldiers from '../components/FallenSoldiers';
import InCheckDisplay from '../components/InCheckDisplay';
// Constants:
import { isInCheck, makeCoords } from '../constants/constants';

// Renders the board, the fallen soldiers lists, and a link back to exit the game
class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOne: {
                castleRight: false,
                castleLeft: false
            },
            playerTwo: {
                castleRight: false,
                castleLeft: false
            }
        };

        this.canCastle = this.canCastle.bind(this);
    }

    componentDidUpdate() {
        console.log("player1castle:", this.state.playerOne);
    }


    // Look at board and see if given player can castle
    canCastle(selectedPiece, selectedIndex) {
        const { player1, player2, board } = this.props;
        let piecesRight = [];
        let piecesLeft = [];
        let indicesRight = [];
        let indicesLeft = [];
        let inDangerRight = false;
        let inDangerLeft = false;
        // No if in check, king passes through danger, pieces in the way, or king has moved

        // First, if king has moved, or is in check, turn to false
        if (selectedPiece.team === "player1") {
            if (player1.rookOrKingMoved.includes(selectedPiece.id)
                || player1.inCheck) {
                this.setState({
                    playerOne: {
                        castleRight: false,
                        castleLeft: false
                    },
                });
            }
        } else {
            if (player2.rookOrKingMoved.includes(selectedPiece.id)
                || player2.inCheck) {
                this.setState({
                    playerTwo: {
                        castleRight: false,
                        castleLeft: false
                    },
                });
            }
        }

        // If not in check, and king hasn't moved, check the indices right and left
        if (selectedPiece.team === "player1") {
            if (!player1.rookOrKingMoved.includes(selectedPiece.id) && !player1.inCheck) {
                let selectedCoords = makeCoords(selectedIndex);
                // Look at indices in same row as the selected king
                board.layout.forEach((item, i) => {
                    let indexCoords = makeCoords(i);
                    if (selectedCoords[1] === indexCoords[1]) {
                        // look right
                        if (selectedCoords[0] < indexCoords[0]) {
                            // build up indicesRight to check if any, except for rook, are in danger
                            indicesRight.push(i);
                            // if a piece, put it in piecesRight
                            if (board.layout[i].name !== "empty") piecesRight.push(i);
                        // look left
                        } else if (selectedCoords[0] > indexCoords[0]) {
                            indicesLeft.push(i);
                            // if a piece, put it in indicesLeft
                            if (board.layout[i].name !== "empty") piecesLeft.push(i);
                        }
                    }
                });

                // Check if more than just 1 piece to the right, or if none. If so, can't castle right
                if (piecesRight.length > 1 || piecesRight.length === 0) {
                    this.setState({
                        playerOne: {
                            ...this.state.playerOne,
                            castleRight: false
                        }
                    });
                // check if only 1 has a piece and it's a rook and it hasn't moved
                } else if (piecesRight.length === 1 && board.layout[piecesRight[0]].name === "rook" 
                && !player1.rookOrKingMoved.includes(board.layout[piecesRight[0]].id)) {
                    // check if any of the indicesRight are in danger, except for the rook, if so can't castle
                    for (let i = 0; i < indicesRight.length - 1; i++) {
                        if (player2.dangerIndices.includes(indicesRight[i])) inDangerRight = true;
                    }
                    // if none are in danger, player1 can castle right
                    if (!inDangerRight) {
                        this.setState({
                            playerOne: {
                                ...this.state.playerOne,
                                castleRight: true
                            }
                        });
                    } else if (inDangerRight) {
                        this.setState({
                            playerOne: {
                                ...this.state.playerOne,
                                castleRight: false
                            }
                        });
                    }
                // for all other cases, set castleRight to false
                } else {
                    this.setState({
                        playerOne: {
                            ...this.state.playerOne,
                            castleRight: false
                        }
                    });
                }
            }
        }
        
        





    }


    render() {
        const { player1, player2, board } = this.props;
        // get the user in check, or false to pass to <InCheckDisplay />
        let userInCheck = isInCheck(player1, player2);

        return (
            <div className='game'>
                <h1 className='title'>REACT CHESS</h1>

                <div className='in-check-container'>
                    {userInCheck && <InCheckDisplay user={userInCheck} />}
                </div>

                <Board
                    player1={player1} player2={player2}
                    board={board} canCastle={this.canCastle}
                    playerOneCastle={this.state.playerOne} playerTwoCastle={this.state.playerTwo}
                />

                <div className='fallen-container'>
                    <FallenSoldiers user={player1} />
                    <FallenSoldiers user={player2} />
                </div>

                <Link exact='true' to='/'>Exit Game</Link>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    player1: state.player1,
    player2: state.player2,
    board: state.board
});

Game.propTypes = {
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Game);