const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')

const database = {
  users: [{
    id: '123',
    name: 'Andrei',
    email: 'john@gmail.com',
    password: 'cookies',
    entries: 0,
    joined: new Date()
  }],
  secrets: {
    users_id: '123',
    hash: 'wghhh'
  }
}

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'))

app.post('/signin', (req, res) => {
  const {email, password} = req.body;
  if (email === database.users[0].email && password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.json('access denied');
  }
})

app.post('/findface', (req, res) => {
  database.users.forEach(user => {
    if (user.email === req.body.email) {
      console.log('true')
      user.entries++
      res.json(user)
    }
  });
})


app.post('/register', (req, res) => {
  database.users.push({
    id: '124',
    name: req.body.name,
    email: req.body.email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1])
})

app.get('/profile/:userId', (req, res) => {
  database.users.forEach(user => {
    if (user.id === req.params.userId) {
      return res.json(user);
    }
  })
  // res.json('no user')

})

app.listen(3050, () => console.log('Example app listening on port 3050!'))
