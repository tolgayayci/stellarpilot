// Network Command Type Definitions

// Base network parameters with common options
export interface NetworkBaseParams {
  global?: boolean;
  configDir?: string;
}

// Add a new network
export interface NetworkAddParams extends NetworkBaseParams {
  name: string;
  rpcUrl: string;
  networkPassphrase: string;
  rpcHeaders?: Record<string, string>;
}

// Remove a network
export interface NetworkRemoveParams extends NetworkBaseParams {
  name: string;
}

// List networks
export interface NetworkListParams extends NetworkBaseParams {
  long?: boolean;
}

// Set the default network
export interface NetworkUseParams extends NetworkBaseParams {
  name: string;
}

// Check network health
export interface NetworkHealthParams extends NetworkBaseParams {
  rpcUrl?: string;
  rpcHeaders?: Record<string, string>;
  networkPassphrase?: string;
  network?: string;
  output?: 'text' | 'json' | 'json-formatted';
}

// Get network info
export interface NetworkInfoParams extends NetworkBaseParams {
  rpcUrl?: string;
  rpcHeaders?: Record<string, string>;
  networkPassphrase?: string;
  network?: string;
  output?: 'text' | 'json' | 'json-formatted';
}

// Get network settings
export interface NetworkSettingsParams extends NetworkBaseParams {
  rpcUrl?: string;
  rpcHeaders?: Record<string, string>;
  networkPassphrase?: string;
  network?: string;
  internal?: boolean;
  output?: 'xdr' | 'json' | 'json-formatted';
}

// Result types for network operations
export interface NetworkListResult {
  networks: Array<{
    name: string;
    rpcUrl?: string;
    networkPassphrase?: string;
    isDefault?: boolean;
  }>;
}

export interface NetworkHealthResult {
  status: 'healthy' | 'unhealthy' | 'unknown';
  latestLedger?: number;
  protocolVersion?: number;
  message?: string;
}

export interface NetworkInfoResult {
  network: string;
  rpcUrl: string;
  networkPassphrase: string;
  protocolVersion?: number;
  coreVersion?: string;
  horizonVersion?: string;
  latestLedger?: number;
}

export interface NetworkSettingsResult {
  settings: any; // Complex config upgrade set structure
  internal?: any; // Internal settings if requested
}