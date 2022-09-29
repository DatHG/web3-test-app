import Web3 from 'web3'
import { ethers } from 'ethers'

import { ethProvider } from './constants.js'

export const clarifyEthereumProvider = (ethProvider) => {
  try {
    let ethNetwork, apiKey
    const providerArray = ethProvider.split('/')
    apiKey = providerArray[4]
    ethNetwork = providerArray[2].split('.')[0]
    return { ethNetwork, apiKey }
  } catch (err) {
    console.error('Failed to clarify Ethereum Provider - error: ', err.message)
    return { ethNetwork: 'rinkeby', apiKey: 'f811f2257c4a4cceba5ab9044a1f03d2' }
  }
}

export const initProvider = () => {
  const { ethNetwork, apiKey } = clarifyEthereumProvider(ethProvider)

  const network = ethers.providers.getNetwork(ethNetwork)
  const web3 = new ethers.providers.InfuraProvider(network, apiKey)

  const oldWeb3 = new Web3(ethProvider)

  return { web3, oldWeb3 }
}
