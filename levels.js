var counter = 0;
var number_cards = 4;
var attemptLeft = number_cards - 1;
var score = 0;
const button = document.getElementById("nextLevel");

// hiding the net level button
button.style.display="none";

document.getElementById("attemptDiv").innerHTML =
  "MOVES LEFT" + "<br>" + attemptLeft + "/" + (number_cards - 1);
document.getElementById("score").innerHTML = "SCORE" + "<br>" + score;
function attempt() {
  attemptLeft--;
  document.getElementById("attemptDiv").innerHTML =
    "MOVES LEFT" + "<br>" + attemptLeft + "/" + (number_cards - 1);
}
function winner_loser() {
  if (attemptLeft == 0) {
    document.getElementById("status").innerHTML = "You Lost!";
    score--;
    document.getElementById("score").innerHTML = "SCORE" + "<br>" + score;
    attemptLeft = number_cards - 1;
    document.getElementById("attemptDiv").innerHTML =
      "MOVES LEFT" + "<br>" + attemptLeft + "/" + (number_cards - 1);
  } else if (counter == number_cards) {
    document.getElementById("status").innerHTML = "You Won!";
    score++;
    button.style.display="block"; // displaying the button once the user completed the level
    document.getElementById("score").innerHTML = "SCORE" + "<br>" + score;
  }
}

const cards = document.querySelectorAll(".cards");

let FlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!FlippedCard) {
    FlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

console.log("random");
function checkForMatch() {
  if (
    firstCard.getAttribute("data-framework") ===
    secondCard.getAttribute("data-framework")
  ) {
    disableCards();
    return;
  }
  console.log("about to unflip");
  unflipCards();
}

function disableCards() {
  console.log("in disable");
  counter += 2;

  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  winner_loser();
  resetBoard();
}

function unflipCards() {
  console.log("in unflip");
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);

  attempt();
  winner_loser();
}

function resetBoard() {
  [FlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// shuffle elements
cards.forEach((card) => {
  const ramdomPos = Math.floor(Math.random() * cards.length);
  card.style.order = ramdomPos;
});

cards.forEach((card) => card.addEventListener("click", flipCard));
