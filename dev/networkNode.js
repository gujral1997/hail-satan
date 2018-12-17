const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Blockchain = require('./blockchain')
const uuid = require('uuid/v1')
const port = process.argv[2]
const rp = require('request-promise')

const nodeAddress = uuid().split('-').join('')

const bitcoin = new Blockchain()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/blockchain', (req, res)=> {
    res.send(bitcoin)
})

app.post('/transaction', (req, res)=> {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
    res.json({ note: `Transaction will be added in block ${blockIndex}` })
})

app.get('/mine', (req, res)=> {
    const lastBlock = bitcoin.getLastBlock()
    const previousBlockHash = lastBlock['hash']
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    }
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData)
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce)

    bitcoin.createNewTransaction(10, '00', nodeAddress)

    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)

    res.json({
        msg: "New Block mined successfully",
        newBlock})
})

// registers a node and brodcasts it to the whole network
app.post('/register-and-brodcast-node', (req, res)=> { 
    const newNodeUrl = req.body.newNodeUrl
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1)
        bitcoin.networkNodes.push(newNodeUrl)

    const regNodesPromises = []

    // Todo: brodcasting it to the other newtworks
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        // register node
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: post,
            body: { newNodeUrl },
            json: true
        }

        regNodesPromises.push(rp(requestOptions))
    })

    Promise.all(regNodesPromises)
    .then(data=> {
        // use the data
    })
})

// register a node with the network
app.post('/register-node', (req, res)=> {

})

// register multiple nodes at once
app.post('/register-nodes-bulk', (req, res)=> {

})

app.listen(port, ()=>console.log(`Listening on ${port}`))