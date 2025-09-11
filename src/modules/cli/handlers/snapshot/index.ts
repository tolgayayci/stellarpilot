// Snapshot Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { SnapshotCreateParams } from '../../types/snapshot.js';

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

// Create a ledger snapshot
const handleSnapshotCreate: ToolHandler = async (args: unknown) => {
  const params = args as SnapshotCreateParams;
  const cliArgs = ['snapshot', 'create'];
  
  // Required output format
  cliArgs.push('--output', params.output);
  
  if (params.ledger) cliArgs.push('--ledger', params.ledger);
  if (params.addresses) {
    params.addresses.forEach(address => {
      cliArgs.push('--address', address);
    });
  }
  if (params.wasmHashes) {
    params.wasmHashes.forEach(hash => {
      cliArgs.push('--wasm-hash', hash);
    });
  }
  if (params.out) cliArgs.push('--out', params.out);
  if (params.archiveUrl) cliArgs.push('--archive-url', params.archiveUrl);
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  if (params.rpcUrl) cliArgs.push('--rpc-url', params.rpcUrl);
  if (params.rpcHeaders) {
    Object.entries(params.rpcHeaders).forEach(([key, value]) => {
      cliArgs.push('--rpc-header', `${key}:${value}`);
    });
  }
  if (params.networkPassphrase) cliArgs.push('--network-passphrase', params.networkPassphrase);
  if (params.network) cliArgs.push('--network', params.network);
  
  return executeCLI(cliArgs);
};

// Export all snapshot handlers
export const SNAPSHOT_HANDLERS: Record<string, ToolHandler> = {
  stellar_snapshot_create: handleSnapshotCreate,
};