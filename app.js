const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

app.engine('mustache',mustacheExpress());
app.set('views','./views');
app.set('view engine','mustache');
app.use(bodyParser.urlencoded({
  extended:false
}))


let charOptions = [
  {name: 'Jon Snow',
  imgsource: './images/jon.gif',
  isalive: 'alive'
},

]



app.listen(3000, function() {
  console.log('you did it, or something');
})
