import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import cloneDeep from "lodash/cloneDeep";
import Card from "./Card.js";
import Board from "./Board.js";
import { SHAPES, NUMBERS, COLORS, SHADES } from "./Cards.js";

/*
TODO:
- [DONE] handle unique key warning
- [DONE] make variables React-ive (set state)
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
            key:
              shapeIndex * 3 ** 3 +
              colorIndex * 3 ** 2 +
              shadeIndex * 3 ** 1 +
              numberIndex * 3 ** 0,
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
  var cardsCopy = cloneDeep(cards);
  var shuffledCards = [];

  for (let i = 0; i < cards.length; i++) {
    let index = Math.floor(Math.random() * cardsCopy.length);
    shuffledCards.push(cardsCopy[index]);
    cardsCopy.splice(index, 1);
  }
  return shuffledCards;
}
function deal(boardCards, deckCards, limit) {
  // For now just initial deal
  // TODO: replace pop b/c that changes state by side effect
  // TODO: handle case when there are more than 12 cards
  const numCardsToDeal = limit - boardCards.length;

  const newBoardCards = boardCards.concat(
    deckCards.filter((value, index) => index < numCardsToDeal)
  );
  const newDeckCards = deckCards.filter(
    (value, index) => index >= numCardsToDeal
  );
  return {
    newBoardCards: newBoardCards,
    newDeckCards: newDeckCards
  };
}
function sort(cards) {}

function App() {
  const sortedDeck = getDeck();
  // TODO: refactor so these are constants!!
  const initialDeckCards = shuffle(sortedDeck);

  const dealResults = deal([], initialDeckCards, 9);
  const [deckCards, setDeckCards] = useState(dealResults.newDeckCards);
  // setDeckCards(initialDeckCards);
  const [boardCards, setBoardCards] = useState(dealResults.newBoardCards);
  // useEffect(() => {
  //   // Using _users to avoid naming confusion with users above
  //   // getUsers({ type: "users" }).then(_users => setUsers(_users));
  //   setDeckCards();
  //   setBoardCards();
  // }, []);
  function handleDeal(event) {
    const dealResults = deal(boardCards, deckCards, 12);
    setDeckCards(dealResults.newDeckCards);
    setBoardCards(dealResults.newBoardCards);
  }

  return (
    <div className="App">
      <button onClick={handleDeal}>Deal</button>
      <Board cards={boardCards}></Board>
    </div>
  );
}

export default App;
