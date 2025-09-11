// Keys Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import {
  KeysGenerateParams,
  KeysAddParams,
  KeysPublicKeyParams,
  KeysFundParams,
  KeysListParams,
  KeysRemoveParams,
  KeysSecretParams,
  KeysUseParams,
} from '../../types/keys.js';

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

// Generate a new identity using a 24-word seed phrase
const handleKeysGenerate: ToolHandler = async (args: unknown) => {
  const params = args as KeysGenerateParams;
  const cliArgs = ['keys', 'generate', params.name];
  
  if (params.seed) cliArgs.push('--seed', params.seed);
  if (params.asSecret) cliArgs.push('--as-secret');
  if (params.secureStore) cliArgs.push('--secure-store');
  if (params.hdPath) cliArgs.push('--hd-path', params.hdPath);
  if (params.fund) cliArgs.push('--fund');
  if (params.overwrite) cliArgs.push('--overwrite');
  if (params.network) cliArgs.push('--network', params.network);
  if (params.rpcUrl) cliArgs.push('--rpc-url', params.rpcUrl);
  if (params.networkPassphrase) cliArgs.push('--network-passphrase', params.networkPassphrase);
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Add a new identity
const handleKeysAdd: ToolHandler = async (args: unknown) => {
  const params = args as KeysAddParams;
  const cliArgs = ['keys', 'add', params.name];
  
  if (params.secretKey) cliArgs.push('--secret-key');
  if (params.seedPhrase) cliArgs.push('--seed-phrase');
  if (params.secureStore) cliArgs.push('--secure-store');
  if (params.publicKey) cliArgs.push('--public-key', params.publicKey);
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Get public key for an identity
const handleKeysPublicKey: ToolHandler = async (args: unknown) => {
  const params = args as KeysPublicKeyParams;
  const cliArgs = ['keys', 'public-key'];
  
  if (params.name) cliArgs.push(params.name);
  if (params.hdPath) cliArgs.push('--hd-path', params.hdPath);
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Fund an identity on a test network
const handleKeysFund: ToolHandler = async (args: unknown) => {
  const params = args as KeysFundParams;
  const cliArgs = ['keys', 'fund'];
  
  if (params.name) cliArgs.push(params.name);
  if (params.rpcUrl) cliArgs.push('--rpc-url', params.rpcUrl);
  if (params.rpcHeaders) {
    Object.entries(params.rpcHeaders).forEach(([key, value]) => {
      cliArgs.push('--rpc-header', `${key}:${value}`);
    });
  }
  if (params.networkPassphrase) cliArgs.push('--network-passphrase', params.networkPassphrase);
  if (params.network) cliArgs.push('--network', params.network);
  if (params.hdPath) cliArgs.push('--hd-path', params.hdPath);
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// List identities
const handleKeysList: ToolHandler = async (args: unknown) => {
  const params = args as KeysListParams;
  const cliArgs = ['keys', 'ls'];
  
  if (params.long) cliArgs.push('--long');
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Remove an identity
const handleKeysRemove: ToolHandler = async (args: unknown) => {
  const params = args as KeysRemoveParams;
  const cliArgs = ['keys', 'rm', params.name];
  
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Output an identity's secret key
const handleKeysSecret: ToolHandler = async (args: unknown) => {
  const params = args as KeysSecretParams;
  const cliArgs = ['keys', 'secret'];
  
  if (params.name) cliArgs.push(params.name);
  if (params.phrase) cliArgs.push('--phrase');
  if (params.hdPath) cliArgs.push('--hd-path', params.hdPath);
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Set the default identity for all commands
const handleKeysUse: ToolHandler = async (args: unknown) => {
  const params = args as KeysUseParams;
  const cliArgs = ['keys', 'use', params.name];
  
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Export all keys handlers
export const KEYS_HANDLERS: Record<string, ToolHandler> = {
  stellar_keys_generate: handleKeysGenerate,
  stellar_keys_add: handleKeysAdd,
  stellar_keys_public_key: handleKeysPublicKey,
  stellar_keys_fund: handleKeysFund,
  stellar_keys_list: handleKeysList,
  stellar_keys_remove: handleKeysRemove,
  stellar_keys_secret: handleKeysSecret,
  stellar_keys_use: handleKeysUse,
};