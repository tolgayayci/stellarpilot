// Keys Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const KEYS_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_keys_generate',
    description: 'Generate a new identity using a 24-word seed phrase',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of identity',
        },
        seed: {
          type: 'string',
          description: 'Optional seed to use when generating seed phrase. Random otherwise',
        },
        asSecret: {
          type: 'boolean',
          description: 'Output the generated identity as a secret key',
        },
        secureStore: {
          type: 'boolean',
          description: 'Save the new key in your OS\'s credential secure store',
        },
        hdPath: {
          type: 'string',
          description: 'When generating a secret key, which hd_path should be used from the original seed_phrase',
        },
        fund: {
          type: 'boolean',
          description: 'Fund generated key pair',
        },
        overwrite: {
          type: 'boolean',
          description: 'Overwrite existing identity if it already exists',
        },
        network: {
          type: 'string',
          description: 'Name of network to use from config',
        },
        rpcUrl: {
          type: 'string',
          description: 'RPC server endpoint',
        },
        networkPassphrase: {
          type: 'string',
          description: 'Network passphrase',
        },
        configDir: {
          type: 'string',
          description: 'Location of config directory',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'stellar_keys_add',
    description: 'Add a new identity (keypair, ledger, OS specific secure store)',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of identity',
        },
        secretKey: {
          type: 'boolean',
          description: 'Enter secret (S) key when prompted',
        },
        seedPhrase: {
          type: 'boolean',
          description: 'Enter key using 12-24 word seed phrase',
        },
        secureStore: {
          type: 'boolean',
          description: 'Save the new key in your OS\'s credential secure store',
        },
        publicKey: {
          type: 'string',
          description: 'Add a public key, ed25519, or muxed account, e.g. G1.., M2..',
        },
        configDir: {
          type: 'string',
          description: 'Location of config directory',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'stellar_keys_public_key',
    description: 'Given an identity return its address (public key)',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of identity to lookup, default test identity used if not provided',
        },
        hdPath: {
          type: 'string',
          description: 'If identity is a seed phrase use this hd path, default is 0',
        },
        configDir: {
          type: 'string',
          description: 'Location of config directory',
        },
      },
      required: [],
    },
  },
  {
    name: 'stellar_keys_fund',
    description: 'Fund an identity on a test network',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of identity to lookup, default test identity used if not provided',
        },
        rpcUrl: {
          type: 'string',
          description: 'RPC server endpoint',
        },
        rpcHeaders: {
          type: 'object',
          description: 'RPC Header(s) to include in requests to the RPC provider',
          additionalProperties: { type: 'string' },
        },
        networkPassphrase: {
          type: 'string',
          description: 'Network passphrase',
        },
        network: {
          type: 'string',
          description: 'Name of network to use from config',
        },
        hdPath: {
          type: 'string',
          description: 'If identity is a seed phrase use this hd path, default is 0',
        },
        configDir: {
          type: 'string',
          description: 'Location of config directory',
        },
      },
      required: [],
    },
  },
  {
    name: 'stellar_keys_list',
    description: 'List identities',
    inputSchema: {
      type: 'object',
      properties: {
        long: {
          type: 'boolean',
          description: 'Show detailed information',
        },
        configDir: {
          type: 'string',
          description: 'Location of config directory',
        },
      },
      required: [],
    },
  },
  {
    name: 'stellar_keys_remove',
    description: 'Remove an identity',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Identity to remove',
        },
        configDir: {
          type: 'string',
          description: 'Location of config directory',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'stellar_keys_secret',
    description: 'Output an identity\'s secret key',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of identity to lookup, default is test identity',
        },
        phrase: {
          type: 'boolean',
          description: 'Output seed phrase instead of private key',
        },
        hdPath: {
          type: 'string',
          description: 'If identity is a seed phrase use this hd path, default is 0',
        },
        configDir: {
          type: 'string',
          description: 'Location of config directory',
        },
      },
      required: [],
    },
  },
  {
    name: 'stellar_keys_use',
    description: 'Set the default identity for all commands',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Set the default network name',
        },
        configDir: {
          type: 'string',
          description: 'Location of config directory',
        },
      },
      required: ['name'],
    },
  },
];