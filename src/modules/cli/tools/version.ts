// Version Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const VERSION_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_version',
    description: 'Print version information for the Stellar CLI',
    inputSchema: {
      type: 'object',
      properties: {
        onlyVersion: {
          type: 'boolean',
          description: 'Print only the version number',
        },
        onlyVersionMajor: {
          type: 'boolean',
          description: 'Print only the major version number',
        },
      },
      required: [],
    },
  },
];