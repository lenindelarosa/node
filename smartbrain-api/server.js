const { response } = require('express');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register');

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

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid){
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user.'))
            } else {
                res.status(400).json('Wrong username/password combination.')
            }
        })
        .catch(err => res.status(400).json('Wrong username/password combination.'))
})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('users').where({id})
        .then(user => {
            if(user.length){
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
            
        })
        .catch(err => res.status(400).json('Error getting user'));
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries)
        })
        .catch(err => res.status(400).json('Unable to get entries count.'))
})

app.listen(3000, () => {
    console.log('App is running on port 3000.');
})
