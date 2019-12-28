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

function Card({ card, handleCardClickOnBoard, boardIndex }) {
  // TODO: should assert that we never get to the 2nd part of this OR
  const isEmptyPlaceholder =
    card.isEmptyPlaceholder || card.number === undefined;
  let cardStyle = {
    display: "inline-block",
    textAlign: "center",
    border: "2px solid black",

    backgroundColor: "white"
  };
  let shadeName;
  // TODO: maybe find a way not to hard-code width etc?

  if (card.isUserSet) {
    cardStyle = {
      ...cardStyle,
      padding: "5px",
      width: "80px",
      margin: "7px 5px"
    };
  } else {
    // cardStyle["fontSize"] = "20px";
    cardStyle = {
      ...cardStyle,
      fontSize: "20px",
      padding: "18px 18px",
      width: "130px",
      margin: "9px 7px"
    };
  }
  if (isEmptyPlaceholder) {
    cardStyle["color"] = "white";
  } else {
    shadeName = SHADES[card.shade].name;
    cardStyle["backgroundColor"] = SHADES[card.shade].backgroundColor;
  }
  if (card.selected) {
    cardStyle["border"] = "4px solid red";
    // 2px more on top & bottom from increased border => 2px less on top & bottom margin
    cardStyle["margin"] = "7px 7px";
  }
  function handleCardClick() {
    // User cannot select placeholder space
    if (!isEmptyPlaceholder) {
      handleCardClickOnBoard(boardIndex);
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
