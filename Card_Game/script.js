// Define card suits and values
const suits = ["♥", "♦", "♣", "♠"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

// Create a deck of cards
function createDeck() {
  const deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push({ suit: suits[i], value: values[j] });
    }
  }
  return deck;
}

// Shuffle the deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Deal cards to players
function dealCards(deck, players) {
  for (let i = 0; i < players.length; i++) {
    players[i].cards.push(deck.pop());
  }
}

// Get the numeric value of a card
function getCardValue(card) {
  const cardValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };
  return cardValues[card.value];
}

// Determine the winner based on hand values
function determineWinner(players) {
  const player1Value = getHandValue(players[0].cards);
  const player2Value = getHandValue(players[1].cards);

  if (player1Value > player2Value) {
    return players[0];
  } else if (player2Value > player1Value) {
    return players[1];
  } else {
    return null; // It's a tie
  }
}

// Evaluate the hand value based on Teen Patti rules
function getHandValue(cards) {
  const sortedCards = cards.sort((a, b) => getCardValue(b) - getCardValue(a));
  // High Card
  return getCardValue(sortedCards[0]);
}

const player1 = { name: "Player 1", cards: [] };
const player2 = { name: "Player 2", cards: [] };
const players = [player1, player2];
const deck = createDeck();
shuffleDeck(deck);

document.getElementById("dealButton").addEventListener("click", function () {
  dealCards(deck, players);

  // Update the UI to display dealt cards and scores
  const player1CardsElement = document.getElementById("player1-cards");
  const player2CardsElement = document.getElementById("player2-cards");

  player1CardsElement.innerHTML = "";
  player2CardsElement.innerHTML = "";

  for (let i = 0; i < players[0].cards.length; i++) {
    const card1 = document.createElement("div");
    card1.className = "card";
    card1.textContent = players[0].cards[i].suit + players[0].cards[i].value;
    player1CardsElement.appendChild(card1);

    const card2 = document.createElement("div");
    card2.className = "card";
    card2.textContent = players[1].cards[i].suit + players[1].cards[i].value;
    player2CardsElement.appendChild(card2);
  }

  // Display scores
  const player1ScoreElement = document.createElement("p");
  player1ScoreElement.textContent = `Player 1 Score: ${getHandValue(
    players[0].cards
  )}`;
  player1CardsElement.appendChild(player1ScoreElement);

  const player2ScoreElement = document.createElement("p");
  player2ScoreElement.textContent = `Player 2 Score: ${getHandValue(
    players[1].cards
  )}`;
  player2CardsElement.appendChild(player2ScoreElement);
});

document.getElementById("showButton").addEventListener("click", function () {
  const winner = determineWinner(players);
  const resultElement = document.createElement("p");

  if (winner) {
    resultElement.textContent = `${winner.name} wins!`;
  } else {
    resultElement.textContent = "It's a tie!";
  }

  document.body.appendChild(resultElement);
});
