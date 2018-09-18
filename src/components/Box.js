import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Constants
import { isLight } from '../constants/constants';
import { selectPiece, moveTo, deselect } from '../actions/actions';

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
    const { piece, selectPiece, deselect, place, board } = this.props;
    const boxCollection = document.querySelectorAll(".box");
    const boxes = [...boxCollection];
    let clicked = boxes[place];

    // if state.selected is null & the selected square has a piece in it
    if (board.selected === null) {
      // dispatch an action with the piece
      selectPiece(piece);
      // Listen for click on any other box
      // if clicked and selected is true, send selected there
    }

    // If selected box is clicked again
    if (board.selected !== null && place === board.selected.id) {
        // update selected to be empty again
        deselect();
    }

    // Can't select another square, only deslect the selected one
    // if a diff square is clicked, fire a moveTo action
    if (board.selected !== null && place !== board.selected.id) {
      console.log(`Piece at ${board.selected.id} needs to move to ${place}`);
    }
  };

  render() {

    const { piece, place } = this.props;

    return (
      <div className="box"
        onClick={this.handleClick}
        style={isLight(place)
          ? { background: '#eaeaea' }
          : { background: '#6b906b' }}
      >
        {piece.name === "king" && piece.team === "computer" && <King user={"black"} />}
        {piece.name === "king" && piece.team === "player" && <King user={"white"} />}
        {piece.name === "queen" && piece.team === "computer" && <Queen user={"black"} />}
        {piece.name === "queen" && piece.team === "player" && <Queen user={"white"} />}
        {piece.name === "rook" && piece.team === "computer" && <Rook user={"black"} />}
        {piece.name === "rook" && piece.team === "player" && <Rook user={"white"} />}
        {piece.name === "bishop" && piece.team === "computer" && <Bishop user={"black"} />}
        {piece.name === "bishop" && piece.team === "player" && <Bishop user={"white"} />}
        {piece.name === "knight" && piece.team === "computer" && <Knight user={"black"} />}
        {piece.name === "knight" && piece.team === "player" && <Knight user={"white"} />}
        {piece.name === "pawn" && piece.team === "computer" && <Pawn user={"black"} />}
        {piece.name === "pawn" && piece.team === "player" && <Pawn user={"white"} />}
      </div>
    )
  }
}

Box.propTypes = {
  piece: PropTypes.object.isRequired,
  place: PropTypes.number.isRequired
};

export default connect(null, { selectPiece, deselect, moveTo })(Box);