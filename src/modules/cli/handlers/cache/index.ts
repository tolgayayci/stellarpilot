// Cache Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { 
  CacheCleanParams,
  CachePathParams,
  CacheActionLogListParams,
  CacheActionLogReadParams 
} from '../../types/cache.js';

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

// Delete the cache
const handleCacheClean: ToolHandler = async (args: unknown) => {
  const cliArgs = ['cache', 'clean'];
  return executeCLI(cliArgs);
};

// Show cache location
const handleCachePath: ToolHandler = async (args: unknown) => {
  const cliArgs = ['cache', 'path'];
  return executeCLI(cliArgs);
};

// List cached actions
const handleCacheActionLogList: ToolHandler = async (args: unknown) => {
  const params = args as CacheActionLogListParams;
  const cliArgs = ['cache', 'actionlog', 'ls'];
  
  if (params.long) cliArgs.push('--long');
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Read cached action details
const handleCacheActionLogRead: ToolHandler = async (args: unknown) => {
  const params = args as CacheActionLogReadParams;
  const cliArgs = ['cache', 'actionlog', 'read', '--id', params.id];
  
  return executeCLI(cliArgs);
};

// Export all cache handlers
export const CACHE_HANDLERS: Record<string, ToolHandler> = {
  stellar_cache_clean: handleCacheClean,
  stellar_cache_path: handleCachePath,
  stellar_cache_actionlog_list: handleCacheActionLogList,
  stellar_cache_actionlog_read: handleCacheActionLogRead,
};