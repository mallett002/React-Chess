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
                canCastleRight: false,
                canCastleLeft: false
            },
            playerTwo: {
                canCastleRight: false,
                canCastleLeft: false
            },
            castleIndicesInDangerRight: false,
            castleIndicesInDangerLeft: false,
        };

        this.canCastle = this.canCastle.bind(this);
    }

    componentDidUpdate() {
        const { board, player1, player2 } = this.props;
        // If king is in check, put canCastle to false
        if (board.selected !== null) {
            if (board.selected.piece.team === "player1" && player1.inCheck) {
                if (this.state.playerOne.canCastleRight) {
                    this.setState({ 
                        playerOne: {
                            ...this.state.playerOne,
                            canCastleRight: false
                        }});
                } 
                if (this.state.playerOne.canCastleLeft) {
                    this.setState({ 
                        playerOne: {
                            ...this.state.playerOne,
                            canCastleLeft: false
                        }});
                }
                
            } else if (board.selected.piece.team === "player2" && player2.inCheck) {
                if (this.state.playerTwo.canCastleRight) {
                    this.setState({
                        playerTwo: {
                            ...this.state.playerTwo,
                            canCastleRight: false
                        }});
                }
                if (this.state.playerTwo.canCastleLeft) {
                    this.setState({ 
                        playerTwo: {
                            ...this.state.playerTwo,
                            canCastleLeft: false
                        }});
                }
            }

        }
        
        console.log("playerOneCanCastle:", this.state.playerOne);
        console.log("playerTwoCanCastle:", this.state.playerTwo);
    }

    // Look at board and see if given player can castle
    canCastle() {
        // if castleIndicesInDanger is true, set it back to false before determining that it is possible
        if (this.state.castleIndicesInDangerRight) {
            this.setState({
                castleIndicesInDangerRight: false
            });
        }

        if (this.state.castleIndicesInDangerLeft) {
            this.setState({
                castleIndicesInDangerLeft: false
            });
        }

        let indicesRight = [];
        let indicesLeft = [];
        let piecesLeft = [];
        let piecesRight = [];
        // Using a timeout here so it has time to update the state.selectedPiece
        setTimeout(() => {
            const { board, player1, player2 } = this.props;
            if (board.selected !== null && board.selected.piece.name === "king") {
                let selectedPiece = board.selected;

                // look at the board
                board.layout.forEach((item, i) => {
                    let selectedCoords = makeCoords(selectedPiece.index);
                    let searchCoords = makeCoords(i);
                    // only the same row as the king 
                    if (searchCoords[1] === selectedCoords[1]) {
                        // look right
                        if (i > selectedPiece.index) indicesRight.push(i);
                        if (i > selectedPiece.index && board.layout[i].name !== "empty") {
                            piecesRight.push(i);
                        }
                        // look left
                        if (i < selectedPiece.index) indicesLeft.push(i);
                        if (i < selectedPiece.index && board.layout[i].name !== "empty") {
                            piecesLeft.push(i);
                        }
                    }
                });
            }

            // Check if any indices right are in danger
            // If only one in piecesRight, and it's a rook and it hasn't moved
            if (piecesRight.length === 1 && board.layout[piecesRight[0]].name === "rook") {
                // look at all indicesRight except the last one with the rook
                for (let i = 0; i < indicesRight.length - 1; i++) {
                    // Make sure the indices aren't in danger (except for the rook)
                    if (board.selected.piece.team === "player1") {
                        // If any indicesRight are in danger, put castleIndicesInDangerRight: true
                        if (player2.dangerIndices.includes(indicesRight[i])) {
                            this.setState({
                                castleIndicesInDangerRight: true
                            });
                        }

                        // If castleIndicesInDangerRight is false and the rook or king hasn't moved, able to castle
                        if (!this.state.castleIndicesInDangerRight && !player1.rookOrKingMoved.includes(board.layout[piecesRight[0]].id)
                            && !player1.rookOrKingMoved.includes(board.selected.piece.id)) {
                            this.setState({
                                playerOne: { 
                                    ...this.state.playerOne,
                                    canCastleRight: true 
                                }
                            });
                            // If any in danger or have moved the rook, set it to false
                        } else if (this.state.castleIndicesInDangerRight || player1.rookOrKingMoved.includes(board.layout[piecesRight[0]].id)
                            || player1.rookOrKingMoved.includes(board.selected.piece.id)) {
                            this.setState({
                                playerOne: { 
                                    ...this.state.playerOne,
                                    canCastleRight: false 
                                }
                            });
                        }
                        // PLAYER 2---------------------------------------------    
                    } else if (board.selected.piece.team === "player2") {
                        if (player1.dangerIndices.includes(indicesRight[i])) {
                            this.setState({
                                castleIndicesInDangerRight: true
                            });
                        }

                        // If castleIndicesInDangerRight is false and the rook or king haven't moved, able to castle
                        if (!this.state.castleIndicesInDangerRight && !player2.rookOrKingMoved.includes(board.layout[piecesRight[0]].id)
                            && !player2.rookOrKingMoved.includes(board.selected.piece.id)) {
                            this.setState({
                                playerTwo: { 
                                    ...this.state.playerTwo,
                                    canCastleRight: true 
                                }
                            });
                            // If any in danger or moved the rook or the king, set it to false
                        } else if (this.state.castleIndicesInDangerRight || player2.rookOrKingMoved.includes(board.layout[piecesRight[0]].id)
                            || player2.rookOrKingMoved.includes(board.selected.piece.id)) {
                            this.setState({
                                playerTwo: { 
                                    ...this.state.playerTwo,
                                    canCastleRight: false 
                                }
                            });
                        }
                    }
                }
            } else if (piecesRight.length === 1 && board.layout[piecesRight[0]].name !== "rook" 
                || piecesRight.length > 1 || piecesRight.length === 0) {
                if (board.selected.piece.team === "player1") {
                    this.setState({
                        playerOne: { 
                            ...this.state.playerOne,
                            canCastleRight: false 
                        }
                    });
                } else if (board.selected.piece.team === "player2") {
                    this.setState({
                        playerTwo: { 
                            ...this.state.playerTwo,
                            canCastleRight: false 
                        }
                    });
                }
            }

            // Check if any indices left are in danger
            // If only one in piecesLeft and it's a rook
            if (piecesLeft.length === 1 && board.layout[piecesLeft[0]].name === "rook") {
                // loop backwards bc we don't need to look at the first one, the rook
                for (let i = indicesLeft.length - 1; i > 0; i--) {
                    // Make sure the indices aren't in danger 
                    if (board.selected.piece.team === "player1") {
                        // If any indicesLeft are in danger, put castleIndicesInDangerLeft: true
                        if (player2.dangerIndices.includes(indicesLeft[i])) {
                            this.setState({
                                castleIndicesInDangerLeft: true
                            });
                        }

                        // If castleIndicesInDangerLeft is false and haven't moved rook or king, able to castle
                        if (!this.state.castleIndicesInDangerLeft  && !player1.rookOrKingMoved.includes(board.layout[piecesLeft[0]].id)
                            && !player1.rookOrKingMoved.includes(board.selected.piece.id)) {
                            this.setState({
                                playerOne: { 
                                    ...this.state.playerOne,
                                    canCastleLeft: true 
                                }
                            });
                            // If any in danger, set it to false
                        } else if (this.state.castleIndicesInDangerLeft || player1.rookOrKingMoved.includes(board.layout[piecesLeft[0]].id)
                            || player1.rookOrKingMoved.includes(board.selected.piece.id)) {
                            this.setState({
                                playerOne: { 
                                    ...this.state.playerOne,
                                    canCastleLeft: false 
                                }
                            });
                        }
                    // PLAYER 2 -----------------------------------------
                    } else if (board.selected.piece.team === "player2") {
                        // If any indicesLeft are in danger, put castleIndicesInDangerLeft: true
                        if (player1.dangerIndices.includes(indicesLeft[i])) {
                            this.setState({
                                castleIndicesInDangerLeft: true
                            });
                        }

                        // If castleIndicesInDangerLeft is false, able to castle
                        if (!this.state.castleIndicesInDangerLeft && !player2.rookOrKingMoved.includes(board.layout[piecesLeft[0]].id)
                            && !player2.rookOrKingMoved.includes(board.selected.piece.id)) {
                            this.setState({
                                playerTwo: { 
                                    ...this.state.playerTwo,
                                    canCastleLeft: true 
                                }
                            });
                            // If any in danger, set it to false
                        } else if (this.state.castleIndicesInDangerLeft || player2.rookOrKingMoved.includes(board.layout[piecesLeft[0]].id)
                            || player2.rookOrKingMoved.includes(board.selected.piece.id)) {
                            this.setState({
                                playerTwo: { 
                                    ...this.state.playerTwo,
                                    canCastleLeft: false 
                                }
                            });
                        }
                    }
                }
            } else if (piecesLeft.length === 1 && board.layout[piecesLeft[0]].name !== "rook" || 
                piecesLeft.length > 1 || piecesLeft.length === 0) {
                if (board.selected.piece.team === "player1") {
                    this.setState({
                        playerOne: { 
                            ...this.state.playerOne,
                            canCastleLeft: false 
                        }
                    });
                } else if (board.selected.piece.team === "player2") {
                    this.setState({
                        playerTwo: { 
                            ...this.state.playerTwo,
                            canCastleLeft: false 
                        }
                    });
                }
            }

        }, 1);


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

                <Board player1={player1} player2={player2} board={board} canCastle={this.canCastle} />

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