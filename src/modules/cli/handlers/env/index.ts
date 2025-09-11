// Env Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { EnvParams } from '../../types/env.js';

// Create executor instance
const executor = new CLIExecutor();

// Helper function to execute CLI commands
async function executeCLI(args: string[]) {
  try {
    const result = await executor.execute({
      command: args[0],
      args: args.slice(1),
      json: false,
    });
    
    return {
      content: [
        {
          type: 'text',
          text: result.stdout || 'Command executed successfully',
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
}

// Print environment variables
const handleEnv: ToolHandler = async (args: unknown) => {
  const params = args as EnvParams;
  const cliArgs = ['env'];
  
  if (params.name) cliArgs.push(params.name);
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Export all env handlers
export const ENV_HANDLERS: Record<string, ToolHandler> = {
  stellar_env: handleEnv,
};