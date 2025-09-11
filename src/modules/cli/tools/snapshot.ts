// Snapshot Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const SNAPSHOT_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_snapshot_create',
    description: 'Create a ledger snapshot using a history archive',
    inputSchema: {
      type: 'object',
      properties: {
        output: {
          type: 'string',
          enum: ['json'],
          description: 'Format of the output file',
        },
        ledger: {
          type: 'string',
          description: 'The ledger sequence number to snapshot. Defaults to latest history archived ledger',
        },
        addresses: {
          type: 'array',
          items: { type: 'string' },
          description: 'Account or contract addresses/aliases to include in the snapshot',
        },
        wasmHashes: {
          type: 'array',
          items: { type: 'string' },
          description: 'WASM hashes to include in the snapshot',
        },
        out: {
          type: 'string',
          description: 'Out path that the snapshot is written to (default: snapshot.json)',
        },
        archiveUrl: {
          type: 'string',
          description: 'Archive URL',
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
          description: 'Network passphrase',
        },
        network: {
          type: 'string',
          description: 'Name of network to use from config',
        },
      },
      required: ['output'],
    },
  },
];