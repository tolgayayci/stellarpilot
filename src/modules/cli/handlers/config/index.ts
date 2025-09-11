// Config Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { ConfigDirParams, ConfigMigrateParams } from '../../types/config.js';

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

// Show the global configuration directory
const handleConfigDir: ToolHandler = async (args: unknown) => {
  const params = args as ConfigDirParams;
  const cliArgs = ['config', 'dir'];
  
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Migrate local configuration to global directory
const handleConfigMigrate: ToolHandler = async (args: unknown) => {
  const params = args as ConfigMigrateParams;
  const cliArgs = ['config', 'migrate'];
  
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Export all config handlers
export const CONFIG_HANDLERS: Record<string, ToolHandler> = {
  stellar_config_dir: handleConfigDir,
  stellar_config_migrate: handleConfigMigrate,
};