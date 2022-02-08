const { response } = require('express');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin  = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
})


// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('Success!');
})

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res, db) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req,res) => { image.handleImage (req, res, db) });

app.listen(3000, () => {
    console.log('App is running on port 3000.');
})
