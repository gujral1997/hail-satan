const Blockchain = require('./blockchain')
const bitcoin = new Blockchain()

const bc1 = {
    "chain": [
        {
            "index": 1,
            "timestamp": 1546098728932,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "previousBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1546098750471,
            "transactions": [],
            "nonce": 18140,
            "hash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
            "previousBlockHash": "0"
        },
        {
            "index": 3,
            "timestamp": 1546098751797,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "b2c2d3300b8111e99156af2a74831e19",
                    "transactionId": "bf9dd7300b8111e99156af2a74831e19"
                }
            ],
            "nonce": 18600,
            "hash": "0000cb3204c7413b6263e128fd8f79595f9630a9fc4b6f7ac67f6ff8588956bf",
            "previousBlockHash": "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
        },
        {
            "index": 4,
            "timestamp": 1546098824245,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "b2c2d3300b8111e99156af2a74831e19",
                    "transactionId": "c0645b800b8111e99156af2a74831e19"
                },
                {
                    "amount": 500,
                    "sender": "NAqwSLOHLKHDSLAKLAS",
                    "transactionId": "db805c200b8111e99156af2a74831e19"
                },
                {
                    "amount": 20,
                    "sender": "NAqwSLOHLKHDSLAKLAS",
                    "transactionId": "e0dd7f900b8111e99156af2a74831e19"
                },
                {
                    "amount": 30,
                    "sender": "NAqwSLOHLKHDSLAKLAS",
                    "transactionId": "e2d94f900b8111e99156af2a74831e19"
                }
            ],
            "nonce": 47523,
            "hash": "000014c24340dee6ed4a1e881b40a268e525bdc4c6c9797927236044d43e8a35",
            "previousBlockHash": "0000cb3204c7413b6263e128fd8f79595f9630a9fc4b6f7ac67f6ff8588956bf"
        },
        {
            "index": 5,
            "timestamp": 1546098865731,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "b2c2d3300b8111e99156af2a74831e19",
                    "transactionId": "eb92e4700b8111e99156af2a74831e19"
                },
                {
                    "amount": 40,
                    "sender": "NAqwSLOHLKHDSLAKLAS",
                    "transactionId": "f51fcee00b8111e99156af2a74831e19"
                },
                {
                    "amount": 50,
                    "sender": "NAqwSLOHLKHDSLAKLAS",
                    "transactionId": "f7d6b1800b8111e99156af2a74831e19"
                },
                {
                    "amount": 60,
                    "sender": "NAqwSLOHLKHDSLAKLAS",
                    "transactionId": "f9f6ab500b8111e99156af2a74831e19"
                },
                {
                    "amount": 70,
                    "sender": "NAqwSLOHLKHDSLAKLAS",
                    "transactionId": "fca26a600b8111e99156af2a74831e19"
                }
            ],
            "nonce": 26980,
            "hash": "000093a1db5347e21b79fbeff134cced583b2a88aeadee717d5e8ce941a32f4d",
            "previousBlockHash": "000014c24340dee6ed4a1e881b40a268e525bdc4c6c9797927236044d43e8a35"
        },
        {
            "index": 6,
            "timestamp": 1546098867058,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "b2c2d3300b8111e99156af2a74831e19",
                    "transactionId": "044d27500b8211e99156af2a74831e19"
                }
            ],
            "nonce": 85290,
            "hash": "000043e0e708baadf27591a586c83e3e9ee24b7a8067ea3e2f27f668f1027aca",
            "previousBlockHash": "000093a1db5347e21b79fbeff134cced583b2a88aeadee717d5e8ce941a32f4d"
        },
        {
            "index": 7,
            "timestamp": 1546098867956,
            "transactions": [
                {
                    "amount": 12.5,
                    "sender": "00",
                    "recipient": "b2c2d3300b8111e99156af2a74831e19",
                    "transactionId": "0517a3400b8211e99156af2a74831e19"
                }
            ],
            "nonce": 33794,
            "hash": "000009ca9ab09d06511393b797e0f7c144fbf95acc17e6db245c99f68a726af8",
            "previousBlockHash": "000043e0e708baadf27591a586c83e3e9ee24b7a8067ea3e2f27f668f1027aca"
        }
    ],
    "pendingTransactions": [
        {
            "amount": 12.5,
            "sender": "00",
            "recipient": "b2c2d3300b8111e99156af2a74831e19",
            "transactionId": "05a0a9600b8211e99156af2a74831e19"
        }
    ],
    "networkNodes": [],
    "currentNodeUrl": "http://localhost:3001"
}

console.log('VALID: ', bitcoin.chainIsValid(bc1.chain))