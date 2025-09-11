// CLI Module Base Type Definitions

export interface CLIExecutorOptions {
  command: string;
  args: string[];
  cwd?: string;
  env?: Record<string, string>;
  timeout?: number;
  json?: boolean; // Whether to parse output as JSON
}

export interface CLIExecutorResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  parsed?: any; // Parsed JSON output if applicable
}

export type NetworkType = 'testnet' | 'mainnet' | 'futurenet' | 'local';

export interface CLICommandContext {
  network?: NetworkType;
  sourceAccount?: string;
  rpcUrl?: string;
  horizonUrl?: string;
  configDir?: string;
}

// Signing options that can be added to any transaction command
export interface SigningOptions {
  signWithKey?: string;
  hdPath?: string;
  signWithLab?: boolean;
  signWithLedger?: boolean;
}

// Common transaction options
export interface TransactionOptions {
  fee?: number;
  cost?: boolean;
  instructions?: number;
  buildOnly?: boolean;
}

// Network configuration options
export interface NetworkOptions {
  rpcUrl?: string;
  rpcHeaders?: Record<string, string>;
  networkPassphrase?: string;
  network?: NetworkType;
  horizonUrl?: string;
}

// Combined options for commands
export type ContractCommandOptions = 
  & CLICommandContext 
  & SigningOptions 
  & TransactionOptions 
  & NetworkOptions;

// Re-export all type modules
export * from './contract.js';
export * from './tx.js';
export * from './keys.js';
export * from './network.js';
export * from './events.js';
export * from './ledger.js';
export * from './fee-stats.js';
export * from './snapshot.js';
export * from './container.js';
export * from './xdr.js';
export * from './config.js';
export * from './env.js';
export * from './cache.js';
export * from './doctor.js';
export * from './completion.js';
export * from './version.js';
export * from './plugin.js';