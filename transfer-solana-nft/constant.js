import { Connection, clusterApiUrl } from '@solana/web3.js'

import { getWalletFromPhrase } from './utils.js'

// export const connection = new Connection(
//   clusterApiUrl('mainnet-beta'),
//   'confirmed'
// )
export const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

export const recoveryPhrases = {
  sender:
    'color tired merge rural token pole capable people metal student catch uphold',
  // sender:
  //   'little weather frequent code degree change around aim walk supreme again deposit',
  recipient:
    'panic filter evolve hold job body horse entire slam outside bread match'
}

export const sender = getWalletFromPhrase(recoveryPhrases.sender)

export const recipient = getWalletFromPhrase(recoveryPhrases.recipient)

export const METADATA_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
