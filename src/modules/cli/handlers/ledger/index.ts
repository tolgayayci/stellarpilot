// Ledger Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { LedgerLatestParams, LedgerFetchParams } from '../../types/ledger.js';

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

// Get the latest ledger information
const handleLedgerLatest: ToolHandler = async (args: unknown) => {
  const params = args as LedgerLatestParams;
  const cliArgs = ['ledger', 'latest'];
  
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

// Fetch specific ledger information
const handleLedgerFetch: ToolHandler = async (args: unknown) => {
  const params = args as LedgerFetchParams;
  const cliArgs = ['ledger', 'fetch', params.sequence];
  
  if (params.limit !== undefined) cliArgs.push('--limit', params.limit.toString());
  if (params.rpcUrl) cliArgs.push('--rpc-url', params.rpcUrl);
  if (params.rpcHeaders) {
    Object.entries(params.rpcHeaders).forEach(([key, value]) => {
      cliArgs.push('--rpc-header', `${key}:${value}`);
    });
  }
  if (params.networkPassphrase) cliArgs.push('--network-passphrase', params.networkPassphrase);
  if (params.network) cliArgs.push('--network', params.network);
  if (params.output) cliArgs.push('--output', params.output);
  if (params.xdrFormat) cliArgs.push('--xdr-format', params.xdrFormat);
  
  return executeCLI(cliArgs);
};

// Export all ledger handlers
export const LEDGER_HANDLERS: Record<string, ToolHandler> = {
  stellar_ledger_latest: handleLedgerLatest,
  stellar_ledger_fetch: handleLedgerFetch,
};