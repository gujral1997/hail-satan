function Blocakchain() {
    this.chain = []
    this.newTransactions = []
}

Blocakchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.newTransactions,
        nonce,
        hash,
        previousBlockHash
    }

    this.newTransactions = []
    this.chain.push(newBlock)

    return newBlock
}

Blocakchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1]
}

// module.exports = Blocakchain
