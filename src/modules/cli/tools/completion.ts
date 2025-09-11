// Completion Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const COMPLETION_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_completion',
    description: 'Print shell completion code for the specified shell',
    inputSchema: {
      type: 'object',
      properties: {
        shell: {
          type: 'string',
          enum: ['bash', 'elvish', 'fish', 'powershell', 'zsh'],
          description: 'The shell type for which to generate completion code',
        },
      },
      required: ['shell'],
    },
  },
];