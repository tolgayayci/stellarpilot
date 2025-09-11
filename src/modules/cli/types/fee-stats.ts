// Fee Stats Command Type Definitions
import { NetworkOptions } from './index.js';

// Fetch network fee statistics
export interface FeeStatsParams extends NetworkOptions {
  output?: 'text' | 'json' | 'json-formatted';
}

// Result types for fee stats operations
export interface FeeStatsResult {
  lastLedger: number;
  lastLedgerBaseFee: string;
  ledgerCapacityUsage: string;
  feeCharged: FeePercentiles;
  maxFee: FeePercentiles;
  inclusionFee?: FeePercentiles;
  sorobanInclusionFee?: FeePercentiles;
}

export interface FeePercentiles {
  min: string;
  p10: string;
  p20: string;
  p30: string;
  p40: string;
  p50: string;
  p60: string;
  p70: string;
  p80: string;
  p90: string;
  p95: string;
  p99: string;
  max: string;
}