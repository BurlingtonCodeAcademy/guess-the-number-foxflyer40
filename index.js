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
// initialize game variables
let highNum = 100;
let lowNum = 1;
let lastGuessed = 0;
let humanAnswer = "";

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  // Now try and complete the program.

  // create game loop
  while (humanAnswer !== "y") {
    // Guess number and ask human to confirm guess
    lastGuessed = newGuessed
    let newGuessed = randomInt(highNum, lowNum);
    humanAnswer = await ask("Is your number " + newGuessed + "?\n");
    console.log("\n");

    // respond to Y/N - quit if Y ask high or low if N -
    if (humanAnswer === "y") {
      console.log(
        "YIPEE !!!\nYou picked " + secretNumber + "\nI guessed " + newGuessed
      );
      // track value of variables
      console.log(humanAnswer + " = humanAnswer");
      console.log(highNum + " = highNum value");
      console.log(lowNum + " = lowNum value");
      console.log(newGuessed + " = newGuessed");
      console.log(lastGuessed + " = lastGuessed");
      process.exit();
    } else {
      let highLowIn = await ask(
        "Is your number higher or lower than my guess?\n(Please enter H or L)\n"
      );
      // if H store guess as lowNum if L store guess as Hi num
      if (highLowIn === "h") {
        lowNum = newGuessed;
          } else if (highLowIn === "l") {
        highNum = newGuessed;
         } else {
      console.log("I don't think so Buster.\n");
      }
      // track value of variables
      console.log(humanAnswer + " = humanAnswer");
      console.log(highLowIn + " = highLowIn");
      console.log(highNum + " = highNum value");
      console.log(lowNum + " = lowNum value");
      console.log(newGuessed + " = newGuessed");
      console.log(lastGuessed + " = lastGuessed");
      console.log("\nOk.  Let's see.... Hmmm...");
    }
  }
  process.exit();
}
