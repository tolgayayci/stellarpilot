// Contract Command Type Definitions
import { NetworkType } from '../types/index.js';

// Deploy a smart contract
export interface ContractDeployParams {
  wasmPath?: string;
  wasmHash?: string;
  sourceAccount: string;
  network: NetworkType;
  salt?: string;
  alias?: string;
  constructorArgs?: string[];
  fee?: number;
  buildOnly?: boolean;
  ignoreChecks?: boolean;
}

// Invoke a contract function
export interface ContractInvokeParams {
  contractId: string;
  sourceAccount: string;
  network: NetworkType;
  functionName: string;
  functionArgs?: Record<string, any>;
  send?: 'default' | 'no' | 'yes';
  fee?: number;
  buildOnly?: boolean;
}

// Build a contract project
export interface ContractBuildParams {
  manifestPath?: string;
  package?: string;
  profile?: string;
  features?: string[];
  allFeatures?: boolean;
  noDefaultFeatures?: boolean;
  outDir?: string;
  printCommandsOnly?: boolean;
  meta?: Record<string, string>;
}

// Initialize a new contract project
export interface ContractInitParams {
  projectPath: string;
  name?: string;
  overwrite?: boolean;
}

// Manage contract aliases
export interface ContractAliasParams {
  action: 'add' | 'remove' | 'show' | 'list';
  alias?: string;
  contractId?: string;
  overwrite?: boolean;
  network?: NetworkType;
}

// Deploy Stellar Asset Contract
export interface ContractAssetDeployParams {
  asset: string;
  sourceAccount: string;
  network: NetworkType;
  alias?: string;
  fee?: number;
  buildOnly?: boolean;
}

// Generate contract bindings
export interface ContractBindingsParams {
  language: 'json' | 'rust' | 'typescript' | 'python' | 'java' | 'flutter' | 'swift' | 'php';
  wasm?: string;
  wasmHash?: string;
  contractId?: string;
  outputDir?: string;
  overwrite?: boolean;
  network?: NetworkType;
}

// Optimize WASM contracts
export interface ContractOptimizeParams {
  wasmPaths: string[];
  wasmOut?: string;
}

// Get contract information
export interface ContractInfoParams {
  subcommand: 'interface' | 'meta' | 'env-meta' | 'build';
  wasm?: string;
  wasmHash?: string;
  contractId?: string;
  output?: 'rust' | 'xdr-base64' | 'json' | 'json-formatted' | 'text';
  network?: NetworkType;
}

// Extend contract storage
export interface ContractExtendParams {
  ledgersToExtend: number;
  sourceAccount: string;
  network: NetworkType;
  contractId?: string;
  key?: string;
  keyXdr?: string;
  durability?: 'persistent' | 'temporary';
  ttlLedgerOnly?: boolean;
  fee?: number;
  buildOnly?: boolean;
}

// Restore expired contract storage
export interface ContractRestoreParams {
  sourceAccount: string;
  network: NetworkType;
  contractId?: string;
  key?: string;
  keyXdr?: string;
  durability?: 'persistent' | 'temporary';
  ledgersToExtend?: number;
  ttlLedgerOnly?: boolean;
  fee?: number;
  buildOnly?: boolean;
}

// Read contract storage
export interface ContractReadParams {
  contractId?: string;
  key?: string;
  keyXdr?: string;
  durability?: 'persistent' | 'temporary';
  output?: 'string' | 'json' | 'xdr';
  network: NetworkType;
}

// Fetch contract WASM
export interface ContractFetchParams {
  contractId: string;
  outFile?: string;
  network: NetworkType;
}

// Upload contract WASM
export interface ContractUploadParams {
  sourceAccount: string;
  wasm: string;
  network: NetworkType;
  ignoreChecks?: boolean;
  fee?: number;
  buildOnly?: boolean;
}

// Get contract ID
export interface ContractIdParams {
  subcommand: 'asset' | 'wasm';
  asset?: string; // For asset subcommand
  salt?: string; // For wasm subcommand
  sourceAccount?: string; // For wasm subcommand
  network: NetworkType;
}

// Result types for contract operations
export interface ContractDeployResult {
  contractId: string;
  transactionHash?: string;
  status?: string;
}

export interface ContractInvokeResult {
  result: any;
  transactionHash?: string;
  status?: string;
}