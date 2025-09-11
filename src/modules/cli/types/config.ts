// Config Command Type Definitions

// Base config parameters
export interface ConfigBaseParams {
  global?: boolean;
  configDir?: string;
}

// Migrate the local configuration to the global directory
export interface ConfigMigrateParams extends ConfigBaseParams {}

// Show the global configuration directory
export interface ConfigDirParams extends ConfigBaseParams {}

// Result types for config operations
export interface ConfigDirResult {
  directory: string;
  exists: boolean;
  contents?: {
    networks?: string[];
    identities?: string[];
    hasCache?: boolean;
    hasConfig?: boolean;
  };
}

export interface ConfigMigrateResult {
  status: 'success' | 'already_migrated' | 'failed';
  from?: string;
  to?: string;
  migratedItems?: string[];
  message?: string;
}