// Doctor Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const DOCTOR_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_doctor',
    description: 'Diagnose and troubleshoot CLI and network issues, checking for common problems',
    inputSchema: {
      type: 'object',
      properties: {
        configDir: {
          type: 'string',
          description: 'Location of config directory',
        },
      },
      required: [],
    },
  },
];