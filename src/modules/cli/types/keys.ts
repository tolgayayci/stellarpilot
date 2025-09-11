// Keys Command Type Definitions
import { NetworkOptions } from './index.js';

// Base keys parameters with common options
export interface KeysBaseParams {
  hdPath?: string;
  global?: boolean;
  configDir?: string;
}

// Generate a new identity using a 24-word seed phrase
export interface KeysGenerateParams extends KeysBaseParams, NetworkOptions {
  name: string;
  seed?: string;
  asSecret?: boolean;
  secureStore?: boolean;
  fund?: boolean;
  overwrite?: boolean;
}

// Add a new identity (keypair, ledger, OS specific secure store)
export interface KeysAddParams extends KeysBaseParams {
  name: string;
  secretKey?: boolean;
  seedPhrase?: boolean;
  secureStore?: boolean;
  publicKey?: string;
}

// Given an identity return its address (public key)
export interface KeysPublicKeyParams extends KeysBaseParams {
  name?: string;
}

// Fund an identity on a test network
export interface KeysFundParams extends KeysBaseParams, NetworkOptions {
  name?: string;
}

// List identities
export interface KeysListParams extends KeysBaseParams {
  long?: boolean;
}

// Remove an identity
export interface KeysRemoveParams extends KeysBaseParams {
  name: string;
}

// Output an identity's secret key
export interface KeysSecretParams extends KeysBaseParams {
  name?: string;
  phrase?: boolean;
}

// Set the default identity for all commands
export interface KeysUseParams extends KeysBaseParams {
  name: string;
}

// Result types for keys operations
export interface KeysGenerateResult {
  publicKey: string;
  secretKey?: string;
  seedPhrase?: string;
  funded?: boolean;
}

export interface KeysListResult {
  identities: Array<{
    name: string;
    publicKey: string;
    type: 'secret' | 'seed' | 'public' | 'secure';
    isDefault?: boolean;
    hdPath?: string;
  }>;
}

export interface KeysFundResult {
  publicKey: string;
  funded: boolean;
  balance?: string;
  transactionHash?: string;
}

export interface KeysPublicKeyResult {
  publicKey: string;
  name?: string;
}

export interface KeysSecretResult {
  secretKey?: string;
  seedPhrase?: string;
  name?: string;
}