const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const findface = require('./controllers/findface');

const db = knex({
  client: 'pg',
  connection: {
    host : 'db',
    user : 'postgres',
    password : '',
    database : 'postgres'
  }
})

app.use(cors());
app.use(bodyParser.json());

app.post('/signin', (req, res) => {
  signin.hangleSignin(req,res,bcrypt,db)
})


app.post('/register', (req, res) => {
  register.handleRegister(req,res,bcrypt,db);
})

app.post('/findface', (req, res) => {
  findface.handleFindFace(req,res,db)
})

app.post('/imageurl', (req, res) => {
  findface.handleApiCall(req,res)
})


app.listen(3050, () => console.log('Example app listening on port 3050!'))
