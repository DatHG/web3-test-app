const ERC721ABI = require('./ERC721ABI.json')
const ethers = require('ethers')
const lodash = require('lodash')
const axios = require('axios')

const clarifyEthereumProvider = (ethProvider) => {
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

const isContractAddress = async (address) => {
  const web3 = new ethers.providers.InfuraProvider(
    'rinkeby',
    'f811f2257c4a4cceba5ab9044a1f03d2'
  )

  try {
    const code = await web3.getCode(address)
    return code !== '0x'
  } catch (err) {
    console.log('Failed to get code', code)
    return false
  }
}

const isInteractWithContract = async (activity) => {
  if (lodash.isEmpty(activity.to)) return false
  return await isContractAddress(activity.to)
}

const decodeTransactionData = async (activityHash, abi) => {
  const interfaceABI = new ethers.utils.Interface(abi)

  const web3 = new ethers.providers.InfuraProvider(
    'rinkeby',
    'f811f2257c4a4cceba5ab9044a1f03d2'
  )

  const tx = await web3.getTransaction(activityHash)
  console.log('tx', tx)
  const decodedInput = interfaceABI.parseTransaction({
    data: tx.data
  })

  return decodedInput
}

const updateActivities = async () => {
  let baseUrl, url, network

  baseUrl = `https://api-rinkeby.etherscan.io`

  const walletAddress = '0xb076413401172CBB73C082107514De3376E4FF6c'
  const offset = 1000
  const etherscanAPIKey = 'USBA7QPN747A6KGYFCSY42KZ1W9JGFI2YB'

  url = [
    `${baseUrl}/`,
    'api?module=account',
    '&action=txlist',
    `&address=${walletAddress}`,
    '&startblock=0&endblock=99999999',
    `&page=1&offset=${offset}`,
    '&sort=desc',
    `&apikey=${etherscanAPIKey}`
  ]

  url = url.join('')

  let resp = await axios.get(url)

  let fetchedData = resp.data.result
  console.log(fetchedData.slice(0,10))

  // const etherscanNetwork = 'rinkeby'
  // const walletAddress = '0xb076413401172CBB73C082107514De3376E4FF6c'
  // const etherscanAPIKey = 'USBA7QPN747A6KGYFCSY42KZ1W9JGFI2YB'
  // const etherscanProvider = new ethers.providers.EtherscanProvider(
  //   etherscanNetwork,
  //   etherscanAPIKey
  // )

  // let fetchedData = await etherscanProvider.getHistory(walletAddress)
  // fetchedData = fetchedData.reverse() // Descending transactions

  // console.log('fetchedData: ', fetchedData.slice(0, 10))
  // // const activity = fetchedData[1]
  // // console.log('activity: ', activity)

  // // const web3 = new ethers.providers.InfuraProvider(
  // //   'rinkeby',
  // //   'f811f2257c4a4cceba5ab9044a1f03d2'
  // // )

  // // if (await isInteractWithContract(activity)) {
  // //   console.log('isInteractWithContract')
  // //   let contractERC721 = new ethers.Contract(activity.to, ERC721ABI, web3)

  // //   const name = await contractERC721.name()
  // //   const symbol = await contractERC721.symbol()
  // //   const totalSuply = await contractERC721.totalSuply()
  // //   console.log('name', name)
  // //   console.log('symbol', symbol)
  // //   console.log('symbol', symbol)
  // //   // const decodedInput = await decodeTransactionData(activity.hash, ERC721ABI)
  // //   // console.log('decodedInputfl', decodedInput)
  // //   // to = decodedInput.args[0]
  // //   // expense = Number(decodedInput.args[1])
  // // }
}

updateActivities()
