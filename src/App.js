import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import cloneDeep from "lodash/cloneDeep";
import Card from "./Card.js";
import Board from "./Board.js";
import UserHand from "./UserHand.js";
import { SHAPES, NUMBERS, COLORS, SHADES } from "./Cards.js";

/*
TODO:
- [DONE] handle unique key warning
- [DONE] make variables React-ive (set state)
- [DONE] allow single user to select a set (no more than 3 cards)
  - on set:
    - [DONE] give to user
    - (later) verify it's a set
    - [DONE] (later) make it displayable in user's "hand"
    - [DONE] re-deal
- later
  - handle more than 12 card board case
  - save to backend
  - Page layout
    - [DONE] title
    - [DONE] board spacing
    - show deck
    - show user
    - [DONE] show user's hand
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
  const numFilledCardSlots = boardCards.filter(card => !card.isEmptyPlaceholder)
    .length;
  const numCardsToDeal = limit - numFilledCardSlots;
  const cardsToDeal = deckCards.filter(
    (value, index) => index < numCardsToDeal
  );

  // Fill any empty spots
  let newBoardCards = boardCards.map(card =>
    card.isEmptyPlaceholder
      ? cardsToDeal.pop() || { isEmptyPlaceholder: 1 }
      : card
  );
  // Add any additional cards still left to deal
  newBoardCards = newBoardCards.concat(cardsToDeal);
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

  const dealResults = deal([], initialDeckCards, 12);
  const [deckCards, setDeckCards] = useState(dealResults.newDeckCards);
  const [boardCards, setBoardCards] = useState(dealResults.newBoardCards);
  const [userSets, setUserSets] = useState([]);

  function finalizeDeal(boardCards, deckCards, limit) {
    const dealResults = deal(boardCards, deckCards, limit);
    setDeckCards(dealResults.newDeckCards);
    setBoardCards(dealResults.newBoardCards);
  }
  function handleDeal(event) {
    finalizeDeal(boardCards, deckCards, 12);
  }
  /** Returns whether the card can be selected */
  function handleCardClickInApp(boardIndex) {
    const card = boardCards[boardIndex];
    // Determine whether the user wants to select the card (or unselect it)
    const select = !card.selected;
    const numSelected = boardCards.filter(card => card.selected).length;
    if (select) {
      if (numSelected < 3) {
        // Set the card as selected
        let newBoardCards = boardCards.map((card, index) =>
          index === boardIndex ? { ...card, selected: true } : card
        );
        setBoardCards(newBoardCards);

        // When user selects the third card, add the set to the user's hand
        if (numSelected === 2) {
          // Get the Set cards, and get a version where they are unselected
          const set = newBoardCards
            .filter(card => card.selected === true)
            .map(card =>
              card.selected
                ? { ...card, isUserSet: true, selected: false }
                : { ...card, isUserSet: true }
            );

          // Replace the Set cards on the board with empty cards
          newBoardCards = newBoardCards.map((card, index) =>
            card.selected ? { isEmptyPlaceholder: 1 } : card
          );
          setBoardCards(newBoardCards);
          setUserSets([...userSets, set]);
          finalizeDeal(newBoardCards, deckCards, 12);
        }
      }
    } else {
      // Set the card as unselected
      setBoardCards(
        boardCards.map((card, index) =>
          index === boardIndex ? { ...card, selected: false } : card
        )
      );

      return true;
    }
  }

  return (
    <div className="App">
      <h2>Set Game</h2>
      <Board
        cards={boardCards}
        handleCardClickInApp={handleCardClickInApp}
      ></Board>
      <button onClick={handleDeal}>Deal</button>
      <UserHand userSets={userSets}></UserHand>
    </div>
  );
}

export default App;
