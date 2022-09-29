/* utils */
import { clarifyEthereumProvider, initProvider } from './utils.js'

/* constants */
import { ethProvider, transactionHash, rawTx } from './constants.js'

/* Ethereum web3 packages */
import { BigNumber, ethers } from 'ethers'
import Web3 from 'web3'

// INIT PROVIDER FOR TESTING
const { web3, oldWeb3 } = initProvider()
const { ethNetwork, apiKey } = clarifyEthereumProvider(ethProvider)

import ERC20 from './ERC20ABI.json' assert { type: 'json' }
import ERC721 from './ERC721ABI.json' assert { type: 'json' }
import MemaskABI from './MetamaskABI.json' assert { type: 'json' }

// getNetwork
const testGetChainID = () => {
  oldWeb3.eth
    .getChainId()
    .then((response) => console.log('Web3 - testGetNetwork: ', response))

  console.log(
    'Ethers - testGetNetwork: ',
    ethers.providers.getNetwork(ethNetwork).chainId
  )
}
// testGetChainID()

// getBlockNumber
const testGetBlockNumber = async () => {
  console.log('Web3 - testGetBlockNumber: ', await oldWeb3.eth.getBlockNumber())
  console.log('Ethers - testGetBlockNumber: ', await web3.getBlockNumber())
}
// testGetBlockNumber()

// getBlock
const testGetBlock = async () => {
  const latestBlock = await web3.getBlockNumber()
  console.log('Web3 - testGetBlock: ', await oldWeb3.eth.getBlock(latestBlock))
  console.log('Ethers - testGetBlock: ', await web3.getBlock(latestBlock))
}
// testGetBlock()

// toNumber
const testToNumber = async () => {
  const latestBlock = await web3.getBlockNumber()
  const blockDataEther = await web3.getBlock(latestBlock)
  const blockDataWeb3 = await oldWeb3.eth.getBlock(latestBlock)
  console.log('blockDataEther.baseFeePerGas', blockDataEther.baseFeePerGas)
  console.log(
    'Web3 - testToNumber: ',
    oldWeb3.utils.hexToNumber(blockDataWeb3.baseFeePerGas)
  )
  console.log(
    'Ethers - testToNumber: ',
    blockDataEther.baseFeePerGas.toNumber()
  )
}
// testToNumber()

// getGasPrice
const testGetGasPrice = async () => {
  console.log('Web3 - testGetGasPrice: ', await oldWeb3.eth.getGasPrice())
  console.log('Ethers - testGetGasPrice: ', await web3.getGasPrice())
}
// testGetGasPrice()

// BigNumber.from()
const testBigNumberFrom = async () => {
  const gasPriceWeb3 = await oldWeb3.eth.getGasPrice()
  const gasPriceEthers = await web3.getGasPrice()
  console.log('Web3 - testBigNumberFrom: ', Web3.utils.toBN(gasPriceWeb3))
  console.log(
    'Ethers - testBigNumberFrom: ',
    ethers.BigNumber.from(gasPriceEthers)
  )
}
// testBigNumberFrom()

// hexlify
const testHexlify = async () => {
  const latestBlock = await web3.getBlockNumber()
  const blockDataEther = await web3.getBlock(latestBlock)
  const blockDataWeb3 = await oldWeb3.eth.getBlock(latestBlock)

  console.log(
    'Web3 - testHexlify: ',
    oldWeb3.utils.toHex(blockDataWeb3.difficulty)
  )
  console.log(
    'Ethers - testHexlify: ',
    ethers.utils.hexlify(blockDataEther.difficulty)
  )
}
// testHexlify()

// getTransaction
const testGetTransaction = async () => {
  console.log(
    'Web3 - testGetTransaction: ',
    await oldWeb3.eth.getTransaction(transactionHash)
  )
  console.log(
    'Ethers - testGetTransaction: ',
    await web3.getTransaction(transactionHash)
  )
}
// testGetTransaction()

// getTransactionReceipt
const testGetTransactionReceipt = async () => {
  console.log(
    'Web3 - testGetTransactionReceipt: ',
    await oldWeb3.eth.getTransactionReceipt(transactionHash)
  )
  console.log(
    'Ethers - testGetTransactionReceipt: ',
    await web3.getTransactionReceipt(transactionHash)
  )
}
// testGetTransactionReceipt()

const testToUtf8String = () => {
  console.log(
    'Web3 - testToUtf8String: ',
    oldWeb3.utils.hexToUtf8('0x49206861766520313030e282ac')
  )
  console.log(
    'Ethers - testToUtf8String: ',
    ethers.utils.toUtf8String('0x49206861766520313030e282ac')
  )
}
// testToUtf8String()

const testParseEther = () => {
  console.log(
    'Web3 - testParseEther: ',
    oldWeb3.utils.toWei('0.00015', 'ether')
  )
  console.log(
    'Ethers - testParseEther: ',
    ethers.utils.parseEther('0.00015').toNumber()
  )
}
// testParseEther()

const testMul = async () => {
  const gasPriceWeb3 = await oldWeb3.eth.getGasPrice()
  const gasPriceWeb3BN = oldWeb3.utils.toBN(gasPriceWeb3)

  const gasPriceEthers = await web3.getGasPrice()

  console.log('Web3 - testMul: ', gasPriceWeb3BN.muln(21000).toNumber())
  console.log('Ethers - testMul: ', gasPriceEthers.mul(21000).toNumber())
}
// testMul()

const testFormatEther = async () => {
  const gasPriceWeb3 = await oldWeb3.eth.getGasPrice()
  const gasPriceWeb3BN = oldWeb3.utils.toBN(gasPriceWeb3)

  const gasPriceEthers = await web3.getGasPrice()
  const gasPriceEthersBN = ethers.BigNumber.from(gasPriceEthers)
  console.log(
    'Web3 - testFormatEther: ',
    oldWeb3.utils.fromWei(gasPriceWeb3BN.muln(21000))
  )
  console.log(
    'Ethers - testFormatEther: ',
    ethers.utils.formatEther(gasPriceEthersBN.mul(21000))
  )
}
// testFormatEther()

const testIsAddress = () => {
  console.log('Web3 - testIsAddress: ', oldWeb3.utils.isAddress(rawTx.to))
  console.log('Ethers - testIsAddress: ', ethers.utils.isAddress(rawTx.to))
}
// testIsAddress()

const testGetBalance = async () => {
  console.log(
    'Web3 - testGetBalance: ',
    oldWeb3.utils.fromWei(await oldWeb3.eth.getBalance(rawTx.from))
  )
  console.log(
    'Ethers - testGetBalance: ',
    ethers.utils.formatEther(await web3.getBalance(rawTx.from))
  )
}
// testGetBalance()

const testEstimateGas = async () => {
  console.log('Web3 - testEstimateGas: ', await oldWeb3.eth.estimateGas(rawTx))
  console.log(
    'Ethers - testEstimateGas: ',
    (await web3.estimateGas(rawTx)).toNumber()
  )
}
// testEstimateGas()

const testSignTransaction = async () => {
  // Create a wallet instance from a mnemonic...
  const mnemonic =
    'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
  const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic)
  console.log(walletMnemonic)
  // ...or from a private key
  const walletPrivateKey = new ethers.Wallet(walletMnemonic.privateKey)

  // // The address as a Promise per the Signer API
  // await walletMnemonic.getAddress()
  // // '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

  // // A Wallet address is also available synchronously
  // walletMnemonic.address
  // // '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

  // // The internal cryptographic components
  // walletMnemonic.privateKey
  // // '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
  // walletMnemonic.publicKey
  // // '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

  // // The wallet mnemonic
  // // {
  // //   locale: 'en',
  // //   path: "m/44'/60'/0'/0/0",
  // //   phrase: 'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'
  // // }

  // // Note: A wallet created with a private key does not
  // //       have a mnemonic (the derivation prevents it)
  // walletPrivateKey.mnemonic
  // // null

  // // Signing a message
  // await walletMnemonic.signMessage('Hello World')
  // // '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c'

  const tx = {
    to: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
    value: ethers.utils.parseEther('0.0000001')
  }

  // Signing a transaction
  // '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc'

  // // The connect method returns a new instance of the
  // // Wallet connected to a provider
  const wallet = walletMnemonic.connect(web3)
  const wallet2 = new ethers.Wallet(walletMnemonic.privateKey, web3)
  // console.log((await wallet.getBalance()).toNumber())
  // console.log((await wallet2.getBalance()).toNumber())

  const signTx = await wallet.signTransaction(tx)
  // // // Sending ether
  // console.log(await wallet.sendTransaction(tx))
  // console.log(await wallet2.sendTransaction(tx))
  console.log(await web3.sendTransaction(signTx))
  // // {
  // //   chainId: 1337,
  // //   confirmations: 0,
  // //   data: '0x',
  // //   from: '0x8577181F3D8A38a532Ef8F3D6Fd9a31baE73b1EA',
  // //   gasLimit: { BigNumber: "21000" },
  // //   gasPrice: { BigNumber: "1" },
  // //   hash: '0xdbf6b710ded42ae0fcfb0ec601235afce5acd0a01b785002cf0581fab4d53b52',
  // //   nonce: 5,
  // //   r: '0x7502ebb9c10e1664d9a344b636c1151a9ebc6b9dd1aa2bad9f739d15368a83f9',
  // //   s: '0x3a71b2b3a2a90527e2cf221606b89af5ac8195b8146f9d2776e4ca342b7e37b2',
  // //   to: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
  // //   type: null,
  // //   v: 2710,
  // //   value: { BigNumber: "1000000000000000000" },
  // //   wait: [Function]
  // // }
}
// testSignTransaction()
// console.log(ethers.BigNumber.from('1000000000000000'))

const decodeTransactionData = async (sender=null,receipt=null, data) => {
  const iface = new ethers.utils.Interface(MemaskABI)
  const decodedData = iface.parseTransaction({ data: data })
  console.log(decodedData)
}

decodeTransactionData(
  data = '0x178a85690000000000000000000000000000000000000000000000000000000000000005'
)

const isContractAddress = async (address) => {
  if (!isEmpty(address)) return (await ethers.getCode(receipt)) !== '0x'
  return false
}

// const testConnectUniswap = async () => {
//   // ethProvider = 'https://rinkeby.infura.io/v3/f811f2257c4a4cceba5ab9044a1f03d2'
//   const provider = new ethers.providers.JsonRpcProvider(ethProvider)

//   const params = [
//     {
//       data: '0x0178b8bf0c23ff2901325aff6bb9d30846596afdc03e33fd7a25694aa3c4e674758deac7',
//       to: '0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e'
//     },
//     'latest'
//   ]
//   console.log('eth_call message: ', await provider.send('eth_call', params))
//   console.log('eth_chainId message: ', await provider.send('eth_chainId', []))
//   console.log(
//     'eth_blockNumber message: ',
//     await provider.send('eth_blockNumber', [])
//   )
// }

// testConnectUniswap()

// const testSeedPhraseValidation = () => {
//   console.log(
//     ethers.utils.isValidMnemonic(
//       'color rural token tired merge people metal student pole capable catch uphold'
//     )
//   )
// }

// testSeedPhraseValidation()
