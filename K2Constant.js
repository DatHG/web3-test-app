import { Connection, clusterApiUrl } from '@_koi/web3.js'

export const connection = new Connection(clusterApiUrl('testnet'), 'confirmed')
