// CLI Module Main Export
import { ModuleDefinition } from '../../types/index.js';
import { CLI_TOOLS } from './tools/index.js';
import { CLI_HANDLERS } from './handlers/index.js';

export const CLIModule: ModuleDefinition = {
  tools: CLI_TOOLS,
  handlers: CLI_HANDLERS,
};

// Re-export components for direct access
export { CLI_TOOLS } from './tools/index.js';
export { CLI_HANDLERS } from './handlers/index.js';
export { CLIExecutor } from './utils/executor.js';
export { CLIParser } from './utils/parser.js';
export * from './types/index.js';