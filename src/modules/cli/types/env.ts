// Env Command Type Definitions

// Print environment variables
export interface EnvParams {
  name?: string;
  global?: boolean;
  configDir?: string;
}

// Result types for env operations
export interface EnvResult {
  variables: Record<string, string>;
  source: 'environment' | 'defaults' | 'mixed';
}

export interface EnvSingleResult {
  name: string;
  value: string;
  source: 'environment' | 'default';
}