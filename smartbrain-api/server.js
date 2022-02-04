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
    res.send(database.users);
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
    const { name, email, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.send(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res)=>{
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            res.json(user);
            found = true;
        } 
    })
    if (!found){
        res.status(404).json('No such user!');
    }
})

app.post('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            //res.json(user);
            found = true;
            user.entries++;
            return res.json(user.entries);
        } 
    })
    if (!found){
        res.status(404).json('No such user!');
    }
})

app.listen(3000, ()=> {
    console.log('App is running on port 3000.');
})
