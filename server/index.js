const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json()) //tells express that we need to parse anything that we get in the body to a JSON

app.get('/',(req,res)=>{
    res.send('hello world!')
})

// app.post('/api/register', async (req,res)=>{
app.post('/api/register', (req,res)=>{
    console.log(req.body)
    res.json({status:'ok'})
})

app.listen(3001,()=>{
    console.log('Server started on 3001')
})