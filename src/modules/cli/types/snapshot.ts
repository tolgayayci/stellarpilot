// Snapshot Command Type Definitions
import { NetworkOptions } from './index.js';

// Create a ledger snapshot using a history archive
export interface SnapshotCreateParams extends NetworkOptions {
  output: 'json';
  ledger?: string;
  addresses?: string[];
  wasmHashes?: string[];
  out?: string;
  archiveUrl?: string;
  configDir?: string;
}

// Result types for snapshot operations
export interface SnapshotResult {
  ledger: number;
  networkPassphrase: string;
  ledgerHeader: any;
  ledgerEntries: LedgerEntry[];
  timestamp: string;
}

export interface LedgerEntry {
  key: string;
  type: 'account' | 'trustline' | 'contract_data' | 'contract_code';
  data: any;
  lastModifiedLedgerSeq: number;
}