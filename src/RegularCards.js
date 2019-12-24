import React from "react";
import logo from "./logo.svg";
import "./App.css";
import cloneDeep from "lodash/cloneDeep";

/* This module deals and displays regular cards (4 suits with 13 numbers/face cards),
instead of SET cards. */

const SUITS = ["Spades", "Hearts", "Clubs", "Diamonds"];
const NUMBERS = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const SUIT_ABBREVIATIONS = ["🖤", "💗", "🍀", "🔷"];
// const SUIT_ABBREVIATIONS = ["S", "H", "C", "D"];
// ❤🔷🖤♣♠♥🍀

function displayCards(cards) {
  return (
    <ul>
      {cards.map(card => (
        <li>
          {card.number}-{SUIT_ABBREVIATIONS[card.suitIndex]}
        </li>
      ))}
    </ul>
  );
}
function getDeck() {
  let cards = [];
  for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex++) {
    for (let numIndex = 0; numIndex < NUMBERS.length; numIndex++) {
      cards.push({
        suit: SUITS[suitIndex],
        number: NUMBERS[numIndex],
        suitIndex: suitIndex,
        numberIndex: numIndex
      });
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
function deal(cards) {
  // For now just initial deal
}
function sort(cards) {}

function App() {
  const deck = getDeck();
  const shuffledCards = shuffle(deck);
  const displayableCards = displayCards(shuffledCards);
  return <div className="App">{displayableCards}</div>;
}

export default App;
