// Events Command Type Definitions
import { NetworkOptions } from './index.js';

// Watch network for contract events
export interface EventsWatchParams extends NetworkOptions {
  startLedger?: string;
  cursor?: string;
  output?: 'pretty' | 'plain' | 'json';
  count?: number;
  contractIds?: string[];
  topicFilters?: string[];
  eventType?: 'all' | 'contract' | 'system';
  configDir?: string;
}

// Result types for events operations
export interface EventsResult {
  events: ContractEvent[];
  latestLedger?: number;
  cursor?: string;
}

export interface ContractEvent {
  type: 'contract' | 'system';
  ledger: number;
  ledgerClosedAt: string;
  contractId?: string;
  id: string;
  pagingToken: string;
  topic: string[];
  value: any;
  inSuccessfulContractCall: boolean;
  txHash?: string;
}