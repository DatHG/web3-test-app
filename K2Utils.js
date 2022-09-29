// import { Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token'
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from '@_koi/web3.js'

import { mnemonicToSeedSync } from 'bip39'
import { derivePath } from 'ed25519-hd-key'

import { connection } from './K2Constant.js'

export const getWalletFromPhrase = async (recoveryPhrase) => {
  try {
    recoveryPhrase = recoveryPhrase.trim()
    const DEFAULT_DERIVE_PATH = `m/44'/501'/0'`
    const bufferToString = (buffer) => Buffer.from(buffer).toString('hex')
    const deriveSeed = (seed) => derivePath(DEFAULT_DERIVE_PATH, seed).key

    const seed = mnemonicToSeedSync(recoveryPhrase)
    let keypair = Keypair.fromSeed(deriveSeed(bufferToString(seed)))

    return keypair
  } catch (error) {
    console.error(error)
  }
}

export const airDropK2 = async (keypair, amount = 1) => {
  try {
    const airdropSignature = await connection.requestAirdrop(
      keypair.publicKey,
      amount * LAMPORTS_PER_SOL
    )

    await connection.confirmTransaction(airdropSignature)
  } catch (error) {
    console.error(error)
  }
}

export const viewAllTokens = async (account) => {
  const tokenAccounts = await connection.getTokenAccountsByOwner(account.publicKey, {
    programId: TOKEN_PROGRAM_ID
  })

  console.log('Token                                         Balance')
  console.log('------------------------------------------------------------')
  tokenAccounts.value.forEach((tokenAccount) => {
    const accountData = AccountLayout.decode(tokenAccount.account.data)
    console.log(`${new PublicKey(accountData.mint)}   ${accountData.amount}`)
  })
}
