const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')

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
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
            },
            'secret123'
        )

        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.get('/api/video', async (req, res) => {

    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email: email })
        return res.json({ status: 'ok', quote: user.video })
    }
    catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }

})

app.post('/api/video', async (req, res) => {

    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        await User.updateOne(
            { email: email },
             {$set: { video: req.body.video} }
        )
        return res.json({ status: 'ok' })
    }
    catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }

})

app.listen(3001, () => {
    console.log('Server started on 3001')
})