const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs')


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

  db.select('email','hash').from('login')
  .where('email','=',email)
  .then(data => {
    const isValid = bcrypt.compareSync(password,data[0].hash);
    if (isValid) {
      return db.select('*').from('users')
      .where('email','=',email)
      .then(user => {
        res.json(user[0])
      })
      .catch(err => res.status(400).json('unable to get user'))
    } else {
      res.status(400).json('unable to signin')
    }
  })
  .catch(err => res.status(400).json('unable to signin'))
})

app.post('/findface', (req, res) => {
  const { email } = req.body;
  db('users').where('email', '=', email)
  .increment('entries',1)
  .returning('entries')
  .then(entries => {
    if (entries.length) {
      res.json(entries[0]);
    } else {
      res.status(400).json('no such user');
    }

  })
  .catch(err => res.status(400).json('error getting user'))
})


app.post('/register', (req, res) => {

  const { name, email, password} = req.body;
  const hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
      .returning('*')
      .insert({
        name: name,
        email: loginEmail[0],
        joined: new Date()
      })
      .then(user => {
        res.json(user[0]);
      })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to register'))





})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({
    id: id
  })
  .then(user => {
    if (user.length) {
      res.json(user[0])
    } else {
      res.status(400).json('user not found');
    }
  })
  .catch(err => res.status(400).json('error getting user'))

  })


app.listen(3050, () => console.log('Example app listening on port 3050!'))
