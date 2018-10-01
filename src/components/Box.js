import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Constants
import { isLight, getValidMoves } from '../constants/constants';
import { selectPiece, deselect, addToFallen, addPlayerOneDanger, addPlayerTwoDanger } from '../actions/actions';

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
      addPlayerOneDanger, addPlayerTwoDanger } = this.props;

    // if piece is an empty one, and none are currently selected, do nothing
    if (piece.name === "empty" && board.selected === null) {
      return null;
    }

    // if state.selected is null & the selected square has a piece in it
    if (board.selected === null) {
      // dispatch an action with the piece and it's current location
      selectPiece(piece, index);
    }

    // If selected box is clicked again, deselect it
    if (board.selected !== null && index === board.selected.index) {
      // update selected to be empty again
      deselect();
    }

    // If a piece is selected, & if clicked box is different than the selected one
    if (board.selected !== null && index !== board.selected.index) {
      // If new index has a piece, and it's on the other team, add that to the fallen list
      if (piece.name !== "empty" && piece.team !== board.selected.piece.team) {
        let team = board.selected.piece.team;
        let selected = board.selected;
        addToFallen(piece);
        // insert "selected" into "index": handleMove(from, to)
        handleMove(board.selected.index, index);

        // Update the state with the dangerIndices for this piece at the new location
        let dangerIndices = getValidMoves({
          piece: {
            id: selected.piece.id,
            name: selected.piece.name,
            team: selected.piece.team
          },
          index: index
        }, board.layout);

        if (team === "player1") addPlayerOneDanger(dangerIndices);
        else addPlayerTwoDanger(dangerIndices);
      }

      // if new index doesn't have a piece, just send it to that empty spot
      if (piece.name === "empty") {
        let team = board.selected.piece.team;
        let selected = board.selected;

        handleMove(board.selected.index, index);

        // Get the dangerIndices for this piece
        // Update the state with the dangerIndices for this piece at the new location
        // Update the state with the dangerIndices for this piece at the new location
        let dangerIndices = getValidMoves({
          piece: {
            id: selected.piece.id,
            name: selected.piece.name,
            team: selected.piece.team
          },
          index: index
        }, board.layout);

        if (team === "player1") addPlayerOneDanger(dangerIndices);
        else addPlayerTwoDanger(dangerIndices);

      }

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
  selectPiece, deselect, addToFallen, addPlayerOneDanger, addPlayerTwoDanger
})(Box);