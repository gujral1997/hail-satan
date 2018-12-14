const Blockchain = require('./blockchain')
const bitcoin = new Blockchain()

const previousBlockHash = 'oiuahf0ateiueros'
const currentBlockData = [
    {
        amount: 10,
        sender: 'aihdyakdjdskj',
        recipient: 'aihdyakdjdsaj'
    },
    {
        amount: 110,
        sender: 'aaadyakdjdskj',
        recipient: 'sshdyakdjdsaj'
    },
    {
        amount: 120,
        sender: 'aaadyakd4dskj',
        recipient: 'sshdyfkdjdsaj'
    }
]

console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, bitcoin.proofOfWork(previousBlockHash, currentBlockData)))
