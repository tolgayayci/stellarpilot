// Transaction (tx) Command Type Definitions
import { NetworkType, SigningOptions, TransactionOptions, NetworkOptions } from './index.js';

// Base transaction parameters
export interface TxBaseParams extends SigningOptions, TransactionOptions, NetworkOptions {
  sourceAccount: string;
  network: NetworkType;
}

// Payment operation parameters
export interface TxPaymentParams extends TxBaseParams {
  destination: string;
  asset: string; // 'native' or 'CODE:ISSUER'
  amount: string;
  memo?: string;
  memoType?: 'text' | 'id' | 'hash' | 'return';
}

// Create account operation parameters
export interface TxCreateAccountParams extends TxBaseParams {
  destination: string;
  startingBalance: string;
}

// Change trust operation parameters
export interface TxChangeTrustParams extends TxBaseParams {
  line: string; // Asset code:issuer
  limit?: string; // Optional limit, 0 to remove
}

// Account merge operation parameters
export interface TxAccountMergeParams extends TxBaseParams {
  accountDestination: string;
}

// Bump sequence operation parameters
export interface TxBumpSequenceParams extends TxBaseParams {
  bumpTo: string;
}

// Manage data operation parameters
export interface TxManageDataParams extends TxBaseParams {
  dataName: string;
  dataValue?: string; // If not provided, deletes the entry
}

// Set options operation parameters
export interface TxSetOptionsParams extends TxBaseParams {
  inflationDest?: string;
  clearFlags?: number;
  setFlags?: number;
  masterWeight?: number;
  lowThreshold?: number;
  medThreshold?: number;
  highThreshold?: number;
  homeDomain?: string;
  signerKey?: string;
  signerWeight?: number;
}

// Claimable balance operations
export interface TxCreateClaimableBalanceParams extends TxBaseParams {
  asset: string;
  amount: string;
  claimants: Array<{
    destination: string;
    predicate?: any; // Complex predicate structure
  }>;
}

export interface TxClaimClaimableBalanceParams extends TxBaseParams {
  balanceId: string;
}

// Clawback operations
export interface TxClawbackParams extends TxBaseParams {
  from: string;
  asset: string;
  amount: string;
}

export interface TxClawbackClaimableBalanceParams extends TxBaseParams {
  balanceId: string;
}

// Trading operations
export interface TxManageSellOfferParams extends TxBaseParams {
  selling: string;
  buying: string;
  amount: string;
  price: string;
  offerId?: string; // 0 to create new, specific ID to update/delete
}

export interface TxManageBuyOfferParams extends TxBaseParams {
  selling: string;
  buying: string;
  buyAmount: string;
  price: string;
  offerId?: string;
}

export interface TxCreatePassiveSellOfferParams extends TxBaseParams {
  selling: string;
  buying: string;
  amount: string;
  price: string;
}

// Path payment operations
export interface TxPathPaymentStrictSendParams extends TxBaseParams {
  destination: string;
  sendAsset: string;
  sendAmount: string;
  destAsset: string;
  destMin: string;
  path?: string[]; // Intermediate assets
}

export interface TxPathPaymentStrictReceiveParams extends TxBaseParams {
  destination: string;
  sendAsset: string;
  sendMax: string;
  destAsset: string;
  destAmount: string;
  path?: string[];
}

// Trustline flags operation
export interface TxSetTrustlineFlagsParams extends TxBaseParams {
  trustor: string;
  asset: string;
  setFlags?: string[];
  clearFlags?: string[];
}

// Transaction management operations
export interface TxSignParams {
  txXdr?: string; // Transaction XDR from stdin if not provided
  signWithKey?: string;
  hdPath?: string;
  signWithLab?: boolean;
  signWithLedger?: boolean;
  network?: NetworkType;
}

export interface TxSendParams {
  txXdr?: string;
  network: NetworkType;
  rpcUrl?: string;
  rpcHeaders?: Record<string, string>;
  networkPassphrase?: string;
}

export interface TxSimulateParams {
  txXdr?: string;
  network: NetworkType;
  rpcUrl?: string;
  rpcHeaders?: Record<string, string>;
  networkPassphrase?: string;
  sourceAccount?: string;
}

export interface TxHashParams {
  txXdr?: string;
  network?: NetworkType;
}

export interface TxDecodeParams {
  txXdr?: string;
  outputFormat?: 'json' | 'json-formatted';
}

export interface TxEncodeParams {
  txJson?: string;
}

export interface TxFetchParams {
  txHash: string;
  network: NetworkType;
  rpcUrl?: string;
  rpcHeaders?: Record<string, string>;
}

export interface TxEditParams {
  txXdr?: string;
  editor?: string; // Override default editor
}

export interface TxUpdateSequenceParams {
  txXdr?: string;
  sequenceNumber?: string; // Specific number or 'next' for auto-increment
  sourceAccount?: string;
  network?: NetworkType;
}

// Multi-operation transaction builder
export interface TxNewParams extends TxBaseParams {
  operation: TxOperationType;
  operationParams: any; // Specific params based on operation type
}

export type TxOperationType = 
  | 'payment'
  | 'create-account'
  | 'account-merge'
  | 'bump-sequence'
  | 'change-trust'
  | 'claim-claimable-balance'
  | 'clawback'
  | 'clawback-claimable-balance'
  | 'create-claimable-balance'
  | 'create-passive-sell-offer'
  | 'manage-buy-offer'
  | 'manage-data'
  | 'manage-sell-offer'
  | 'path-payment-strict-send'
  | 'path-payment-strict-receive'
  | 'set-options'
  | 'set-trustline-flags';

// Transaction builder result
export interface TxBuildResult {
  xdr: string;
  hash?: string;
  operations?: any[];
  fee?: string;
}

// Transaction submission result
export interface TxSubmitResult {
  hash: string;
  status: 'success' | 'failed' | 'pending';
  ledger?: number;
  result?: any;
  errorMessage?: string;
}