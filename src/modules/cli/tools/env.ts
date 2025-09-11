// Env Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const ENV_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_env',
    description: 'Print environment variables in .env format or get specific variable value',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Env variable name to get the value of (e.g., STELLAR_ACCOUNT, STELLAR_NETWORK)',
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