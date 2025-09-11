// Cache Command Type Definitions

// Base cache parameters
export interface CacheBaseParams {
  global?: boolean;
  configDir?: string;
}

// Delete the cache
export interface CacheCleanParams {}

// Show the location of the cache
export interface CachePathParams {}

// List cached actions
export interface CacheActionLogListParams extends CacheBaseParams {
  long?: boolean;
}

// Read cached action details
export interface CacheActionLogReadParams {
  id: string;
}

// Result types for cache operations
export interface CachePathResult {
  path: string;
  exists: boolean;
  size?: number;
}

export interface CacheCleanResult {
  status: 'success' | 'failed';
  deletedItems?: number;
  freedSpace?: number;
  message?: string;
}

export interface CacheActionLogEntry {
  id: string;
  type: 'transaction' | 'simulation';
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
  network?: string;
  account?: string;
  details?: any;
}

export interface CacheActionLogListResult {
  entries: CacheActionLogEntry[];
  total: number;
}

export interface CacheActionLogReadResult {
  entry: CacheActionLogEntry;
  fullDetails: any;
}