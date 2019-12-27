import React, { useState } from "react";
import { SHAPES, NUMBERS, COLORS, SHADES } from "./Cards.js";

function getNumberedShape(number, shape, color, isEmptyPlaceholder) {
  var numberedShape = "";
  if (isEmptyPlaceholder) {
    // TODO: fix this - hackily put some content so height is automatically calculated correctly
    return "*";
  }
  for (let numberIndex = 0; numberIndex < number + 1; numberIndex++) {
    numberedShape += COLORS[color].iconLookup[shape];
  }
  return numberedShape;
}

function Card({ card, handleCardClickOnBoard }) {
  const [selected, setSelected] = useState(false);
  const isEmptyPlaceholder = card.number === undefined;
  const cardStyle = {
    display: "inline-block",
    textAlign: "center",
    width: "80px",
    border: "2px solid black",
    margin: "7px 5px",
    padding: "5px",
    backgroundColor: "white"
  };
  let shadeName;
  if (isEmptyPlaceholder) {
    cardStyle["color"] = "white";
  } else {
    shadeName = SHADES[card.shade].name;
    cardStyle["backgroundColor"] = SHADES[card.shade].backgroundColor;
  }
  if (selected) {
    cardStyle["border"] = "4px solid red";
    cardStyle["margin"] = "5px 5px";
  }
  function handleCardClick() {
    // User cannot select placeholder space
    if (!isEmptyPlaceholder) {
      const canSelect = handleCardClickOnBoard(!selected);
      if (canSelect) {
        setSelected(!selected);
      }
    }
  }

  return (
    <button style={cardStyle} onClick={handleCardClick}>
      {getNumberedShape(
        card.number,
        card.shape,
        card.color,
        isEmptyPlaceholder
      )}
    </button>
  );
}

export default Card;
