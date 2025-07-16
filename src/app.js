import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  const suits = ["♦", "♥", "♠", "♣"];
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  const drawButton = document.getElementById("gen");
  const sortButton = document.getElementById("sortbtn");
  const cardsContainer = document.getElementById("cards");
  const cardsLogContainer = document.getElementById("cardsLog");
  const inputField = document.getElementById("newcards");

  let cards = [];

  // Convert card value to a sortable number
  function cardValue(card) {
    return values.indexOf(card.value);
  }

  // Generate a single random card
  function getRandomCard() {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = values[Math.floor(Math.random() * values.length)];
    return { suit, value };
  }

  // Generate N random cards
  function generateCards(n) {
    cards = [];
    for (let i = 0; i < n; i++) {
      cards.push(getRandomCard());
    }
    displayCards(cards, cardsContainer);
    cardsLogContainer.innerHTML = ""; // Clear old logs
  }

  // Render cards in a container
  function displayCards(cardArray, container) {
    container.innerHTML = "";
    cardArray.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card m-2 text-center";
      cardDiv.style.width = "70px";
      cardDiv.style.color = card.suit === "♦" || card.suit === "♥" ? "red" : "black";
      cardDiv.innerHTML = `
        <div class="card-body p-2">
          <div>${card.value}</div>
          <div>${card.suit}</div>
        </div>
      `;
      container.appendChild(cardDiv);
    });
  }

  // ✅ Bubble Sort with logging
  function bubbleSortWithSteps(array) {
    let arr = [...array];
    const steps = [];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (cardValue(arr[j]) > cardValue(arr[j + 1])) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
        steps.push([...arr]); // Save every comparison step
      }
    }

    return steps;
  }

  // Render log of sorting steps
  function displaySortSteps(steps) {
    cardsLogContainer.innerHTML = "<h5>Sorting Log:</h5>";
    steps.forEach((step, index) => {
      const row = document.createElement("div");
      row.className = "d-flex flex-wrap align-items-center mb-2";
      const label = document.createElement("strong");
      label.textContent = `Step ${index + 1}:`;
      row.appendChild(label);

      step.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card mx-1 text-center";
        cardDiv.style.width = "50px";
        cardDiv.style.color = card.suit === "♦" || card.suit === "♥" ? "red" : "black";
        cardDiv.innerHTML = `
          <div class="card-body p-1">
            <div>${card.value}</div>
            <div>${card.suit}</div>
          </div>
        `;
        row.appendChild(cardDiv);
      });

      cardsLogContainer.appendChild(row);
    });
  }

  // Events
  drawButton.addEventListener("click", () => {
    const count = parseInt(inputField.value) || 5;
    generateCards(count);
  });

  sortButton.addEventListener("click", () => {
    const steps = bubbleSortWithSteps(cards);
    displayCards(steps[steps.length - 1], cardsContainer); // Final sorted version
    displaySortSteps(steps);
  });
};
