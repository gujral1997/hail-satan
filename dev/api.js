const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/blockchain', (req, res)=> {
    
})

app.post('/transaction', (req, res)=> {
    console.log(req.body)
    res.send('It works')
})

app.get('/mine', (req, res)=> {

})

app.listen(3000, ()=>console.log('listening on 3000'))