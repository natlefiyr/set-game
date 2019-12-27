import React, { useState } from "react";
import Card from "./Card.js";

/* let board = (); */

function Board({ cards }) {
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
  /** Returns whether the card can be selected */
  function handleCardClickOnBoard(select) {
    if (select) {
      if (numSelected < 3) {
        setNumSelected(numSelected + 1);
        return true;
      }
      return false;
    } else {
      setNumSelected(numSelected - 1);
      return true;
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
              handleCardClickOnBoard={handleCardClickOnBoard}
            ></Card>
          ))}
        </div>
      ))}
    </div>
  );
}
export default Board;
