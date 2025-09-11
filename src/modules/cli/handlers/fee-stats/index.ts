// Fee Stats Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { FeeStatsParams } from '../../types/fee-stats.js';

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

// Fetch network fee statistics
const handleFeeStats: ToolHandler = async (args: unknown) => {
  const params = args as FeeStatsParams;
  const cliArgs = ['fee-stats'];
  
  if (params.rpcUrl) cliArgs.push('--rpc-url', params.rpcUrl);
  if (params.rpcHeaders) {
    Object.entries(params.rpcHeaders).forEach(([key, value]) => {
      cliArgs.push('--rpc-header', `${key}:${value}`);
    });
  }
  if (params.networkPassphrase) cliArgs.push('--network-passphrase', params.networkPassphrase);
  if (params.network) cliArgs.push('--network', params.network);
  if (params.output) cliArgs.push('--output', params.output);
  
  return executeCLI(cliArgs);
};

// Export all fee stats handlers
export const FEE_STATS_HANDLERS: Record<string, ToolHandler> = {
  stellar_fee_stats: handleFeeStats,
};