import {
  createMint,
  mintTo,
  getOrCreateAssociatedTokenAccount,
  transfer
} from '@solana/spl-token'

import { getWalletFromPhrase, airDropK2, viewAllTokens } from './K2Utils.js'

import { connection } from './K2Constant.js'

import { validateMnemonic } from 'bip39'

const recoveryPhrases = {
  sender:
    'panic filter evolve hold job body horse entire slam outside bread match',
  recipient:
    'color body merge rural token pole capable people metal student catch uphold'
}

console.log(validateMnemonic(recoveryPhrases.recipient))

const sender = await getWalletFromPhrase(recoveryPhrases.sender)
const recipient = await getWalletFromPhrase(recoveryPhrases.recipient)

// console.log(recipient.publicKey.toBase58())
/* AIRDROP K2 for sender account */
// console.log(
//   'pre-balance recipient: ',
//   await connection.getBalance(recipient.publicKey)
// )
// await airDropK2(recipient,30)
// // await airDropK2(recipient)
// console.log(
//   'post-balance recipient: ',
//   await connection.getBalance(recipient.publicKey)
// )

// /* Create new token mint */
// const mint = await createMint(connection, sender, sender.publicKey, null, 9)

// console.log(mint.toBase58())
// /* Get the token account of the sender address, and if it does not exist, create it */
// const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
//   connection,
//   sender,
//   mint,
//   sender.publicKey
// )

// /* Get the token account of the recipient address, and if it does not exist, create it */
// const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
//   connection,
//   recipient,
//   mint,
//   recipient.publicKey
// )

// // Mint 10 new token to the "senderTokenAccount" account we just created
// let signature = await mintTo(
//   connection,
//   sender,
//   mint,
//   senderTokenAccount.address,
//   sender.publicKey,
//   15000000000
// )
// console.log('mint tx:', signature)

// // Transfer the new token to the "toTokenAccount" we just created
// signature = await transfer(
//   connection,
//   sender,
//   senderTokenAccount.address,
//   recipientTokenAccount.address,
//   sender.publicKey,
//   5000000000
// )

// await viewAllTokens(sender)
// await viewAllTokens(recipient)
