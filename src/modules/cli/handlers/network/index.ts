// Network Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import {
  NetworkAddParams,
  NetworkRemoveParams,
  NetworkListParams,
  NetworkUseParams,
  NetworkHealthParams,
  NetworkInfoParams,
  NetworkSettingsParams,
} from '../../types/network.js';

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

// Add a new network
const handleNetworkAdd: ToolHandler = async (args: unknown) => {
  const params = args as NetworkAddParams;
  const cliArgs = ['network', 'add', params.name];
  
  cliArgs.push('--rpc-url', params.rpcUrl);
  cliArgs.push('--network-passphrase', params.networkPassphrase);
  
  if (params.rpcHeaders) {
    Object.entries(params.rpcHeaders).forEach(([key, value]) => {
      cliArgs.push('--rpc-header', `${key}:${value}`);
    });
  }
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Remove a network
const handleNetworkRemove: ToolHandler = async (args: unknown) => {
  const params = args as NetworkRemoveParams;
  const cliArgs = ['network', 'rm', params.name];
  
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// List networks
const handleNetworkList: ToolHandler = async (args: unknown) => {
  const params = args as NetworkListParams;
  const cliArgs = ['network', 'ls'];
  
  if (params.long) cliArgs.push('--long');
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Set default network
const handleNetworkUse: ToolHandler = async (args: unknown) => {
  const params = args as NetworkUseParams;
  const cliArgs = ['network', 'use', params.name];
  
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Check network health
const handleNetworkHealth: ToolHandler = async (args: unknown) => {
  const params = args as NetworkHealthParams;
  const cliArgs = ['network', 'health'];
  
  if (params.rpcUrl) cliArgs.push('--rpc-url', params.rpcUrl);
  if (params.rpcHeaders) {
    Object.entries(params.rpcHeaders).forEach(([key, value]) => {
      cliArgs.push('--rpc-header', `${key}:${value}`);
    });
  }
  if (params.networkPassphrase) cliArgs.push('--network-passphrase', params.networkPassphrase);
  if (params.network) cliArgs.push('--network', params.network);
  if (params.output) cliArgs.push('--output', params.output);
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Get network info
const handleNetworkInfo: ToolHandler = async (args: unknown) => {
  const params = args as NetworkInfoParams;
  const cliArgs = ['network', 'info'];
  
  if (params.rpcUrl) cliArgs.push('--rpc-url', params.rpcUrl);
  if (params.rpcHeaders) {
    Object.entries(params.rpcHeaders).forEach(([key, value]) => {
      cliArgs.push('--rpc-header', `${key}:${value}`);
    });
  }
  if (params.networkPassphrase) cliArgs.push('--network-passphrase', params.networkPassphrase);
  if (params.network) cliArgs.push('--network', params.network);
  if (params.output) cliArgs.push('--output', params.output);
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Get network settings
const handleNetworkSettings: ToolHandler = async (args: unknown) => {
  const params = args as NetworkSettingsParams;
  const cliArgs = ['network', 'settings'];
  
  if (params.rpcUrl) cliArgs.push('--rpc-url', params.rpcUrl);
  if (params.rpcHeaders) {
    Object.entries(params.rpcHeaders).forEach(([key, value]) => {
      cliArgs.push('--rpc-header', `${key}:${value}`);
    });
  }
  if (params.networkPassphrase) cliArgs.push('--network-passphrase', params.networkPassphrase);
  if (params.network) cliArgs.push('--network', params.network);
  if (params.internal) cliArgs.push('--internal');
  if (params.output) cliArgs.push('--output', params.output);
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Export all network handlers
export const NETWORK_HANDLERS: Record<string, ToolHandler> = {
  stellar_network_add: handleNetworkAdd,
  stellar_network_remove: handleNetworkRemove,
  stellar_network_list: handleNetworkList,
  stellar_network_use: handleNetworkUse,
  stellar_network_health: handleNetworkHealth,
  stellar_network_info: handleNetworkInfo,
  stellar_network_settings: handleNetworkSettings,
};