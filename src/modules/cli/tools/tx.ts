// Transaction (tx) Command Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const TX_TOOLS: ToolDefinition[] = [
  // Core transaction operations
  {
    name: 'stellar_tx_payment',
    description: 'Create and send a payment transaction',
    inputSchema: {
      type: 'object',
      properties: {
        source_account: { 
          type: 'string', 
          description: 'Account that will send the payment' 
        },
        destination: { 
          type: 'string', 
          description: 'Account that will receive the payment' 
        },
        asset: { 
          type: 'string', 
          description: 'Asset to send (native for XLM or CODE:ISSUER for other assets)' 
        },
        amount: { 
          type: 'string', 
          description: 'Amount to send (e.g., "10.5" for 10.5 XLM)' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        memo: { 
          type: 'string', 
          description: 'Optional transaction memo' 
        },
        memo_type: { 
          type: 'string', 
          enum: ['text', 'id', 'hash', 'return'],
          description: 'Type of memo' 
        },
        fee: { 
          type: 'number', 
          description: 'Transaction fee in stroops' 
        },
        build_only: { 
          type: 'boolean', 
          description: 'Only build transaction, do not submit' 
        }
      },
      required: ['source_account', 'destination', 'asset', 'amount', 'network']
    }
  },
  {
    name: 'stellar_tx_create_account',
    description: 'Create and fund a new Stellar account',
    inputSchema: {
      type: 'object',
      properties: {
        source_account: { 
          type: 'string', 
          description: 'Account that will fund the new account' 
        },
        destination: { 
          type: 'string', 
          description: 'Public key of the new account to create' 
        },
        starting_balance: { 
          type: 'string', 
          description: 'Initial XLM balance for the new account' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        fee: { 
          type: 'number', 
          description: 'Transaction fee in stroops' 
        },
        build_only: { 
          type: 'boolean', 
          description: 'Only build transaction, do not submit' 
        }
      },
      required: ['source_account', 'destination', 'starting_balance', 'network']
    }
  },
  {
    name: 'stellar_tx_change_trust',
    description: 'Create, update, or delete a trustline for an asset',
    inputSchema: {
      type: 'object',
      properties: {
        source_account: { 
          type: 'string', 
          description: 'Account that will change the trustline' 
        },
        line: { 
          type: 'string', 
          description: 'Asset to trust (CODE:ISSUER format)' 
        },
        limit: { 
          type: 'string', 
          description: 'Trust limit (0 to remove trustline, omit for maximum)' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        fee: { 
          type: 'number', 
          description: 'Transaction fee in stroops' 
        },
        build_only: { 
          type: 'boolean', 
          description: 'Only build transaction, do not submit' 
        }
      },
      required: ['source_account', 'line', 'network']
    }
  },
  {
    name: 'stellar_tx_account_merge',
    description: 'Merge account balance into another account and remove source',
    inputSchema: {
      type: 'object',
      properties: {
        source_account: { 
          type: 'string', 
          description: 'Account to be merged and removed' 
        },
        account_destination: { 
          type: 'string', 
          description: 'Account that will receive the balance' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        fee: { 
          type: 'number', 
          description: 'Transaction fee in stroops' 
        },
        build_only: { 
          type: 'boolean', 
          description: 'Only build transaction, do not submit' 
        }
      },
      required: ['source_account', 'account_destination', 'network']
    }
  },
  {
    name: 'stellar_tx_manage_data',
    description: 'Set, modify, or delete account data entries',
    inputSchema: {
      type: 'object',
      properties: {
        source_account: { 
          type: 'string', 
          description: 'Account that owns the data entry' 
        },
        data_name: { 
          type: 'string', 
          description: 'Name/key of the data entry' 
        },
        data_value: { 
          type: 'string', 
          description: 'Value to set (omit to delete the entry)' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        fee: { 
          type: 'number', 
          description: 'Transaction fee in stroops' 
        },
        build_only: { 
          type: 'boolean', 
          description: 'Only build transaction, do not submit' 
        }
      },
      required: ['source_account', 'data_name', 'network']
    }
  },
  {
    name: 'stellar_tx_set_options',
    description: 'Set account options like flags, signers, and home domain',
    inputSchema: {
      type: 'object',
      properties: {
        source_account: { 
          type: 'string', 
          description: 'Account to modify options for' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        inflation_dest: { 
          type: 'string', 
          description: 'Inflation destination account' 
        },
        clear_flags: { 
          type: 'number', 
          description: 'Flags to clear' 
        },
        set_flags: { 
          type: 'number', 
          description: 'Flags to set' 
        },
        master_weight: { 
          type: 'number', 
          description: 'Master key weight' 
        },
        low_threshold: { 
          type: 'number', 
          description: 'Low threshold' 
        },
        med_threshold: { 
          type: 'number', 
          description: 'Medium threshold' 
        },
        high_threshold: { 
          type: 'number', 
          description: 'High threshold' 
        },
        home_domain: { 
          type: 'string', 
          description: 'Home domain for the account' 
        },
        signer_key: { 
          type: 'string', 
          description: 'Public key of signer to add/update' 
        },
        signer_weight: { 
          type: 'number', 
          description: 'Weight for the signer (0 to remove)' 
        },
        fee: { 
          type: 'number', 
          description: 'Transaction fee in stroops' 
        },
        build_only: { 
          type: 'boolean', 
          description: 'Only build transaction, do not submit' 
        }
      },
      required: ['source_account', 'network']
    }
  },
  
  // Trading operations
  {
    name: 'stellar_tx_manage_sell_offer',
    description: 'Create, update, or delete a sell offer on the DEX',
    inputSchema: {
      type: 'object',
      properties: {
        source_account: { 
          type: 'string', 
          description: 'Account that will create/manage the offer' 
        },
        selling: { 
          type: 'string', 
          description: 'Asset to sell (native or CODE:ISSUER)' 
        },
        buying: { 
          type: 'string', 
          description: 'Asset to buy (native or CODE:ISSUER)' 
        },
        amount: { 
          type: 'string', 
          description: 'Amount to sell' 
        },
        price: { 
          type: 'string', 
          description: 'Price per unit (buying/selling)' 
        },
        offer_id: { 
          type: 'string', 
          description: 'Offer ID to update/delete (0 for new offer)' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        fee: { 
          type: 'number', 
          description: 'Transaction fee in stroops' 
        },
        build_only: { 
          type: 'boolean', 
          description: 'Only build transaction, do not submit' 
        }
      },
      required: ['source_account', 'selling', 'buying', 'amount', 'price', 'network']
    }
  },
  {
    name: 'stellar_tx_manage_buy_offer',
    description: 'Create, update, or delete a buy offer on the DEX',
    inputSchema: {
      type: 'object',
      properties: {
        source_account: { 
          type: 'string', 
          description: 'Account that will create/manage the offer' 
        },
        selling: { 
          type: 'string', 
          description: 'Asset to sell (native or CODE:ISSUER)' 
        },
        buying: { 
          type: 'string', 
          description: 'Asset to buy (native or CODE:ISSUER)' 
        },
        buy_amount: { 
          type: 'string', 
          description: 'Amount to buy' 
        },
        price: { 
          type: 'string', 
          description: 'Price per unit (buying/selling)' 
        },
        offer_id: { 
          type: 'string', 
          description: 'Offer ID to update/delete (0 for new offer)' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        fee: { 
          type: 'number', 
          description: 'Transaction fee in stroops' 
        },
        build_only: { 
          type: 'boolean', 
          description: 'Only build transaction, do not submit' 
        }
      },
      required: ['source_account', 'selling', 'buying', 'buy_amount', 'price', 'network']
    }
  },
  
  // Transaction management tools
  {
    name: 'stellar_tx_sign',
    description: 'Sign a transaction envelope',
    inputSchema: {
      type: 'object',
      properties: {
        tx_xdr: { 
          type: 'string', 
          description: 'Transaction XDR to sign (base64)' 
        },
        sign_with_key: { 
          type: 'string', 
          description: 'Key to sign with (identity, secret key, or seed phrase)' 
        },
        hd_path: { 
          type: 'string', 
          description: 'HD path if using seed phrase' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        }
      },
      required: ['tx_xdr']
    }
  },
  {
    name: 'stellar_tx_send',
    description: 'Send a signed transaction to the network',
    inputSchema: {
      type: 'object',
      properties: {
        tx_xdr: { 
          type: 'string', 
          description: 'Signed transaction XDR to send (base64)' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        }
      },
      required: ['tx_xdr', 'network']
    }
  },
  {
    name: 'stellar_tx_simulate',
    description: 'Simulate a transaction to predict results and costs',
    inputSchema: {
      type: 'object',
      properties: {
        tx_xdr: { 
          type: 'string', 
          description: 'Transaction XDR to simulate (base64)' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        source_account: { 
          type: 'string', 
          description: 'Source account for simulation context' 
        }
      },
      required: ['tx_xdr', 'network']
    }
  },
  {
    name: 'stellar_tx_hash',
    description: 'Calculate the hash of a transaction envelope',
    inputSchema: {
      type: 'object',
      properties: {
        tx_xdr: { 
          type: 'string', 
          description: 'Transaction XDR to hash (base64)' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        }
      },
      required: ['tx_xdr']
    }
  },
  {
    name: 'stellar_tx_decode',
    description: 'Decode transaction XDR to human-readable JSON',
    inputSchema: {
      type: 'object',
      properties: {
        tx_xdr: { 
          type: 'string', 
          description: 'Transaction XDR to decode (base64)' 
        },
        output_format: { 
          type: 'string', 
          enum: ['json', 'json-formatted'],
          description: 'Output format' 
        }
      },
      required: ['tx_xdr']
    }
  },
  {
    name: 'stellar_tx_fetch',
    description: 'Fetch a transaction from the network by hash',
    inputSchema: {
      type: 'object',
      properties: {
        tx_hash: { 
          type: 'string', 
          description: 'Transaction hash to fetch' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        }
      },
      required: ['tx_hash', 'network']
    }
  },
  {
    name: 'stellar_tx_update_sequence',
    description: 'Update the sequence number on a transaction',
    inputSchema: {
      type: 'object',
      properties: {
        tx_xdr: { 
          type: 'string', 
          description: 'Transaction XDR to update (base64)' 
        },
        sequence_number: { 
          type: 'string', 
          description: 'New sequence number or "next" for auto-increment' 
        },
        source_account: { 
          type: 'string', 
          description: 'Source account for fetching next sequence' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        }
      },
      required: ['tx_xdr']
    }
  },
  
  // Path payment operations
  {
    name: 'stellar_tx_path_payment',
    description: 'Send a payment using path finding for cross-asset transfers',
    inputSchema: {
      type: 'object',
      properties: {
        source_account: { 
          type: 'string', 
          description: 'Account that will send the payment' 
        },
        destination: { 
          type: 'string', 
          description: 'Account that will receive the payment' 
        },
        send_asset: { 
          type: 'string', 
          description: 'Asset to send (native or CODE:ISSUER)' 
        },
        send_amount: { 
          type: 'string', 
          description: 'Amount to send (for strict send)' 
        },
        send_max: { 
          type: 'string', 
          description: 'Maximum amount to send (for strict receive)' 
        },
        dest_asset: { 
          type: 'string', 
          description: 'Asset to receive (native or CODE:ISSUER)' 
        },
        dest_amount: { 
          type: 'string', 
          description: 'Amount to receive (for strict receive)' 
        },
        dest_min: { 
          type: 'string', 
          description: 'Minimum amount to receive (for strict send)' 
        },
        strict_mode: { 
          type: 'string', 
          enum: ['send', 'receive'],
          description: 'Whether to use strict send or strict receive' 
        },
        path: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'Intermediate assets for path (optional)' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        fee: { 
          type: 'number', 
          description: 'Transaction fee in stroops' 
        },
        build_only: { 
          type: 'boolean', 
          description: 'Only build transaction, do not submit' 
        }
      },
      required: ['source_account', 'destination', 'send_asset', 'dest_asset', 'strict_mode', 'network']
    }
  }
];