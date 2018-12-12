const Blockchain = require('./blockchain')

const bitcoin = new Blockchain()

bitcoin.createNewBlock( 123, 'OIN', 'aa')
bitcoin.createNewBlock( 1232, 'rwe', 'aaq')
bitcoin.createNewBlock( 12323, 'OewIN', 'aaweq')

console.log(bitcoin)