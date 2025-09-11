// Version Command Type Definitions

// Print version information
export interface VersionParams {
  onlyVersion?: boolean;
  onlyVersionMajor?: boolean;
}

// Result types for version operations
export interface VersionResult {
  version?: string;
  majorVersion?: string;
  fullInfo?: string;
  gitCommit?: string;
  buildDate?: string;
  rustVersion?: string;
  platform?: string;
}