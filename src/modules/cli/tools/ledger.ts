// Ledger Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const LEDGER_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_ledger_latest',
    description: 'Get the latest ledger sequence and information from the network',
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
      },
      required: [],
    },
  },
  {
    name: 'stellar_ledger_fetch',
    description: 'Fetch specific ledger information by sequence number',
    inputSchema: {
      type: 'object',
      properties: {
        sequence: {
          type: 'string',
          description: 'Ledger sequence to start fetch (inclusive)',
        },
        limit: {
          type: 'number',
          description: 'Number of ledgers to fetch (default: 1)',
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
        output: {
          type: 'string',
          enum: ['text', 'json', 'json-formatted'],
          description: 'Format of the output',
        },
        xdrFormat: {
          type: 'string',
          enum: ['json', 'xdr'],
          description: 'Format of the XDR in the output',
        },
      },
      required: ['sequence'],
    },
  },
];