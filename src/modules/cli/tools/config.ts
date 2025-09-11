// Config Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const CONFIG_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_config_dir',
    description: 'Show the global configuration directory location and contents',
    inputSchema: {
      type: 'object',
      properties: {
        configDir: {
          type: 'string',
          description: 'Location of config directory. By default, it uses $XDG_CONFIG_HOME/stellar if set, falling back to ~/.config/stellar otherwise',
        },
      },
      required: [],
    },
  },
  {
    name: 'stellar_config_migrate',
    description: 'Migrate the local configuration to the global directory',
    inputSchema: {
      type: 'object',
      properties: {
        configDir: {
          type: 'string',
          description: 'Location of config directory. By default, it uses $XDG_CONFIG_HOME/stellar if set, falling back to ~/.config/stellar otherwise',
        },
      },
      required: [],
    },
  },
];