// Plugin Command Type Definitions

// Search for CLI plugins
export interface PluginSearchParams {
  // No parameters for search command
}

// List installed plugins
export interface PluginListParams {
  // No parameters for list command
}

// Result types for plugin operations
export interface PluginSearchResult {
  plugins: PluginInfo[];
  totalCount: number;
}

export interface PluginListResult {
  plugins: InstalledPlugin[];
}

export interface PluginInfo {
  name: string;
  description?: string;
  repository?: string;
  stars?: number;
  lastUpdated?: string;
  author?: string;
  url?: string;
}

export interface InstalledPlugin {
  name: string;
  version?: string;
  status?: 'active' | 'inactive' | 'error';
  path?: string;
  description?: string;
}