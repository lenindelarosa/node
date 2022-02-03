const { response } = require('express');
const express = require('express');

const app = express();
app.use(express.json());

const database = {
    users: [
        {
            id: '123',
            name: 'Miguel',
            email: 'Miguel@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Lenin',
            email: 'Lenin@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res)=>{
    res.send('<h1>This is working!</h1>')
})

app.post('/signin', (req,res)=>{
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
                res.json('Logged in!')
    } else {
        res.json('Wrong username/password');
    }
    res.json('The signin works!');
})

app.post('/register', (req, res)=>{
    if (req.body.email && req.body.name && req.body.password){
        database.users.push({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json(database.users[2]);
        console.log(database.users[2]);
    } else {
        res.send("Some information is missing.")
    }
    res.send('<h1>This is working!</h1>')
})

app.listen(3000, ()=> {
    console.log('App is running on port 3000.');
})

/*
/ --> rees = this is working
/ signin --> POST = success/fail
/ register --> POST = user
/ profile/:userID --> GET = user
/image --> PUT --> user

*/