// Plugin Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const PLUGIN_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_plugin_search',
    description: 'Search for CLI plugins using GitHub',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'stellar_plugin_list',
    description: 'List installed plugins',
    inputSchema: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
];