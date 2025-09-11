// Events Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { EventsWatchParams } from '../../types/events.js';

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

// Watch network for contract events
const handleEventsWatch: ToolHandler = async (args: unknown) => {
  const params = args as EventsWatchParams;
  const cliArgs = ['events'];
  
  if (params.startLedger) cliArgs.push('--start-ledger', params.startLedger);
  if (params.cursor) cliArgs.push('--cursor', params.cursor);
  if (params.output) cliArgs.push('--output', params.output);
  if (params.count !== undefined) cliArgs.push('--count', params.count.toString());
  if (params.contractIds) {
    params.contractIds.forEach(id => {
      cliArgs.push('--id', id);
    });
  }
  if (params.topicFilters) {
    params.topicFilters.forEach(filter => {
      cliArgs.push('--topic', filter);
    });
  }
  if (params.eventType) cliArgs.push('--type', params.eventType);
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

// Export all events handlers
export const EVENTS_HANDLERS: Record<string, ToolHandler> = {
  stellar_events_watch: handleEventsWatch,
};