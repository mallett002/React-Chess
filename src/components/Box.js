import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Constants
import { isLight } from '../constants/constants';
import { selectPiece, deselect, addToFallen } from '../actions/actions';

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
    // place is index of the box in the layout
    // piece is the data in that index
    // board is the Redux store for the board
    const { piece, place, board, selectPiece, deselect, handleMove, addToFallen } = this.props;

    // if piece is an empty one, and none are currently selected, do nothing
    if (piece.name === "empty" && board.selected === null) {
      return null;
    }

    // if state.selected is null & the selected square has a piece in it
    if (board.selected === null) {
      // dispatch an action with the piece and it's current location
      selectPiece(piece, place);
    }

    // If selected box is clicked again, deselect it
    if (board.selected !== null && place === board.selected.index) {
        // update selected to be empty again
        deselect();
    }

    // If selected, and if place !== current location, fire a moveTo action
    if (board.selected !== null && place !== board.selected.index) {
      // If new place has a piece, add that to the fallen list
      if (piece.name !== "empty") addToFallen(piece);
      // insert "selected" into "place"
      handleMove(board.selected.index, place);
    }
  };

  render() {

    const { piece, place, user } = this.props;

    return (
      <div className="box"
        onClick={this.handleClick}
        style={isLight(place)
          ? { background: '#eaeaea' }
          : { background: '#6b906b' }}
      >
      {/*TODO- Have user={this.props.user} to check the store for that user's color*/}
        {piece.name === "king" && piece.team === "player2" && <King user={"black"} />}
        {piece.name === "king" && piece.team === "player1" && <King user={"white"} />}
        {piece.name === "queen" && piece.team === "player2" && <Queen user={"black"} />}
        {piece.name === "queen" && piece.team === "player1" && <Queen user={"white"} />}
        {piece.name === "rook" && piece.team === "player2" && <Rook user={"black"} />}
        {piece.name === "rook" && piece.team === "player1" && <Rook user={"white"} />}
        {piece.name === "bishop" && piece.team === "player2" && <Bishop user={"black"} />}
        {piece.name === "bishop" && piece.team === "player1" && <Bishop user={"white"} />}
        {piece.name === "knight" && piece.team === "player2" && <Knight user={"black"} />}
        {piece.name === "knight" && piece.team === "player1" && <Knight user={"white"} />}
        {piece.name === "pawn" && piece.team === "player2" && <Pawn user={"black"} />}
        {piece.name === "pawn" && piece.team === "player1" && <Pawn user={"white"} />}
      </div>
    )
  }
}

Box.propTypes = {
  piece: PropTypes.object.isRequired,
  place: PropTypes.number.isRequired
};

export default connect(null, { selectPiece, deselect, addToFallen })(Box);