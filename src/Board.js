import React from "react";
import Card from "./Card.js";

/* let board = (); */

function Board({ cards }) {
  // TODO: handle case when there are more than 12 cards
  let rows = [];
  const base = 2 * 3 ** 3 + 2 * 3 ** 2 + 2 * 3 ** 1 + 2 * 3 ** 0;
  for (let row = 0; row < 3; row++) {
    if (!rows[row]) {
      rows[row] = [];
    }
    for (let col = 0; col < 4; col++) {
      rows[row].push(cards[row * 4 + col] || {});
      // rows[row].push(cards[row * 4 + col] || { key: base + row * 4 + col });
    }
  }
  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div className="board-row" key={"row" + rowIndex}>
          {row.map((cardValue, colIndex) => (
            <Card card={cardValue} key={rowIndex * 4 + colIndex}></Card>
          ))}
        </div>
      ))}
    </div>
  );
}
export default Board;
