const sha256 = require('sha256')
const currentNodeUrl = process.argv[3]

function Blocakchain() {
    this.chain = []
    this.pendingTransactions = []
    this.networkNodes = []
    this.currentNodeUrl = currentNodeUrl
    this.createNewBlock(0,'0', '0')
}

// To mine a new block

Blocakchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce,
        hash,
        previousBlockHash
    }

    this.pendingTransactions = []
    this.chain.push(newBlock)

    return newBlock
}

// All the pending transactions before mining

Blocakchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    const newTransaction = {
        amount,
        sender,
        recipient
    }

    this.pendingTransactions.push(newTransaction)

    return this.getLastBlock()['index'] + 1
}

// To get info about last block

Blocakchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1]
}

// to generate hash

Blocakchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
    const hash = sha256(dataAsString)
    return hash
}

Blocakchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
    let nonce = 0
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
    while (hash.substring(0, 4)!== '0000') {
        nonce++
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce)
    }

    return nonce
}

module.exports = Blocakchain
