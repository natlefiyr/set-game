import React from "react";
import { SHAPES, NUMBERS, COLORS, SHADES } from "./Cards.js";

function getNumberedShape(number, shape, color) {
  var numberedShape = "";
  if (number === undefined) {
    // TODO: fix this - hackily put some content so height is automatically calculated correctly
    return "*";
  }
  for (let numberIndex = 0; numberIndex < number + 1; numberIndex++) {
    numberedShape += COLORS[color].iconLookup[shape];
  }
  return numberedShape;
}

function Card({ card }) {
  const cardStyle = {
    display: "inline-block",
    textAlign: "center",
    width: "80px",
    border: "2px solid black",
    margin: "5px",
    padding: "5px"
  };
  let shadeName;
  if (card.number === undefined) {
    cardStyle["color"] = "white";
  } else {
    shadeName = SHADES[card.shade].name;
    cardStyle["backgroundColor"] = SHADES[card.shade].backgroundColor;
  }

  return (
    <div style={cardStyle}>
      {getNumberedShape(card.number, card.shape, card.color)}
    </div>
  );
}

export default Card;
