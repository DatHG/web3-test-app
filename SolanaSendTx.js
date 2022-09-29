import {
  Transaction,
  SystemProgram,
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  sendAndConfirmRawTransaction,
  Ed25519Program,
  Message
} from '@solana/web3.js'

import bs58 from 'bs58'
import { sign } from '@noble/ed25519'
import nacl from 'tweetnacl'
/* ********************************************* */

/* CONST VALUE */
const secretKey = {
  sender:
    '2WkSmxpjsn6bPdH9BZWBrK7Hjoug1qj6XgiYaA6ZzDHBWhd7Ap1pdABFdo8jNiksMwPMgwkyqaAkXSaF1UkPwgWR',
  recipient:
    '3hUngHyynCvrfunKYL7GpXAP38wDF2ZmsMoSYMZWCPSZZ236hfNQ9ehiTXeeJkyKiWSXsHE5RdM6UvTGaNRs8MZ',
  phantom:
    '2WkSmxpjsn6bPdH9BZWBrK7Hjoug1qj6XgiYaA6ZzDHBWhd7Ap1pdABFdo8jNiksMwPMgwkyqaAkXSaF1UkPwgWR'
}

const keypairs = {
  sender: Keypair.fromSecretKey(bs58.decode(secretKey.sender)),
  recipient: Keypair.fromSecretKey(bs58.decode(secretKey.recipient)),
  phantom: Keypair.fromSecretKey(bs58.decode(secretKey.phantom))
}
const connection = new Connection('https://api.devnet.solana.com')
const solValueSend = 0.001

// SEND TRANSACTION

const transferSOL = async () => {
  try {
    const sender = keypairs.sender
    const recipient = keypairs.recipient

    console.log('****** STARTING TO SEND TRANSACTION ******')
    console.log(
      `Sender pre-balance: ${await connection.getBalance(sender.publicKey)}`
    )
    console.log(
      `Recipient pre-balance: ${await connection.getBalance(
        recipient.publicKey
      )}`
    )

    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: recipient.publicKey,
        lamports: LAMPORTS_PER_SOL * solValueSend
      })
    )
    const latestBlockhash = await connection.getLatestBlockhash()
    transferTransaction.recentBlockhash = latestBlockhash.blockhash
    transferTransaction.feePayer = sender.publicKey

    transferTransaction.sign(...[sender])

    const message = transferTransaction.compileMessage()
    // const b_message = bs58.encode(transferTransaction.serializeMessage())

    // console.log('Transaction message: ', b_message.toString('base64'))
    const signature = bs58.encode(transferTransaction.signature)
    // console.log('Transaction information: ', transferTransaction)
    console.log('Transaction signature: ', signature)

    const sentSignature = await sendAndConfirmTransaction(
      connection,
      transferTransaction,
      [sender]
    )
    console.log('Transaction sentSignature: ', sentSignature)
    // console.log(
    //   `Sender post-balance: ${await connection.getBalance(sender.publicKey)}`
    // )
    // console.log(
    //   `Recipient post-balance: ${await connection.getBalance(
    //     recipient.publicKey
    //   )}`
    // )
    console.log('****** SUCCESSFULLY SEND TRANSACTION ******')
  } catch (error) {
    console.error('Fail to send solana transaction: ', error)
  }
}

// transferSOL()

// console.log(
//   `Sender post-balance: ${await connection.getBalance(
//     keypairs.sender.publicKey
//   )}`
// )

const signMessage = async (message) => {
  try {
    message = new TextEncoder().encode(message)
    const signature = nacl.sign.detached(message, keypairs.phantom.secretKey)
    console.log(bs58.encode(signature))
    const result = nacl.sign.detached.verify(
      message,
      signature,
      keypairs.phantom.publicKey.toBytes()
    )
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

// signMessage('Hello, world!')

const createNewTransaction = async () => {
  const sender = keypairs.sender
  const recipient = keypairs.recipient

  let transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: recipient.publicKey,
      lamports: LAMPORTS_PER_SOL * solValueSend
    })
  )

  transaction.feePayer = sender.publicKey

  const latestBlockhash = await connection.getLatestBlockhash()

  transaction.recentBlockhash = latestBlockhash.blockhash
  transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight

  return transaction
}

const solve = async () => {
  const transaction = await createNewTransaction()
  const serializeTransaction = transaction.serialize({
    requireAllSignatures: false
  })

  const encodeTransaction = bs58.encode(serializeTransaction)
  // const encodeTransaction =
  //   '3md7BBV9wFjYGnMWcMNyAZcjca2HGfXWZkrU8vvho66z2sJMZFcx6HZdBiAddjo2kzgBv3uZoac3domBRjJJSXkbBvokxT2ACknZWya4Cjn9QsBPRcSrZdX7yZ1seZrPAVmT2UUfGjf7Q9onKBzuJ47iYJqAPnnqUEVYyUkXuuLnk93S91J33P8diWkBvevaZ9A4P1R87SqqCD99HuMWetPtzT8g3VXWeL6JBkvhYizJdWLo4xVSVgorRUZLvMpV3uZZqgvDLzo7AiSCmquYQiwjKnM68EemnVGo9'
  const decodeTransaction = bs58.decode(encodeTransaction)

  const newTransaction = Transaction.from(decodeTransaction)
  // newTransaction.sign(keypairs.sender)

  // console.log('transaction', transaction)
  // console.log('serializeTransaction', serializeTransaction)
  // console.log('encodeTransaction', encodeTransaction)
  // console.log('decodeTransaction', decodeTransaction)
  console.log('newTransaction', newTransaction)
  // console.log('signature', bs58.encode(newTransaction.signatures[0].signature))
}

solve()


