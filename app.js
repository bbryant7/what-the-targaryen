const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(expressValidator());


let content = {
 charOptions: [{
    name: 'Jon',
    // imgsource: './images/jon.gif',
    // isalive: 'alive'
  },
  {
    name: 'Arya',
    // imgsource: './images/arya.gif',
    // isalive: 'alive'
  },
  {
    name: 'Tyrion',
    // isalive: 'alive'
  },
  {
    name: 'Daenerys',
    // isalive: 'alive'
  },
  {
    name: 'Sansa',
    // isalive: 'alive'
  },
  {
    name: 'Joffrey',
    // isalive: 'dead af'
  },
  {
    name: 'Jamie',
    // isalive: 'alive'
  }
]
}

let roundDetails =
{activeGame: true, word: 'Devon', letters: [], guessedLetters: []}

// store the word in a session
// req.session.roundDetails = roundDetails;


app.get('/', function(req, res) {
  // generate random word
  let round = content.charOptions[Math.floor(Math.random() * content.charOptions.length)].name;
  roundDetails.word = round.toUpperCase();
  console.log('roundDetails.word', roundDetails.word);
  roundDetails.letters = roundDetails.word.split('')
  console.log(roundDetails.letters);
  res.render('game', {roundDetails: roundDetails});
  console.log('the word this round is ' + round);
})

app.post('/handler', function(req, res){
  // letter can be uppercase or lowercase
  let guess = req.body.guess.toUpperCase();
  console.log('guess is ',guess);
  // if a user enters more than one letter generate invalid error message "try again"
  req.checkBody('guess', 'please enter one letter at a time').isByteLength({min: 1, max: 1});
  req.checkBody('guess', 'please enter letters only').isAlpha();
  req.checkBody('guess', 'please enter a letter').notEmpty();
  console.log();
// form should be validated to make sure only one letter is sent
  let errors = req.validationErrors();
  if (errors) {
    let html = errors;
    res.send(html);
  } else {
    // for loop to compare guess to letters array
    for (var i = 0; i < roundDetails.letters.length; i++) {
      if (roundDetails.letters[i] == guess){
        roundDetails.guessedLetters.push(guess)
      }
    }
    let html = 'your guess is: ' + guess;
    res.render('game', {roundDetails: roundDetails});
  }

})


app.listen(3000, function() {
  console.log('you did it, or something');
})


/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//
// let user know if their guess appears in the word - if correct
// if exists then do things
// tell user it is correct
// make letter visible to user
// store users guess in session
// display partially guessed word
// display dashes that have not been guessed
// user is allowed 8 guesses
// remind user of how many guesses they have left after each round
// guesses left is determined by what is stored in session - get session to keep count
// a user loses a guess when they guess incorrectly but not if they guess correctly or if they guess the same letter twice
// instead display a message letting them know they already guessed that letter and ask them to try again
// game ends when user constructs the full word or runs out of guesses
// if a player runs out of guesses reveal whole word and display that they lost
// when game ends ask if they want to play again
//
//
