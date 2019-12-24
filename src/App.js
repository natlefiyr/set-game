import React from "react";
import logo from "./logo.svg";
import "./App.css";
import cloneDeep from "lodash/cloneDeep";
import Card from "./Card.js";
import Board from "./Board.js";
import { SHAPES, NUMBERS, COLORS, SHADES } from "./Cards.js";

/*
TODO:
- handle unique key warning
- make variables React-ive (set state)
- allow single user to select a set (no more than 3 cards)
  - on set:
    - give to user
    - (later) verify it's a set
    - (later) make it displayable in user's "hand"
    - re-deal
- later
  - handle more than 12 card board case
  - save to backend
  - Page layout
    - title
    - board spacing
    - show deck
    - show user
    - show user's hand
  - multi-users
*/

function displayAllCards(cards) {
  return (
    <ul>
      {cards.map(card => (
        <Card card={card}></Card>
      ))}
    </ul>
  );
}

function getDeck() {
  let cards = [];
  for (let shapeIndex = 0; shapeIndex < SHAPES.length; shapeIndex++) {
    for (let colorIndex = 0; colorIndex < COLORS.length; colorIndex++) {
      for (let shadeIndex = 0; shadeIndex < SHADES.length; shadeIndex++) {
        for (let numberIndex = 0; numberIndex < NUMBERS.length; numberIndex++) {
          cards.push({
            shape: shapeIndex,
            color: colorIndex,
            shade: shadeIndex,
            number: numberIndex
          });
        }
      }
    }
  }
  return cards;
}
function shuffle(cards) {
  const cardsCopy = cloneDeep(cards);
  const shuffledCards = [];
  console.log(cards);
  for (let i = 0; i < cards.length; i++) {
    let index = Math.floor(Math.random() * cardsCopy.length);
    shuffledCards.push(cardsCopy[index]);
    cardsCopy.splice(index, 1);
  }
  console.log(shuffledCards);
  return shuffledCards;
}
function deal(boardCards, deckCards) {
  // For now just initial deal
  // TODO: replace pop b/c that changes state by side effect
  // TODO: handle case when there are more than 12 cards
  for (let i = 0; i < 12; i++) {
    boardCards.push(deckCards.pop());
  }
}
function sort(cards) {}

function App() {
  const sortedDeck = getDeck();
  // TODO: refactor so these are constants!!
  var deckCards = shuffle(sortedDeck);
  var boardCards = [];
  deal(boardCards, deckCards);
  return (
    <div className="App">
      <Board cards={boardCards}></Board>
    </div>
  );
}

export default App;
