import React, { useState } from "react";
import Card from "./Card.js";

/* let board = (); */

function Board({ cards, handleCardClickInApp }) {
  // TODO: handle case when there are more than 12 cards
  const [numSelected, setNumSelected] = useState(0);
  let rows = [];
  for (let row = 0; row < 3; row++) {
    if (!rows[row]) {
      rows[row] = [];
    }
    for (let col = 0; col < 4; col++) {
      rows[row].push(cards[row * 4 + col] || {});
    }
  }

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div className="board-row" key={"row" + rowIndex}>
          {row.map((cardValue, colIndex) => (
            <Card
              card={cardValue}
              key={rowIndex * 4 + colIndex}
              boardIndex={rowIndex * 4 + colIndex}
              handleCardClickOnBoard={handleCardClickInApp}
            ></Card>
          ))}
        </div>
      ))}
    </div>
  );
}
export default Board;
