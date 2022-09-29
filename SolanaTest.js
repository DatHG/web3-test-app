import {
  Transaction,
  Connection,
  clusterApiUrl,
  PublicKey,
  SystemProgram,
  SystemInstruction
} from '@solana/web3.js'

import {
  decodeInstruction,
  TOKEN_PROGRAM_ID,
  TokenInstruction,
  transfer
} from '@solana/spl-token'

import _ from 'lodash'

const solTool = {
  provider: 'devnet',
  keypair: {
    publicKey: new PublicKey('3TRUskCaisjqhV3k4tdB4HB8xtGwJPeVzVXEzBFquTHi')
  }
}

const PROGRAM_ID = {
  TOKEN_PROGRAM: TOKEN_PROGRAM_ID,
  TOKEN_METAPLEX: new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
  SYSTEM_PROGRAM: SystemProgram.programId
}

const SYSTEM_INSTRUCTION_TYPE = {
  ADVANCE_NONCE_ACCOUNT: 'AdvanceNonceAccount',
  ALLOCATE: 'Allocate',
  ALLOCATE_WITH_SEED: 'AllocateWithSeed',
  ASSIGN: 'Assign',
  ASSIGN_WITH_SEED: 'AssignWithSeed',
  AUTHORIZE_NONCE_ACCOUNT: 'AuthorizeNonceAccount',
  CREATE: 'Create',
  CREATE_WITH_SEED: 'CreateWithSeed',
  INITIALIZE_NONCE_ACCOUNT: 'InitializeNonceAccount',
  TRANSFER: 'Transfer',
  TRASFER_WITH_SEED: 'TransferWithSeed',
  WITHDRAW_NONCE_ACCOUNT: 'WithdrawNonceAccount',
  UPGRADE_NONCE_ACCOUNT: 'UpgradeNonceAccount'
}

const getTransactionResponses = async () => {
  const connection = new Connection(clusterApiUrl(solTool.provider))

  const signatureInfos = await connection.getSignaturesForAddress(
    solTool.keypair.publicKey
  )

  const transactions = await Promise.all(
    signatureInfos.map(
      async (signatureInfos) =>
        await connection.getTransaction(signatureInfos.signature)
    )
  )

  transactions.push(
    await connection.getTransaction(
      '5gfnxNawVJPbkgFLCQC6bZjxGn7YTFjTf8e4GzgqFGtpiKJhguTJA9QiDqYiwiFnkjc1rtaQKvLrXohdQwzyCQm1'
    )
  )
  return transactions
}

const getInstrusctionFromTxResponse = (txResponse) => {
  const message = txResponse.transaction.message
  const signature = txResponse.transaction.signatures
  const transaction = Transaction.populate(message, signature)

  return transaction.instructions
}

const decodeInstructionData = (instruction) => {
  try {
    // console.log(instruction)
    /* System instruction decoder */
    const decodeSystemInstruction = (instruction) => {
      const method = SystemInstruction.decodeInstructionType(instruction)
      let description
      switch (method) {
        case SYSTEM_INSTRUCTION_TYPE.ADVANCE_NONCE_ACCOUNT:
          description = SystemInstruction.decodeNonceAdvance(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.ALLOCATE:
          description = SystemInstruction.decodeAllocate(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.ALLOCATE_WITH_SEED:
          description = SystemInstruction.decodeAllocateWithSeed(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.ASSIGN:
          description = SystemInstruction.decodeAssign(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.ASSIGN_WITH_SEED:
          description = SystemInstruction.decodeAssignWithSeed(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.AUTHORIZE_NONCE_ACCOUNT:
          description = SystemInstruction.decodeNonceAuthorize(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.CREATE:
          description = SystemInstruction.decodeCreateAccount(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.CREATE_WITH_SEED:
          description = SystemInstruction.decodeCreateWithSeed(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.INITIALIZE_NONCE_ACCOUNT:
          description = SystemInstruction.decodeNonceInitialize(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.TRANSFER:
          description = SystemInstruction.decodeTransfer(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.TRASFER_WITH_SEED:
          description = SystemInstruction.decodeTransferWithSeed(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.WITHDRAW_NONCE_ACCOUNT:
          description = SystemInstruction.decodeNonceWithdraw(instruction)
          break
        case SYSTEM_INSTRUCTION_TYPE.UPGRADE_NONCE_ACCOUNT:
        default:
          description = {}
          break
      }
      return { description, method }
    }

    /* Token instruction decoder */
    const decodeTokenInstruction = (instruction) => {
      const description = decodeInstruction(instruction)
      const method = TokenInstruction[description.data.instruction]
      return { description, method }
    }

    /* Main-part */
    const programId = instruction.programId

    if (programId.equals(PROGRAM_ID.SYSTEM_PROGRAM))
      return decodeSystemInstruction(instruction)

    if (programId.equals(PROGRAM_ID.TOKEN_PROGRAM))
      return decodeTokenInstruction(instruction)

    return {}
  } catch (error) {
    console.error(error.message)
    return {}
  }
}

// decodeInstructionData(instruction)

const testDecode = async () => {
  const txResponses = await getTransactionResponses()
  const tx
  for (let i = 0; i < txResponses.length; i++) {
    console.log(`**** Decoding txResponse ${i}th ****`)
    const txResponse = txResponses[i]
    const instructions = getInstrusctionFromTxResponse(txResponse)

    for (let instruction of instructions) {
      console.log(decodeInstructionData(instruction))
    }
  }
}

testDecode()
// const txResponse = (await getTransactionResponses())[3]
// const instruction = getInstrusctionFromTxResponse(txResponse)[0]
// console.log(decodeInstruction(instruction, PROGRAM_ID.TOKEN_METAPLEX))