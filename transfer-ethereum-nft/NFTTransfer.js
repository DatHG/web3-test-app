import {
  receipientAddress,
  senderAddress,
  senderPrivatekey
} from './constant.js'
import { fetchNFTs, transferNFT } from './utils.js'

const { ownedNfts: senderNfts } = await fetchNFTs(senderAddress)
const { ownedNfts: receipientNfts, totalCount: totalRec } = await fetchNFTs(
  receipientAddress
)

await transferNFT(senderAddress, receipientAddress, senderPrivatekey, senderNfts[0])

console.log('senderNfts', senderNfts)
console.log('receipientNfts', receipientNfts)
console.log('totalRec', totalRec)
