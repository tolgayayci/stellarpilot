// Ledger Command Type Definitions
import { NetworkOptions } from './index.js';

// Get the latest ledger information
export interface LedgerLatestParams extends NetworkOptions {
  output?: 'text' | 'json' | 'json-formatted';
}

// Fetch specific ledger information
export interface LedgerFetchParams extends NetworkOptions {
  sequence: string;
  limit?: number;
  output?: 'text' | 'json' | 'json-formatted';
  xdrFormat?: 'json' | 'xdr';
}

// Result types for ledger operations
export interface LedgerInfo {
  sequence: number;
  hash: string;
  previousHash: string;
  timestamp: string;
  closedAt: string;
  transactionCount: number;
  operationCount: number;
  protocolVersion: number;
  baseFee: string;
  baseReserve: string;
  maxTxSetSize: number;
  headerXdr?: string;
  metadataXdr?: string;
  headerJson?: any;
  metadataJson?: any;
}

export interface LedgerLatestResult {
  ledger: LedgerInfo;
  latestLedger: number;
  protocolVersion: number;
}

export interface LedgerFetchResult {
  ledgers: LedgerInfo[];
  startSequence: number;
  endSequence: number;
  count: number;
}