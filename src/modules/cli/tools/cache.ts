// Cache Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const CACHE_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_cache_clean',
    description: 'Delete the cache, removing all cached data including transaction history and contract specs',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'stellar_cache_path',
    description: 'Show the location of the cache directory',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'stellar_cache_actionlog_list',
    description: 'List cached actions like transactions and simulations (experimental feature)',
    inputSchema: {
      type: 'object',
      properties: {
        long: {
          type: 'boolean',
          description: 'Show detailed information about cached actions',
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
    name: 'stellar_cache_actionlog_read',
    description: 'Read cached action details by ID (experimental feature)',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'ID of the cache entry to read',
        },
      },
      required: ['id'],
    },
  },
];