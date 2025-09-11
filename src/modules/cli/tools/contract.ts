// Contract Command Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const CONTRACT_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_contract_deploy',
    description: 'Deploy a Soroban smart contract to Stellar network',
    inputSchema: {
      type: 'object',
      properties: {
        wasm_path: { 
          type: 'string', 
          description: 'Path to WASM file to deploy' 
        },
        wasm_hash: { 
          type: 'string', 
          description: 'Hash of already installed WASM file' 
        },
        source_account: { 
          type: 'string', 
          description: 'Account that will deploy the contract (can be identity, public key, or secret key)' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network to deploy to' 
        },
        salt: { 
          type: 'string', 
          description: 'Custom 32-byte salt for contract ID generation' 
        },
        alias: { 
          type: 'string', 
          description: 'Alias to save for the deployed contract ID' 
        },
        constructor_args: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'Arguments to pass to contract constructor' 
        },
        fee: { 
          type: 'number', 
          description: 'Transaction fee in stroops (default: 100)' 
        },
        build_only: { 
          type: 'boolean', 
          description: 'Only build transaction, do not submit' 
        },
        ignore_checks: { 
          type: 'boolean', 
          description: 'Ignore safety checks when deploying' 
        }
      },
      required: ['source_account', 'network'],
    }
  },
  {
    name: 'stellar_contract_invoke',
    description: 'Invoke a function on a deployed Soroban contract',
    inputSchema: {
      type: 'object',
      properties: {
        contract_id: { 
          type: 'string', 
          description: 'Contract ID or alias to invoke' 
        },
        source_account: { 
          type: 'string', 
          description: 'Account that will invoke the contract' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        function_name: { 
          type: 'string', 
          description: 'Name of the contract function to invoke' 
        },
        function_args: { 
          type: 'object', 
          description: 'Arguments to pass to the function as key-value pairs' 
        },
        send: { 
          type: 'string', 
          enum: ['default', 'no', 'yes'],
          description: 'Transaction sending behavior: default (auto), no (simulate only), yes (always send)' 
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
      required: ['contract_id', 'source_account', 'network', 'function_name']
    }
  },
  {
    name: 'stellar_contract_build',
    description: 'Build a Soroban contract from Rust source code',
    inputSchema: {
      type: 'object',
      properties: {
        manifest_path: { 
          type: 'string', 
          description: 'Path to Cargo.toml file' 
        },
        package: { 
          type: 'string', 
          description: 'Specific package to build in workspace' 
        },
        profile: { 
          type: 'string', 
          description: 'Build profile (default: release)' 
        },
        features: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'Features to activate during build' 
        },
        all_features: { 
          type: 'boolean', 
          description: 'Build with all features activated' 
        },
        no_default_features: { 
          type: 'boolean', 
          description: 'Build without default features' 
        },
        out_dir: { 
          type: 'string', 
          description: 'Directory to copy built WASM files to' 
        },
        print_commands_only: { 
          type: 'boolean', 
          description: 'Only print build commands without executing' 
        },
        meta: { 
          type: 'object', 
          description: 'Key-value pairs to add to contract metadata' 
        }
      }
    }
  },
  {
    name: 'stellar_contract_init',
    description: 'Initialize a new Soroban contract project',
    inputSchema: {
      type: 'object',
      properties: {
        project_path: { 
          type: 'string', 
          description: 'Path where the project will be created' 
        },
        name: { 
          type: 'string', 
          description: 'Name of the contract (default: hello-world)' 
        },
        overwrite: { 
          type: 'boolean', 
          description: 'Overwrite existing files if they exist' 
        }
      },
      required: ['project_path']
    }
  },
  {
    name: 'stellar_contract_optimize',
    description: 'Optimize WASM files for deployment',
    inputSchema: {
      type: 'object',
      properties: {
        wasm_paths: { 
          type: 'array', 
          items: { type: 'string' },
          description: 'Paths to WASM files to optimize' 
        },
        wasm_out: { 
          type: 'string', 
          description: 'Output path for optimized WASM (defaults to .optimized.wasm suffix)' 
        }
      },
      required: ['wasm_paths']
    }
  },
  {
    name: 'stellar_contract_alias',
    description: 'Manage contract aliases for easier reference',
    inputSchema: {
      type: 'object',
      properties: {
        action: { 
          type: 'string', 
          enum: ['add', 'remove', 'show', 'list'],
          description: 'Alias action to perform' 
        },
        alias: { 
          type: 'string', 
          description: 'Alias name (required for add, remove, show)' 
        },
        contract_id: { 
          type: 'string', 
          description: 'Contract ID to associate with alias (required for add)' 
        },
        overwrite: { 
          type: 'boolean', 
          description: 'Overwrite existing alias if it exists' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Network for the alias' 
        }
      },
      required: ['action']
    }
  },
  {
    name: 'stellar_contract_asset_deploy',
    description: 'Deploy a Stellar Asset Contract for wrapping classic assets',
    inputSchema: {
      type: 'object',
      properties: {
        asset: { 
          type: 'string', 
          description: 'Asset to wrap (e.g., "USDC:GABC...XYZ")' 
        },
        source_account: { 
          type: 'string', 
          description: 'Account that will deploy the asset contract' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        alias: { 
          type: 'string', 
          description: 'Alias to save for the asset contract' 
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
      required: ['asset', 'source_account', 'network']
    }
  },
  {
    name: 'stellar_contract_bindings',
    description: 'Generate client bindings for a contract in various languages',
    inputSchema: {
      type: 'object',
      properties: {
        language: { 
          type: 'string', 
          enum: ['json', 'rust', 'typescript', 'python', 'java', 'flutter', 'swift', 'php'],
          description: 'Target language for bindings' 
        },
        wasm: { 
          type: 'string', 
          description: 'Path to WASM file' 
        },
        wasm_hash: { 
          type: 'string', 
          description: 'Hash of WASM on network' 
        },
        contract_id: { 
          type: 'string', 
          description: 'Contract ID on network' 
        },
        output_dir: { 
          type: 'string', 
          description: 'Directory to output generated bindings' 
        },
        overwrite: { 
          type: 'boolean', 
          description: 'Overwrite existing output directory' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Network for fetching contract' 
        }
      },
      required: ['language']
    }
  },
  {
    name: 'stellar_contract_info',
    description: 'Get information about a contract (interface, metadata, etc.)',
    inputSchema: {
      type: 'object',
      properties: {
        info_type: { 
          type: 'string', 
          enum: ['interface', 'meta', 'env-meta', 'build'],
          description: 'Type of information to retrieve' 
        },
        wasm: { 
          type: 'string', 
          description: 'Path to local WASM file' 
        },
        wasm_hash: { 
          type: 'string', 
          description: 'Hash of WASM on network' 
        },
        contract_id: { 
          type: 'string', 
          description: 'Contract ID on network' 
        },
        output: { 
          type: 'string', 
          enum: ['rust', 'xdr-base64', 'json', 'json-formatted', 'text'],
          description: 'Output format' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Network for fetching contract' 
        }
      },
      required: ['info_type']
    }
  },
  {
    name: 'stellar_contract_extend',
    description: 'Extend the time-to-live of contract data entries',
    inputSchema: {
      type: 'object',
      properties: {
        ledgers_to_extend: { 
          type: 'number', 
          description: 'Number of ledgers to extend TTL by' 
        },
        source_account: { 
          type: 'string', 
          description: 'Account that will pay for the extension' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        contract_id: { 
          type: 'string', 
          description: 'Contract ID owning the data entries' 
        },
        key: { 
          type: 'string', 
          description: 'Storage key to extend (symbols only)' 
        },
        key_xdr: { 
          type: 'string', 
          description: 'Storage key as base64-encoded XDR' 
        },
        durability: { 
          type: 'string', 
          enum: ['persistent', 'temporary'],
          description: 'Storage durability type' 
        },
        ttl_ledger_only: { 
          type: 'boolean', 
          description: 'Only print the new TTL ledger, do not submit' 
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
      required: ['ledgers_to_extend', 'source_account', 'network']
    }
  },
  {
    name: 'stellar_contract_restore',
    description: 'Restore evicted contract data entries',
    inputSchema: {
      type: 'object',
      properties: {
        source_account: { 
          type: 'string', 
          description: 'Account that will pay for restoration' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        contract_id: { 
          type: 'string', 
          description: 'Contract ID to restore' 
        },
        key: { 
          type: 'string', 
          description: 'Storage key to restore' 
        },
        key_xdr: { 
          type: 'string', 
          description: 'Storage key as base64-encoded XDR' 
        },
        durability: { 
          type: 'string', 
          enum: ['persistent', 'temporary'],
          description: 'Storage durability type' 
        },
        ledgers_to_extend: { 
          type: 'number', 
          description: 'Number of ledgers to extend after restoration' 
        },
        ttl_ledger_only: { 
          type: 'boolean', 
          description: 'Only print the new TTL ledger' 
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
  {
    name: 'stellar_contract_read',
    description: 'Read contract data entries',
    inputSchema: {
      type: 'object',
      properties: {
        contract_id: { 
          type: 'string', 
          description: 'Contract ID to read from' 
        },
        key: { 
          type: 'string', 
          description: 'Storage key to read' 
        },
        key_xdr: { 
          type: 'string', 
          description: 'Storage key as base64-encoded XDR' 
        },
        durability: { 
          type: 'string', 
          enum: ['persistent', 'temporary'],
          description: 'Storage durability type' 
        },
        output: { 
          type: 'string', 
          enum: ['string', 'json', 'xdr'],
          description: 'Output format' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        }
      },
      required: ['network']
    }
  },
  {
    name: 'stellar_contract_fetch',
    description: 'Fetch a contract\'s WASM binary from the network',
    inputSchema: {
      type: 'object',
      properties: {
        contract_id: { 
          type: 'string', 
          description: 'Contract ID to fetch WASM for' 
        },
        out_file: { 
          type: 'string', 
          description: 'Path to save the fetched WASM file' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        }
      },
      required: ['contract_id', 'network']
    }
  },
  {
    name: 'stellar_contract_upload',
    description: 'Upload a WASM file to the ledger without creating a contract instance',
    inputSchema: {
      type: 'object',
      properties: {
        source_account: { 
          type: 'string', 
          description: 'Account that will upload the WASM' 
        },
        wasm: { 
          type: 'string', 
          description: 'Path to WASM file to upload' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        },
        ignore_checks: { 
          type: 'boolean', 
          description: 'Ignore safety checks' 
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
      required: ['source_account', 'wasm', 'network']
    }
  },
  {
    name: 'stellar_contract_id',
    description: 'Generate contract IDs for assets or WASM contracts',
    inputSchema: {
      type: 'object',
      properties: {
        id_type: { 
          type: 'string', 
          enum: ['asset', 'wasm'],
          description: 'Type of contract ID to generate' 
        },
        asset: { 
          type: 'string', 
          description: 'Asset for asset contract (required if id_type is asset)' 
        },
        salt: { 
          type: 'string', 
          description: 'Salt for WASM contract (required if id_type is wasm)' 
        },
        source_account: { 
          type: 'string', 
          description: 'Source account for WASM contract (required if id_type is wasm)' 
        },
        network: { 
          type: 'string', 
          enum: ['testnet', 'mainnet', 'futurenet', 'local'],
          description: 'Stellar network' 
        }
      },
      required: ['id_type', 'network']
    }
  }
];