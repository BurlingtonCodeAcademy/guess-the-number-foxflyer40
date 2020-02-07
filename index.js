const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//random number generator
function randomInt(maxNum, minNum) {
  return Math.floor(minNum + Math.random() * (maxNum - minNum + 1));
}

start();
// initialize global game variables
let highNum = 100;
let lowNum = 1;
let humanAnswer = "";
let numberOfTries = 0
let humanTricks = 0


async function start() {
  console.log(
    "Let's play a game where you (human) pick a secret number between 1 and 100 and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);

  // create game loop
  while (humanAnswer !== "y") {

    // create new guess and rectify if = high or low range
    let newGuessed = randomInt(highNum, lowNum);
    if (newGuessed === highNum) {
      newGuessed -= 1
    }
    if (newGuessed === lowNum) {
      newGuessed += 1
    }
    // iterate number of tries
    numberOfTries += 1
    // Guess number and ask human to confirm guess
    humanAnswer = await ask("Is your number " + newGuessed + "?\n");
    // respond to Y/N - quit if Y ask high or low if N -
    if (humanAnswer === "y") {
      console.log("YIPEE !!!\nI guessed it in " + numberOfTries + " tries!");
      if (humanTricks >= 1) {
        console.log("(However, you tried to trick me " + humanTricks + " times.)\nSad.")
      }
      process.exit();
    } else if (humanAnswer !== "n") {
      // do this if human cannot follow instructions
      console.log("Please answer 'y' or 'n'\nLet's try again...")
      humanTricks += 1
    } else {
      let highLowIn = await ask(
        "Is your number higher or lower than " + newGuessed + "?\n(Please enter H or L)\n"
      );
      // if H, store guess as lowNum - if L, store guess as highNum 
      if (highLowIn === "h") {
        lowNum = newGuessed;
      } else if (highLowIn === "l") {
        highNum = newGuessed;
        // do this if human cannot follow instructions
      } else {
        console.log("I don't think so Buster.\nTry again...");
        humanTricks += 1
      }

      //ask again
      console.log("\nOk.  Let's see.... Hmmm...");
    }
  }
  process.exit();
}
