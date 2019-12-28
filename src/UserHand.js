import React from "react";
import Card from "./Card.js";
/* The hand of sets that a given user has. */

function UserHand({ userSets }) {
  function handleCardClickInHand() {
    return;
  }
  const userHandStyle = {
    textAlign: "left"
  };
  return (
    <div style={userHandStyle}>
      <h3>User Hand</h3>
      {!userSets.length && <div>No sets</div>}
      {userSets.map((userSet, userSetIndex) => (
        <div key={"userSet" + userSetIndex}>
          {" "}
          {userSet.map((card, cardIndex) => (
            <Card
              card={card}
              key={"userSet" + userSetIndex + "-card" + cardIndex}
              boardIndex={undefined}
              handleCardClickOnBoard={handleCardClickInHand}
            ></Card>
          ))}
        </div>
      ))}
    </div>
  );
}
export default UserHand;
