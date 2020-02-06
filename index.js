const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//random number generator
function randomInt(maxNum,minNum){
    return Math.floor(minNum + (Math.random() * (maxNum - minNum + 1)))
}


start();
// initialize game variables
let HighNum = 5
let LowNum = 1
let numGuessed = randomInt(HighNum, LowNum)


async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  // Now try and complete the program.

 // ask human to confirm guess
 let humanAnswer = await ask("Is your number " + numGuessed + "?\n")
console.log(humanAnswer)
 
if (humanAnswer === "y") {
  console.log("YIPEE !!!\nYou picked " + secretNumber +"\nI guessed " + numGuessed)
} 
 
 
    process.exit();
}
