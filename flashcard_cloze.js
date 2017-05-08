var ClozeCard = require("./cloze_constructor.js");
var cardData = require("./cloze.json");
var inquirer = require("inquirer");


console.log(`
+
+
+       ███████╗████████╗██╗   ██╗██████╗ ██╗   ██╗    ████████╗██╗███╗   ███╗███████╗             
+       ██╔════╝╚══██╔══╝██║   ██║██╔══██╗╚██╗ ██╔╝    ╚══██╔══╝██║████╗ ████║██╔════╝                         
+       ███████╗   ██║   ██║   ██║██║  ██║ ╚████╔╝        ██║   ██║██╔████╔██║█████╗                                          
+       ╚════██║   ██║   ██║   ██║██║  ██║  ╚██╔╝         ██║   ██║██║╚██╔╝██║██╔══╝  
+       ███████║   ██║   ╚██████╔╝██████╔╝   ██║          ██║   ██║██║ ╚═╝ ██║███████╗
+       ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝    ╚═╝          ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝
+
+
`);

startReview();

function startReview() {
 
  var currentCard;
  var cardArray = [];

  var score = 0;
  var index = 0;

  for (var i = 0; i < cardData.length; i++) {
    currentCard = new ClozeCard(cardData[i].partial, cardData[i].cloze);
    cardArray.push(currentCard);
  }

  playRound(score, cardArray, index);
}

function endReview(score, cardArray) {
  
  console.log("Review Over");
  console.log("You got ", score, "out of ", cardArray.length);
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: "Keep Studying?"
  }]).then(function(answer) {
   
    if (answer.text.toLowerCase() === "yes") {
      
      startReview();
    } 
    else {

      console.log("\nThanks for using Study Time");
      console.log("Until next time!");
    }
  });
}

function playRound(currentScore, cardArray, currentIndex) {
  
  if (currentIndex < cardArray.length) {
    promptUser(cardArray, currentIndex, currentScore);
  }
 
  else {
    endReview(currentScore, cardArray);
  }
}

function promptUser(cardArray, currentIndex, currentScore) {
 
  var card = cardArray[currentIndex];
 
  inquirer.prompt([{
    type: "input",
    name: "text",
    message: card.partial + "\nAnswer:"
  }]).then(function(answer) {
   
    if (answer.text.trim().toLowerCase() === card.cloze.trim().toLowerCase()) {
      
      currentScore++;
      console.log("\nCORRECT");
    }
    else {

      console.log("\nIncorrect!");
    }
    
    console.log(card.displayCard());
    
    currentIndex++;
    
    console.log("-------------------------");
    
    playRound(currentScore, cardArray, currentIndex);
  });
}