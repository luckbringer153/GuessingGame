/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

//user guesses a number between 1 and 100
//page gives message telling them if they're hot/cold (how close) and if they should try guessing higher or lower
//previous guesses will be shown on the page
//player loses if they can't guess after 5 attempts
//reset button to restart game
//add hint button that gives a targetNum+3 and targetNum-3 number
//use Document Object Model (DOM) manipulation and event listeners

///////////////////// INITIALIZATION /////////////////////
//when site opens, random number is generated
function generateWinningNumber() {
  const targetNum = Math.ceil(Math.random() * 100);
  console.log(targetNum);
  return targetNum;
}
let winningNum = generateWinningNumber();

let tryCounter = 0; //confirm that this doesn't reset to 0 every time you submit an answer

let savedGuessesArray = [];
savedGuessesArray.length = 5;

let guess = 0;

///////////////////// CLICK SUBMIT /////////////////////
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  guess = document.getElementById("guessedNumber").value; //not working right now for some reason

  //doesn't increment if no guess was entered
  if (!guess) {
    return;
  }

  document.getElementById("savedGuesses").style.visibility = "visible";
  document.getElementById("id1").style.visibility = "hidden";
  document.getElementById("id2").style.visibility = "hidden";
  document.getElementById("id3").style.visibility = "hidden";
  document.getElementById("id4").style.visibility = "hidden";

  const isAWinner = tryGuess();

  if (isAWinner[0]) {
    //win
    document.getElementById("id5").style.visibility = "visible";
    return;
  }

  if (isAWinner[1]) {
    //lose
    document.getElementById("id1").style.visibility = "hidden";
    document.getElementById("id2").style.visibility = "hidden";
    document.getElementById("id3").style.visibility = "hidden";
    document.getElementById("id4").style.visibility = "hidden";

    document.getElementById("id6").style.visibility = "visible";
    return;
  }
});

///////////////////// CHECK GUESS /////////////////////
function tryGuess() {
  let win = false;
  let lose = false;

  //add guess to array of savedGuesses
  savedGuessesArray[tryCounter] = guess;
  document.getElementById("savedGuesses").innerHTML = savedGuessesArray;

  //check if entered number is correct
  //if it's not, how far off is it?
  const difference = Math.abs(guess - winningNum);

  if (difference === 0) {
    //win condition
    win = true;
    console.log("you got it!");
    return [win, lose];
  }

  if (difference <= 20 && difference > 10) {
    //guessedNum is within 20 of targetNum, either above or below
    document.getElementById("id2").style.visibility = "visible";
    console.log("getting warmer");
  }

  if (difference <= 10 && difference > 5) {
    //guessedNum is within 10 of targetNum, either above or below
    document.getElementById("id3").style.visibility = "visible";
    console.log("getting hotter");
  }

  if (difference <= 5 && difference > 0) {
    //guessedNum is within 5 of targetNum, either above or below
    document.getElementById("id4").style.visibility = "visible";
    console.log("screaming hot");
  }

  if (difference > 20) {
    //guessedNum is greater than 20 away from targetNum
    document.getElementById("id1").style.visibility = "visible";
    console.log("ice cold");
  }

  tryCounter += 1;

  if (tryCounter === 5) {
    lose = true;
  }

  console.log(
    "end of turn shows this win/loss: ",
    [win, lose],
    "tries so far: ",
    tryCounter
  );
  return [win, lose];
}
// tryGuess();

///////////////////// CLICK HINT /////////////////////
const hintButton = document.getElementById("hintButton");

hintButton.addEventListener("click", (event) => {
  event.preventDefault();

  //gives random numbers between 1 and winningNum for hintLower and between winningNum and 100 for hintHeigher

  const hintLower = Math.floor(Math.random() * winningNum);
  let hintHeigher = Math.ceil(Math.random() * winningNum + winningNum);

  if (hintHeigher > 100) {
    hintHeigher = 100;
  }

  document.getElementById("hint").style.visibility = "visible";
  document.getElementById(
    "hint"
  ).innerHTML = `When Hermes approached Argus, he thought he saw between ${hintLower} and ${hintHeigher} eyes open.`;
});
