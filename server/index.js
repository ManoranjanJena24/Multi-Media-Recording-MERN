const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')

app.use(cors())
app.use(express.json()) //tells express that we need to parse anything that we get in the body to a JSON

// mongoose.connect('mongodb://localhost:27017/mernStack')
mongoose.connect('mongodb://127.0.0.1:27017/VideoRecorder')

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.on('open', () => {
    console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({ status: 'ok' })
    } catch (err) {
        console.log(err)
        res.json({ status: 'error', error: 'Duplicate email' })
    }

})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if (user) {
        // const token = jwt.sign({
        //     name: req.body.name,
        //     email: req.body.email,
        // }, 'secret123')
        return res.json({ status: 'ok', user: true })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.listen(3001, () => {
    console.log('Server started on 3001')
})