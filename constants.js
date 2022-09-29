const e18 = 1000000000000000000
const e9 = 1000000000
export const rawTx = {
  to: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  // from: '0xb076413401172CBB73C082107514De3376E4FF6c',
  value: e9,
  data: '0xd0e30db0'
  // maxPriorityFeePerGas: 239183918239,
  // maxFeePerGas: 239183918239
} 
// export const rawTx = {
//   // Wrapped ETH address
//   to: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',

//   // `function deposit() payable`
//   data: '0xd0e30db0',

//   // 1 ether
//   value: e18
// }
export const ethProvider =
  'https://rinkeby.infura.io/v3/f811f2257c4a4cceba5ab9044a1f03d2'

export const transactionHash =
  '0xc41433e51fb5b9557ac9b6a0498ab1952be94de5a480c9ff00444b11e1841beb'

// export const TRANSACTION_METHOD = {
//   APPROVAL
// }