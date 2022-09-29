import _ from 'lodash'
import { alchemy } from './constant.js'
import { ethers } from 'ethers'
import ERC721 from '../ERC721ABI.json' assert { type: 'json' }
import ERC1155 from '../ERC1155ABI.json' assert { type: 'json' }

export const fetchNFTs = async (address) => {
  const nfts = await alchemy.nft.getNftsForOwner(address)
  return nfts
}

export const initialize = () => {
  const provider = new ethers.providers.InfuraProvider(
    'goerli',
    'f811f2257c4a4cceba5ab9044a1f03d2'
  )

  return provider
}

export const transferNFT = async (
  senderAddress,
  receipientAddress,
  senderPK,
  nft
) => {
  const contractABI = nft.tokenType === 'ERC721' ? ERC721 : ERC1155
  const provider = initialize()
  const wallet = new ethers.Wallet(senderPK, provider)

  // Get gas price
  const gasPrice = await provider.getGasPrice()

  // Grab contract ABI and create an instance
  const nftContract = new ethers.Contract(
    nft.contract.address,
    contractABI,
    wallet
  )

  //Estimate gas limit
  let gasLimit, transaction

  if (nft.tokenType === 'ERC1155') {
    gasLimit = await nftContract.estimateGas[
      'safeTransferFrom(address,address,uint256,uint256,bytes)'
    ](senderAddress, receipientAddress, nft.tokenId, '1', '0x', { gasPrice })

    console.log(gasLimit)
    transaction = await nftContract[
      'safeTransferFrom(address,address,uint256,uint256,bytes)'
    ](senderAddress, receipientAddress, nft.tokenId, '1', '0x', { gasLimit })
  } else {
    gasLimit = await nftContract.estimateGas[
      'safeTransferFrom(address,address,uint256)'
    ](senderAddress, receipientAddress, nft.tokenId, { gasPrice })

    transaction = await nftContract[
      'safeTransferFrom(address,address,uint256)'
    ](senderAddress, receipientAddress, nft.tokenId, { gasLimit })
  }

  await transaction.wait()

  console.log('Transaction Hash', transaction.hash)
}
