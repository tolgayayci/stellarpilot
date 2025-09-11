// Events Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const EVENTS_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_events_watch',
    description: 'Watch the network for contract events',
    inputSchema: {
      type: 'object',
      properties: {
        startLedger: {
          type: 'string',
          description: 'The first ledger sequence number in the range to pull events',
        },
        cursor: {
          type: 'string',
          description: 'The cursor corresponding to the start of the event range',
        },
        output: {
          type: 'string',
          enum: ['pretty', 'plain', 'json'],
          description: 'Output formatting options for event stream',
        },
        count: {
          type: 'number',
          description: 'The maximum number of events to display (default: 10)',
        },
        contractIds: {
          type: 'array',
          items: { type: 'string' },
          description: 'A set of (up to 5) contract IDs to filter events on',
          maxItems: 5,
        },
        topicFilters: {
          type: 'array',
          items: { type: 'string' },
          description: 'A set of (up to 4) topic filters to filter event topics on',
          maxItems: 4,
        },
        eventType: {
          type: 'string',
          enum: ['all', 'contract', 'system'],
          description: 'Specifies which type of contract events to display',
        },
        configDir: {
          type: 'string',
          description: 'Location of config directory',
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
          description: 'Network passphrase to sign the transaction sent to the rpc server',
        },
        network: {
          type: 'string',
          description: 'Name of network to use from config',
        },
      },
      required: [],
    },
  },
];