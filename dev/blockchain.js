function Blocakchain() {
    this.chain = []
    this.pendingTransactions = []
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

Blocakchain.prototype.hashBlock = function(blockData) {
    
}

module.exports = Blocakchain
