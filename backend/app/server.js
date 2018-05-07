const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const user = {
  name: "gleb",
  hobby: "eating"
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(user);
})

app.post('/hui', (req, res) => {
  console.log(req.body);
  const user = {
    name: "gleb",
    hobby: "eating"
  }

  res.send(req.body);
})

app.listen(3050);
