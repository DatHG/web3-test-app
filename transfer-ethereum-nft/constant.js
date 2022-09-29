import { Network, Alchemy } from 'alchemy-sdk'

export const settings = {
  apiKey: 'AZFe8dPKHvKsmJYlMEmkLwg6YGBSyaqb',
  network: Network.ETH_GOERLI
}

export const alchemy = new Alchemy(settings)

export const senderAddress = '0x9d60e52628306A5b66226bF1A8f26e0DeAFd00d6'
export const senderPrivatekey =
  '6cdee59625194131c09a4fa485b968ee3aede29015b10907e78bb6c6ba6384d4'

export const receipientAddress = '0xb076413401172CBB73C082107514De3376E4FF6c'
