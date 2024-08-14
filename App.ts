import { ethers } from 'ethers'

// Define the ABI for the contract (specifically for releaseAllowance function)
const contractABI = [
  // Only include the ABI for releaseAllowance
  {
    constant: false,
    inputs: [],
    name: 'releaseAllowance',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function',
  },
]

// The deployed contract address
const contractAddress = '0x79bddf6537085D83Aef446dA62e6D247d4eb04Af'

// A helper function to release allowance
async function releaseAllowance() {
  try {
    // Connect to Ethereum provider (e.g., MetaMask or Infura)
    // Use ethers.providers.Web3Provider if you're using a browser-based provider like MetaMask
    const provider = new ethers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/YOUR_API_KEY'
    )

    // Replace with your Infura endpoint or another provider

    // Get the wallet (or connect a signer for the transaction)
    // Replace with the private key of the account you want to use to send the transaction
    const signer = new ethers.Wallet('private key here', provider)

    // Connect to the contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer)

    // Call the releaseAllowance function
    const tx = await contract.releaseAllowance()

    console.log('Transaction submitted:', tx.hash)

    // Wait for the transaction to be confirmed
    const receipt = await tx.wait()

    console.log('Transaction confirmed:', receipt.transactionHash)
  } catch (error) {
    console.error('Error calling releaseAllowance:', error)
  }
}

// Call the function
releaseAllowance()
