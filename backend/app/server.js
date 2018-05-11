const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var knex = require('knex')


const db = knex({
  client: 'pg',
  connection: {
    host : 'db',
    user : 'postgres',
    password : '',
    database : 'postgres'
  }
})

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
      user.entries++
      res.json(user)
    }
  });
})


app.post('/register', (req, res) => {

  const { name, email, password} = req.body;

  console.log('register',name, email, password);

  db('users')
  .returning('*')
  .insert({
    name: name,
    email: email,
    joined: new Date()
  })
  .then(user => {
    res.json(user[0]);
  })
  .catch(err => res.status(400).json('unable to register'))
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
