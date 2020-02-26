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

// calculate guessed number
function calcInt(maxNum, minNum) {
  return Math.floor(((maxNum - minNum) / 2) + minNum)
}

start();

async function start() {
  // initialize global game variables
  let highNum = 100;
  let lowNum = 0;
  let humanAnswer = "";
  let numberOfTries = 0
  let humanTricks = 0
  console.log("\nLet's play a game where you (human),\npick a secret number between 1 and 100,\nand I (computer) try to guess it.\nOK?\n");
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
console.log(highNum) + '1';
console.log(lowNum);

  // create game loop OR error out if non number, decimal number or number out of range is entered
  if ((secretNumber % 1 === 0) && (secretNumber >= lowNum && secretNumber <= highNum)) {
    console.log("\nYou entered: " + secretNumber + "\n(Which I TOTALLY can't see!)\n");
  } else {
    console.log("\n\nI am sorry that is not a valid entry.\n(Decimals and letters are not allowed.)\nWhen you are ready to play:\n- Restart the game\n- Then enter a Number between " + lowNum + " and " + highNum + "...\n");
    humanAnswer = "y"
  }

  while (humanAnswer !== "y") {
    console.log(highNum) + '2';
    console.log(lowNum);
    // create new guess + rectify if = high or low number + iterate number of tries
    let newGuessed = calcInt(highNum, lowNum);
    if (newGuessed === highNum) {
      newGuessed -= 1
    }
    if (newGuessed === lowNum) {
      newGuessed += 1
    }
    numberOfTries += 1

    // Guess number and ask human to confirm guess
    humanAnswer = await ask("Is your number " + newGuessed + "?\nPlease enter y or n\n");

    // print win message and exit if Y 
    if (humanAnswer === "y") {
      console.log("YIPEE !!!\nYour number is " + newGuessed + "\nI guessed it in " + numberOfTries + " tries!");
      // if the human did not give good input add this line
      if (humanTricks >= 1) {
        console.log("(MAYBE you made a mistake here and there,\nHowever, I think you tried to trick me " + humanTricks + " times.)\nSad.")
      }
      process.exit();
    } else if (humanAnswer !== "n") {  // verify "n" answer AND check for wrong input with !==n
      // error message and re-guess if NOT n + iterate humanTricks counter
      console.log("\nUh-O!\nPlease use h or l only.\nLet me guess again...\n")
      humanTricks += 1
    } else {
      // n input verified, ask if guess is higher or lower than secretNumber
      /* if H, store guess as lowNum  -OR- 
        if L, store guess as highNum -OR- 
        if entry is not H or L give error message and re-guess */
      let highLowIn = await ask("Is your number higher or lower than " + newGuessed + "?\n(Please enter h or l)\n")
      if (highLowIn === "h") {
        lowNum = newGuessed;
      } else if (highLowIn === "l") {
        highNum = newGuessed;
        // error message if human cannot follow instructions + iterate humanTricks counter
      } else {
        console.log("\nOOPSIE!\nYou need to use h or l only\nLet me guess again...\n");
        humanTricks += 1
      }
      //Guess again
      console.log("\nOk.  Let's see.... Hmmm...");
    }

  }
  process.exit();
}
