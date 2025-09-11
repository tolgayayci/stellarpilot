// Fee Stats Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const FEE_STATS_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_fee_stats',
    description: 'Fetch network fee statistics for transaction planning and cost estimation',
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
];