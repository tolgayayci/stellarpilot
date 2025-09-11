// Network Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const NETWORK_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_network_add',
    description: 'Add a new network configuration',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of network',
        },
        rpcUrl: {
          type: 'string',
          description: 'RPC server endpoint',
        },
        networkPassphrase: {
          type: 'string',
          description: 'Network passphrase to sign transactions',
        },
        rpcHeaders: {
          type: 'object',
          description: 'Optional headers (e.g. API Key) to include in requests to the RPC',
          additionalProperties: { type: 'string' },
        },
        configDir: {
          type: 'string',
          description: 'Location of config directory',
        },
      },
      required: ['name', 'rpcUrl', 'networkPassphrase'],
    },
  },
  {
    name: 'stellar_network_remove',
    description: 'Remove a network configuration',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Network to remove',
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
    name: 'stellar_network_list',
    description: 'List configured networks',
    inputSchema: {
      type: 'object',
      properties: {
        long: {
          type: 'boolean',
          description: 'Get more info about the networks',
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
    name: 'stellar_network_use',
    description: 'Set the default network for all commands',
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
  {
    name: 'stellar_network_health',
    description: 'Check the health of the configured RPC',
    inputSchema: {
      type: 'object',
      properties: {
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
        output: {
          type: 'string',
          enum: ['text', 'json', 'json-formatted'],
          description: 'Format of the output',
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
    name: 'stellar_network_info',
    description: 'Get detailed information about the network',
    inputSchema: {
      type: 'object',
      properties: {
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
        output: {
          type: 'string',
          enum: ['text', 'json', 'json-formatted'],
          description: 'Format of the output',
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
    name: 'stellar_network_settings',
    description: 'Fetch the network\'s config settings',
    inputSchema: {
      type: 'object',
      properties: {
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
        internal: {
          type: 'boolean',
          description: 'Include internal config settings that are not upgradeable',
        },
        output: {
          type: 'string',
          enum: ['xdr', 'json', 'json-formatted'],
          description: 'Format of the output',
        },
        configDir: {
          type: 'string',
          description: 'Location of config directory',
        },
      },
      required: [],
    },
  },
];