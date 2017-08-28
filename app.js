const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({
  extended: false
}))

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


console.log(content.charOptions[Math.floor(Math.random() * content.charOptions.length)].name);


app.get('/', function(req, res) {
  let round = content.charOptions[Math.floor(Math.random() * content.charOptions.length)].name
  res.render('game', content);
})

app.listen(3000, function() {
  console.log('you did it, or something');
})
