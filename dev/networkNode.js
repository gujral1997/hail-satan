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
    const newTransaction = req.body
    const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction)
    res.json({note: `Transaction will be added in block ${blockIndex}`})
})

app.post('/transaction/brodcast', (req, res) => {
    const newTransaction = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient)
    bitcoin.addTransactionToPendingTransactions(newTransaction)

    const requestPromises = []
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTransaction,
            json: true
        }
        requestPromises.push(rp(requestOptions))
        Promise.all(requestPromises)
        .then(data=> {
            res.json({note: 'Transaction created and brodcast successfully'})
        })
    })
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

    const requestPromises = []
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/receive-new-block',
            method: 'POST',
            body: {newBlock},
            json: true
        }
        requestPromises.push(rp(requestOptions))
    })
    Promise.all(requestPromises)
    .then(data => {
        // mining reward
        const requestOptions = {
            uri: bitcoin.currentNodeUrl + '/transaction/brodcast',
            method: 'POST',
            body: {
                amount: 12.5,
                sender: '00',
                recipient: nodeAddress
            },
            json: true
        }
        return rp(requestOptions)
    })

    res.json({
        msg: "New Block mined successfully",
        newBlock
    })
})

app.post('/receive-new-block', (req, res)=>{
    const newBlock = req.body.newBlock
    const lastBlock = bitcoin.getLastBlock()
    const correctHash = lastBlock.hash === newBlock.previousBlockHash
    const correctIndex = lastBlock['index'] + 1 === newBlock['index']

    if(correctHash && correctIndex) {
        bitcoin.chain.push(newBlock)
        bitcoin.pendingTransactions = []
        res.json({
            note: 'New block received and accepted.',
            newBlock
        })
    } else {
        res.json({
            note: 'New block rejected.',
            newBlock
        })
    }
})

// registers a node and brodcasts it to the whole network
app.post('/register-and-broadcast-node', (req, res)=> { 
    const newNodeUrl = req.body.newNodeUrl
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1)
        bitcoin.networkNodes.push(newNodeUrl)

    const regNodesPromises = []

    // Todo: brodcasting it to the other newtworks
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        // register node
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: { newNodeUrl },
            json: true
        }

        regNodesPromises.push(rp(requestOptions))
    })

    Promise.all(regNodesPromises)
    .then(data=> {
        // use the data
        const bulkregisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: { allNetworkNodes: [ ...bitcoin.networkNodes, bitcoin.currentNodeUrl ] },
            json: true
        }

        return rp(bulkregisterOptions)
    })
    .then(data=> {
        res.json({ msg: 'New node registered with network successfully' })
    })
})

// register a node with the network
app.post('/register-node', (req, res)=> {
    const newNodeUrl = req.body.newNodeUrl
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl
    if(nodeNotAlreadyPresent && notCurrentNode)
        bitcoin.networkNodes.push(newNodeUrl)
    res.json({ msg: 'New node registered successfully' })
})

// register multiple nodes at once
app.post('/register-nodes-bulk', (req, res)=> {
    const allNetworkNodes = req.body.allNetworkNodes
    allNetworkNodes.forEach(networkNodeUrl=> {
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl
        if(nodeNotAlreadyPresent && notCurrentNode)
            bitcoin.networkNodes.push(networkNodeUrl)
    })
    res.json({ msg: 'Bulk regsitration successful'})
})

app.listen(port, ()=>console.log(`Listening on ${port}`))