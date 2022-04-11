var counter = 0;
var number_cards = document.getElementsByClassName("cards").length;
var attemptLeft = number_cards - 1;
var score;
const button = document.getElementById("nextLevel");
const reloadButton = document.getElementById("replay");
const savebutton = document.getElementById("saveLevel");

const userJSON = {
  name: "",
  state: "",
};

// hiding the net level button if it exists
if (button) {
  button.style.display = "none";
}
if (savebutton) {
  savebutton.style.display = "none";
}

// hiding the replay button if it exists
if (reloadButton) {
  reloadButton.style.display = "none";
}

document.getElementById("attemptDiv").innerHTML =
  "MOVES LEFT" + "<br>" + attemptLeft + "/" + (number_cards - 1);

document.getElementById("score").innerHTML = "SCORE" + "<br>" + score;

function attempt() {
  attemptLeft--;
  document.getElementById("attemptDiv").innerHTML =
    "MOVES LEFT" + "<br>" + attemptLeft + "/" + (number_cards - 1);
}

function winner_loser() {
  // if user loses
  if (attemptLeft == 0) {
    document.getElementById("status").innerHTML = "You Lost!";

    if (reloadButton) {
      reloadButton.style.display = "block";// giving a replay option when the user loses
    } 
    document.getElementById("score").innerHTML = "SCORE" + "<br>" + score;
    attemptLeft = number_cards - 1;
    document.getElementById("attemptDiv").innerHTML =
      "MOVES LEFT" + "<br>" + attemptLeft + "/" + (number_cards - 1);
  } else if (counter == number_cards) {
    document.getElementById("status").innerHTML = "You Won!";
    score++;

    if (button) {
      savebutton.style.display = "block";
      button.style.display = "block"; // displaying the next level button once the user completed the level
    }
    document.getElementById("score").innerHTML = "SCORE" + "<br>" + score; // does this show up
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

function checkForMatch() {
  if (
    firstCard.getAttribute("data-framework") ===
    secondCard.getAttribute("data-framework")
  ) {
    disableCards();
    return;
  }
  unflipCards();
}

function disableCards() {
  counter += 2;

  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  winner_loser();
  resetBoard();
}

function unflipCards() {
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

function createUser(isUpdate = false) {
  if (!isUpdate) {
    var name = document.getElementById("userName").value;
  }
  var isreturn = false;

  const dbRef = firebase.database().ref();
  dbRef
    .child(name)
    .get()
    .then((snapshot) => {
      // check if user already exists
      if (snapshot.exists()) {
        localStorage.setItem("myVar", name); // creating object in local storage
        var snap = snapshot.val();
        var state = snap.state;
        localStorage.setItem("pageToLoad", state);
        
      } else {
        userJSON.name = name;
        userJSON.state = "starting a new game";
        localStorage.setItem("myVar", userJSON.name);
        isreturn = true;
        localStorage.setItem("pageToLoad", "level1");
        // create the user in firebase
        var refer = name;
        firebase.database().ref(refer).push(userJSON);
      }
      alert("data saved");
    })
    .catch((error) => {
      console.error(error);
    });
}

function createSavedState() {
  // retrieve username
  
  var myVar = localStorage.getItem("myVar");
  var name = myVar;
  // retrieve current level of user
  var myNextLevel = localStorage.getItem("myNextLevel");
  var reference = name;
  userJSON.name = name;
  console.log(name)
  userJSON.state = myNextLevel;
  // add level and username to firebase
  firebase.database().ref(reference).set({ name: myVar, state: myNextLevel });
  alert("data saved");
}

function saveData(obj, location) {
  firebase.database().ref(location).push(obj);
  alert("data saved");
}
