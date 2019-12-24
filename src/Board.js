import React from "react";
import Card from "./Card.js";

/* let board = (); */

function Board({ cards }) {
  // TODO: handle case when there are more than 12 cards
  let rows = [];
  for (let row = 0; row < 3; row++) {
    if (!rows[row]) {
      rows[row] = [];
    }
    for (let col = 0; col < 4; col++) {
      rows[row].push(cards[row * 3 + col]);
    }
  }
  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div className="board-row">
          {row.map((cardValue, index) => (
            <Card card={cardValue}></Card>
          ))}
        </div>
      ))}
    </div>
  );
}
export default Board;
