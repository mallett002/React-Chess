import React, { Component } from 'react';

// Board will have width and height of 8 X 8
// Will be a set of divs with x, y coordinates
class Board extends Component {

    componentDidMount() {
        // When component mounts, we'll create some boxes and insert them into "board"
        let board = document.getElementById("board");
        let boxes = document.createElement("div");
        boxes.className = "boxes";
        boxes.style.margin = '0 auto';
        
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let box = document.createElement("div");
                box.style.display = 'inline-block';
                box.className = 'box';
                box.style.width = 12.5 + "%";
                box.style.height = 10 + "vw";
                box.style.margin = 0;
                box.id = `${x}${y}`;
                box.style.background = (x + y) % 2 === 0 ? '#67a567' : '#c5c5c5';
                boxes.appendChild(box);
            }
        }
        board.appendChild(boxes);
    }

    render() {
        return (
            <div id='board'></div>
        )
    }
}

export default Board;