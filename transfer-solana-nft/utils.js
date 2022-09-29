import {
  TOKEN_PROGRAM_ID,
  getMint,
  getOrCreateAssociatedTokenAccount,
  transfer,
  getAccount,
  createSetAuthorityInstruction,
  ASSOCIATED_TOKEN_PROGRAM_ID
} from '@solana/spl-token'
import {
  Keypair,
  PublicKey,
  SystemProgram,
  SystemInstruction
} from '@solana/web3.js'

import { mnemonicToSeedSync } from 'bip39'
import { derivePath } from 'ed25519-hd-key'

import { connection } from './constant.js'

export const getWalletFromPhrase = (recoveryPhrase) => {
  try {
    recoveryPhrase = recoveryPhrase.trim()
    const DEFAULT_DERIVE_PATH = `m/44'/501'/0'/0'`
    const bufferToString = (buffer) => Buffer.from(buffer).toString('hex')
    const deriveSeed = (seed) => derivePath(DEFAULT_DERIVE_PATH, seed).key

    const seed = mnemonicToSeedSync(recoveryPhrase)
    let keypair = Keypair.fromSeed(deriveSeed(bufferToString(seed)))

    return keypair
  } catch (error) {
    console.error(error)
  }
}

export const fetchNFTs = async (publicKey) => {
  const tokenAccount = (
    await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID
    })
  ).value

  const nftMintAddresses = tokenAccount
    .filter((v) => {
      const amount = v.account.data.parsed.info.tokenAmount.amount
      const decimals = v.account.data.parsed.info.tokenAmount.decimals
      return amount !== '0' && decimals === 0
    })
    .map((nftMintAddress) => nftMintAddress.account.data.parsed.info.mint)

  return nftMintAddresses
}

export const getMintInfo = async (sender) => {
  // const mint = await getMint(
  //   connection,
  //   new PublicKey('2mpt4cQrx4igc26sTGgGwTJ64bT5fLQxcuHd9WwbbjaT')
  // )
  const mint = await getMint(
    connection,
    new PublicKey('CJWmiSUaCHRn5v4oKw4TajUSs3d62r4up1JbpDgU4MdS')
  )

  console.log('mint', mint)
  console.log('sender====', sender)
  console.log('sender===publickey', sender.publicKey.toBuffer())
  const senderTokenAccount = await getOrCreateAssociatedTokenAccount({
    connection: connection,
    payer: sender,
    mint: mint.address,
    // owner: sender.publicKey,
    owner: sender.publicKey,
    allowOwnerOffCurve: true,
    programId: new PublicKey('11111111111111111111111111111111')
  })
  // const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
  //   connection,
  //   sender,
  //   mint.address,
  //   sender.publicKey
  // )

  console.log(
    'senderTokenAccount===address',
    senderTokenAccount.address.toBase58()
  )
  console.log('senderTokenAccount===owner', senderTokenAccount.owner.toBase58())
  console.log('senderTokenAccount===mint', senderTokenAccount.mint.toBase58())
  console.log('senderTokenAccount===amount', senderTokenAccount.amount)
  console.log(
    'senderTokenAccount===delegatedAmount',
    senderTokenAccount.delegatedAmount
  )
  console.log('senderTokenAccount===delegate', senderTokenAccount.delegate)
}

export const transferNFT = async (
  sender,
  recipientAddress,
  nftAddress,
  amount
) => {
  const mint = new PublicKey(nftAddress)

  console.log('mint', mint.toBase58())

  const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    mint,
    sender.publicKey
  )

  console.log(
    'senderTokenAccount===address',
    senderTokenAccount.address.toBase58()
  )
  // console.log('senderTokenAccount===owner', senderTokenAccount.owner.toBase58())
  // console.log('senderTokenAccount===mint', senderTokenAccount.mint.toBase58())
  // console.log('senderTokenAccount===amount', senderTokenAccount.amount)
  // console.log(
  //   'senderTokenAccount===delegatedAmount',
  //   senderTokenAccount.delegatedAmount
  // )
  // console.log('senderTokenAccount===delegate', senderTokenAccount.delegate)

  // const accountInfo = await getAccount(connection, senderTokenAccount.address)

  // console.log('accountInfo', accountInfo.amount)
  const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    mint,
    new PublicKey(recipientAddress)
  )

  console.log('something', recipientTokenAccount.address.toBase58())

  const signature = await transfer(
    connection,
    sender,
    senderTokenAccount.address,
    recipientTokenAccount.address,
    sender.publicKey,
    amount
  )

  console.log('transaction hash', signature)
}
