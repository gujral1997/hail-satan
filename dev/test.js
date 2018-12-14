const Blockchain = require('./blockchain')

const bitcoin = new Blockchain()

bitcoin.createNewBlock( 123, 'OIN', 'aa')
bitcoin.createNewTransaction( 1232, 'rwe', 'aaq')
bitcoin.createNewTransaction( 1232, 'rwe', 'aaq')
bitcoin.createNewTransaction( 1232, 'rwae', 'aaaq')
bitcoin.createNewBlock( 123, 'OIN', 'aa')

console.log(bitcoin)