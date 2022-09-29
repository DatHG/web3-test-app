import { recipient, sender } from "./constant.js";
import { fetchNFTs, transferNFT, getMintInfo } from "./utils.js";
import base58 from 'bs58'

const senderNFTs = await fetchNFTs(sender.publicKey)
const recipientNFTs = await fetchNFTs(recipient.publicKey)

console.log('pre-senderNFTs: ', senderNFTs)
// console.log('pre-senderNFTs: ', recipientNFTs)

// await transferNFT(
//   sender,
//   'FnXwWLV7pvbDYVP5cnAd4dyRJ5zyqt7i26LBrVdM226v',
//   senderNFTs[0],
//   1
// )
// await transferNFT(
//   recipient,
//   '3TRUskCaisjqhV3k4tdB4HB8xtGwJPeVzVXEzBFquTHi',
//   // recipientNFTs[0],
//   '83tjGEsF6wDwd7GtQdnqw5z5wcpKDEZLCN6341xeroyc',
//   1
// )

await getMintInfo(sender)
// await getMintInfo(sender)
// console.log(recipient)
// console.log('senderNFTs: ', senderNFTs)
// console.log('recipientNFTs: ', recipientNFTs)