import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Components:
import Board from '../components/Board';
import FallenSoldiers from '../components/FallenSoldiers';
import InCheckDisplay from '../components/InCheckDisplay';
import SelectPromotion from '../components/SelectPromotion';
import CheckMate from '../components/CheckMate';
// Constants:
import { isInCheck, makeCoords, getSource, getOutOfCheck } from '../constants/constants';
// Actions:
import { promotePawn } from '../actions/actions';

// Renders the board, the fallen soldiers lists, and a link back to exit the game
class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oneCastleRight: false,
            oneCastleLeft: false,
            twoCastleRight: false,
            twoCastleLeft: false,
            canPromotePawn: false,
            promoteAt: null,
            promotionUser: null,
            promotedPieces: 0,
            checkMated: null
        };

        this.canCastle = this.canCastle.bind(this);
        this.canPromotePawn = this.canPromotePawn.bind(this);
        this.promotePawn = this.promotePawn.bind(this);
    }
    /*
    after: move, castle, pawn promotion
    After team 1 moves, check if team 2 is in check
    If team 2 in check
        check if team 2 has any pieces that can take out of check
            if not, game over, team 1 wins
    If team 2 not in check
        check if team 2 has any pieces that can move anywhere
            if not, it's a stalemate
    */
    componentDidUpdate() {
        const { board, player1, player2 } = this.props;
        const playerTurn = board.turn === "player1" ? player1 : player2;
        let kingIndex;
        // after any piece moves, check for game over or stalemate
        if (board.selected === null) {
            // check team who's turn it is 
            // if in check, check if any pieces out of check
            if (playerTurn.inCheck) {
                // check if any pieces have moves out of check
                // get the king's index:
                board.layout.forEach((item, index) => {
                    if (item.name === "king" && item.team === board.turn) kingIndex = index;
                });
                // get piecesOutOfCheck
                let sourceOfCheck = getSource(board.layout, kingIndex, board.turn);
                // get the pieces to take out of check
                let piecesOutOfCheck = getOutOfCheck(board.layout, sourceOfCheck, kingIndex, board.turn);
                // if no pieces out of check and checkMated is currently null
                if (piecesOutOfCheck.length < 1 && this.state.checkMated === null) this.setState({ checkMated: playerTurn.userName });
                   
                // if not in check
            } else {
                // if no moves to make, stalemate
            }
        }
        
    }

    // After a move, check if a pawn has made it to end of the board
    // If so, have a modal pop up to select either a queen, rook, bishop or knight
    // Turn that pawn into the selected piece
    canPromotePawn() {
        const { board, player1, player2 } = this.props;
        let promotionIndex;
        let user;
        // look at each index of the board
        board.layout.forEach((item, index) => {
            let itemCoords = makeCoords(index);
            // Only indices in the top row
            if (itemCoords[1] === 0) {
                if (item.name === "pawn") {
                    promotionIndex = index;
                    user = item.team === "player1" ? player1 : player2
                }
                // Only indices in the bottom row
            } else if (itemCoords[1] === 7) {
                if (item.name === "pawn") {
                    promotionIndex = index;
                    user = item.team === "player1" ? player1 : player2
                }
            }
        });

        if (promotionIndex !== undefined) {
            this.setState({
                canPromotePawn: true,
                promoteAt: promotionIndex,
                promotionUser: user
            });
            // update the state's number of promoted pieces:
            this.setState((prevState) => ({
                promotedPieces: prevState.promotedPieces + 1
            }));
        }
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
                    oneCastleRight: false,
                    oneCastleLeft: false
                });
            }
        } else {
            if (player2.rookOrKingMoved.includes(selectedPiece.id)
                || player2.inCheck) {
                this.setState({
                    twoCastleRight: false,
                    twoCastleLeft: false
                });
            }
        }

        // Player1-------------------------------------------------------------------------------------------------
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
                // Right
                // Check if more than just 1 piece to the right, or if none. If so, can't castle right
                if (piecesRight.length > 1 || piecesRight.length === 0) {
                    this.setState({
                        oneCastleRight: false
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
                            oneCastleRight: true
                        });
                    } else if (inDangerRight) {
                        this.setState({
                            oneCastleRight: false
                        });
                    }
                    // If only 1 piece, but not a rook, or if the rook has moved, castleRight: false
                } else if (piecesRight.length === 1 && board.layout[piecesRight[0]].name !== "rook"
                    || player1.rookOrKingMoved.includes(board.layout[piecesRight[0]].id)) {
                    this.setState({
                        oneCastleRight: false
                    });
                }

                // Left
                // Check if more than just 1 piece to the left, or if none. If so, can't castle left
                if (piecesLeft.length > 1 || piecesLeft.length === 0) {
                    this.setState({
                        oneCastleLeft: false
                    });
                    // otherwise, if only 1 has a piece and it's a rook and it hasn't moved, keep going
                } else if (piecesLeft.length === 1 && board.layout[piecesLeft[0]].name === "rook"
                    && !player1.rookOrKingMoved.includes(board.layout[piecesLeft[0]].id)) {
                    // check if any of the indicesLeft are in danger, except for the rook, if so can't castle
                    for (let i = 1; i < indicesLeft.length; i++) {
                        if (player2.dangerIndices.includes(indicesLeft[i])) inDangerLeft = true;
                    }
                    // if none are in danger, player1 can castle left
                    if (!inDangerLeft) {
                        this.setState({
                            oneCastleLeft: true
                        });
                    } else if (inDangerLeft) {
                        this.setState({
                            oneCastleLeft: false
                        });
                    }
                    // If only 1 piece, but not a rook, or if the rook has moved: false
                } else if (piecesLeft.length === 1 && board.layout[piecesLeft[0]].name !== "rook"
                    || player1.rookOrKingMoved.includes(board.layout[piecesLeft[0]].id)) {
                    this.setState({
                        oneCastleLeft: false
                    });
                }
            }
        }

        // Player2-------------------------------------------------------------------------------------------------
        // If not in check, and king hasn't moved, check the indices right and left
        else if (selectedPiece.team === "player2") {
            if (!player2.rookOrKingMoved.includes(selectedPiece.id) && !player2.inCheck) {
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
                // Right
                // Check if more than just 1 piece to the right, or if none. If so, can't castle right
                if (piecesRight.length > 1 || piecesRight.length === 0) {
                    this.setState({
                        twoCastleRight: false
                    });
                    // check if only 1 has a piece and it's a rook and it hasn't moved
                } else if (piecesRight.length === 1 && board.layout[piecesRight[0]].name === "rook"
                    && !player2.rookOrKingMoved.includes(board.layout[piecesRight[0]].id)) {
                    // check if any of the indicesRight are in danger, except for the rook, if so can't castle
                    for (let i = 0; i < indicesRight.length - 1; i++) {
                        if (player1.dangerIndices.includes(indicesRight[i])) inDangerRight = true;
                    }
                    // if none are in danger, player2 can castle right
                    if (!inDangerRight) {
                        this.setState({
                            twoCastleRight: true
                        });
                    } else if (inDangerRight) {
                        this.setState({
                            twoCastleRight: false
                        });
                    }
                    // If only 1 piece, but not a rook, or if the rook has moved, castleRight: false
                } else if (piecesRight.length === 1 && board.layout[piecesRight[0]].name !== "rook"
                    || player2.rookOrKingMoved.includes(board.layout[piecesRight[0]].id)) {
                    this.setState({
                        twoCastleRight: false
                    });
                }

                // Left
                // Check if more than just 1 piece to the left, or if none. If so, can't castle left
                if (piecesLeft.length > 1 || piecesLeft.length === 0) {
                    this.setState({
                        twoCastleLeft: false
                    });
                    // otherwise, if only 1 has a piece and it's a rook and it hasn't moved, keep going
                } else if (piecesLeft.length === 1 && board.layout[piecesLeft[0]].name === "rook"
                    && !player2.rookOrKingMoved.includes(board.layout[piecesLeft[0]].id)) {
                    // check if any of the indicesLeft are in danger, except for the rook, if so can't castle
                    for (let i = 1; i < indicesLeft.length; i++) {
                        if (player1.dangerIndices.includes(indicesLeft[i])) inDangerLeft = true;
                    }
                    // if none are in danger, player2 can castle left
                    if (!inDangerLeft) {
                        this.setState({
                            twoCastleLeft: true
                        });
                    } else if (inDangerLeft) {
                        this.setState({
                            twoCastleLeft: false
                        });
                    }
                    // If only 1 piece, but not a rook, or if the rook has moved: false
                } else if (piecesLeft.length === 1 && board.layout[piecesLeft[0]].name !== "rook"
                    || player2.rookOrKingMoved.includes(board.layout[piecesLeft[0]].id)) {
                    this.setState({
                        twoCastleLeft: false
                    });
                }
            }
        }
    }

    promotePawn(piece, user, i) {
        // piece to be updated needs this format: {name:"rook", team:"player2", id:0},
        let updatePiece = {
            name: piece,
            team: user.team,
            // id: 64 for first promotedPiece, 65 for second and so on
            id: 63 + this.state.promotedPieces
        }
        // Set the state's promotion properties back to falsy
        this.setState({
            canPromotePawn: false,
            promoteAt: null,
            promotionUser: null
        });

        // update the store's board.layout with the new piece
        this.props.promotePawn(updatePiece, i);
    }


    render() {
        const { player1, player2, board } = this.props;
        const { canPromotePawn, promoteAt, promotionUser, checkMated } = this.state;
        let winner;
        if (checkMated !== null) {
            if (checkMated === "player1") winner = player2.userName;
            else winner = player1.userName;
        }

        // get the user in check, or false to pass to <InCheckDisplay />
        let userInCheck = isInCheck(player1, player2);
        let castlePackage = {
            playerOne: {
                castleRight: this.state.oneCastleRight,
                castleLeft: this.state.oneCastleLeft
            },
            playerTwo: {
                castleRight: this.state.twoCastleRight,
                castleLeft: this.state.twoCastleLeft
            }
        }
        
        

        return (
            <div className='game'>
                <h1 className='title'>REACT CHESS</h1>

                <div className='in-check-container'>
                    {userInCheck && <InCheckDisplay user={userInCheck} />}
                </div>

                {canPromotePawn && <SelectPromotion
                    promoteAt={promoteAt} canPromotePawn={this.canPromotePawn} user={promotionUser} promotePawn={this.promotePawn}
                />}

                {checkMated !== null && <CheckMate winner={winner} />}

                <Board
                    player1={player1} player2={player2}
                    board={board} canCastle={this.canCastle}
                    castlePackage={castlePackage} canPromotePawn={this.canPromotePawn}
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

export default connect(mapStateToProps, { promotePawn })(Game); 
