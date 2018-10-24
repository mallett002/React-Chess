import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Constants
import { isLight } from '../constants/constants';
import { selectPiece, deselect, addToFallen, updatePlayerOneDanger, updatePlayerTwoDanger, performCastle, updateTurn } from '../actions/actions';

// Components
import King from './King';
import Queen from './Queen';
import Rook from './Rook';
import Bishop from './Bishop';
import Knight from './Knight';
import Pawn from './Pawn';


class Box extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // index is index of the box in the layout
    // piece is the data in that index
    // coords is an array of the x, y coords of the board
    // board is the Redux store for the board
    const { piece, coords, index,
      board, selectPiece, deselect, handleMove, addToFallen,
      updatePlayerOneDanger, updatePlayerTwoDanger, castlePackage, performCastle, updateTurn } = this.props;

    // if piece is an empty one, and none are currently selected, do nothing
    if (piece.name === "empty" && board.selected === null) {
      return null;
    }

    // if state.selected is null & the selected square has a piece in it
    if (board.selected === null) {
      // dispatch an action with the piece and it's current location
      // Only select pieces of the team who's turn it is
      if (piece.team === board.turn) selectPiece(piece, index);
      // If a king is selected, check if it can castle
      if (piece.name === "king") this.props.canCastle(piece, index);
    }

    // If selected box is clicked again, deselect it
    if (board.selected !== null && index === board.selected.index) {
      // update selected to be empty again
      deselect();
    }

    // Handling a move
    // If a piece is selected, & if clicked box is different than the selected one, and if is a valid move for that piece
    if (board.selected !== null && index !== board.selected.index && board.validMoves.includes(index)) {

      // Handle a castle
      // If selected piece is a king, and you can castle, and index is more than 1 away from king's index
      if (board.selected.piece.name === "king" && Math.abs(board.selected.index - index) === 2
        || board.selected.piece.name === "king" && Math.abs(board.selected.index - index) === 3) {
        let oldRookIndex;
        let newRookIndex;
        // performCastle(oldKingIndex, newKingIndex, oldRookIndex, newRookIndex)
        // if new index is greater than kings, castle right
        if (index > board.selected.index) {
          oldRookIndex = index + 1;
          newRookIndex = index - 1;
          performCastle(board.selected.index, index, oldRookIndex, newRookIndex);
          // Then update store's dangerIndices
          this.props.updateDanger();
          // And see if any pieces are preventing check
          this.props.updateAlmostInCheck();

          // else, castling left
        } else {
          oldRookIndex = index - 1;
          newRookIndex = index + 1;

          performCastle(board.selected.index, index, oldRookIndex, newRookIndex);
          // Then update store's dangerIndices
          this.props.updateDanger();
          // And see if any pieces are preventing check
          this.props.updateAlmostInCheck();
        }
      }

      // otherwise if new index has a piece, and it's on the other team, add that to the fallen list
      else if (piece.name !== "empty" && piece.team !== board.selected.piece.team) {
        let team = board.selected.piece.team;
        let selected = board.selected;
        addToFallen(piece);
        // Call Board's handleMove(from, to)
        handleMove(board.selected.index, index);
      }

      // otherwise if new index doesn't have a piece, just send it to that empty spot
      else if (piece.name === "empty") {
        let team = board.selected.piece.team;
        let selected = board.selected;

        // move the piece
        handleMove(board.selected.index, index);
      }

      // Update the turn
      updateTurn();

    }
  };

  render() {

    const { piece, index, player1, player2, board } = this.props;

    return (
      <div
        className={['box',
          board.validMoves.includes(index) && 'valid-move',
          board.selected !== null && board.selected.index === index && 'selected-piece'].join(' ')}
        onClick={this.handleClick}
        style={isLight(index)
          ? { background: '#eaeaea' }
          : { background: '#6b906b' }}
      >
        {piece.name === "king" && piece.team === "player2" && <King user={player2} />}
        {piece.name === "king" && piece.team === "player1" && <King user={player1} />}
        {piece.name === "queen" && piece.team === "player2" && <Queen user={player2} />}
        {piece.name === "queen" && piece.team === "player1" && <Queen user={player1} />}
        {piece.name === "rook" && piece.team === "player2" && <Rook user={player2} />}
        {piece.name === "rook" && piece.team === "player1" && <Rook user={player1} />}
        {piece.name === "bishop" && piece.team === "player2" && <Bishop user={player2} />}
        {piece.name === "bishop" && piece.team === "player1" && <Bishop user={player1} />}
        {piece.name === "knight" && piece.team === "player2" && <Knight user={player2} />}
        {piece.name === "knight" && piece.team === "player1" && <Knight user={player1} />}
        {piece.name === "pawn" && piece.team === "player2" && <Pawn user={player2} />}
        {piece.name === "pawn" && piece.team === "player1" && <Pawn user={player1} />}
      </div>
    )
  }
}

Box.propTypes = {
  piece: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default connect(null, {
  selectPiece, deselect, addToFallen, updatePlayerOneDanger, updatePlayerTwoDanger, performCastle, updateTurn
})(Box);