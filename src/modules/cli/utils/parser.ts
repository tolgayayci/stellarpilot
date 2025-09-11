// CLI Argument Parser
import { 
  NetworkType, 
  SigningOptions, 
  TransactionOptions, 
  NetworkOptions 
} from '../types/index.js';

export class CLIParser {
  /**
   * Build command arguments from parameters
   */
  static buildArgs(params: Record<string, any>): string[] {
    const args: string[] = [];

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;

      const flag = this.paramToFlag(key);
      
      if (typeof value === 'boolean') {
        if (value) {
          args.push(flag);
        }
      } else if (Array.isArray(value)) {
        // Handle array values (e.g., multiple features)
        value.forEach(item => {
          args.push(flag, String(item));
        });
      } else if (typeof value === 'object') {
        // Handle object values (e.g., meta tags)
        for (const [subKey, subValue] of Object.entries(value)) {
          args.push(flag, `${subKey}=${subValue}`);
        }
      } else {
        args.push(flag, String(value));
      }
    }

    return args;
  }

  /**
   * Convert camelCase parameter to CLI flag
   */
  static paramToFlag(param: string): string {
    // Special cases mapping
    const specialCases: Record<string, string> = {
      'sourceAccount': '--source-account',
      'wasmPath': '--wasm',
      'wasmHash': '--wasm-hash',
      'contractId': '--id',
      'buildOnly': '--build-only',
      'ignoreChecks': '--ignore-checks',
      'allFeatures': '--all-features',
      'noDefaultFeatures': '--no-default-features',
      'printCommandsOnly': '--print-commands-only',
      'outDir': '--out-dir',
      'outFile': '--out-file',
      'outputDir': '--output-dir',
      'manifestPath': '--manifest-path',
      'rpcUrl': '--rpc-url',
      'rpcHeaders': '--rpc-header',
      'networkPassphrase': '--network-passphrase',
      'signWithKey': '--sign-with-key',
      'signWithLab': '--sign-with-lab',
      'signWithLedger': '--sign-with-ledger',
      'hdPath': '--hd-path',
      'keyXdr': '--key-xdr',
      'ttlLedgerOnly': '--ttl-ledger-only',
      'ledgersToExtend': '--ledgers-to-extend',
    };

    if (specialCases[param]) {
      return specialCases[param];
    }

    // Convert camelCase to kebab-case
    const kebab = param.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `--${kebab}`;
  }

  /**
   * Add network options to arguments
   */
  static addNetworkOptions(args: string[], options: NetworkOptions): void {
    if (options.network) {
      args.push('--network', options.network);
    }
    if (options.rpcUrl) {
      args.push('--rpc-url', options.rpcUrl);
    }
    if (options.rpcHeaders) {
      for (const [key, value] of Object.entries(options.rpcHeaders)) {
        args.push('--rpc-header', `${key}: ${value}`);
      }
    }
    if (options.networkPassphrase) {
      args.push('--network-passphrase', options.networkPassphrase);
    }
    if (options.horizonUrl) {
      args.push('--horizon-url', options.horizonUrl);
    }
  }

  /**
   * Add signing options to arguments
   */
  static addSigningOptions(args: string[], options: SigningOptions): void {
    if (options.signWithKey) {
      args.push('--sign-with-key', options.signWithKey);
    }
    if (options.hdPath) {
      args.push('--hd-path', options.hdPath);
    }
    if (options.signWithLab) {
      args.push('--sign-with-lab');
    }
    if (options.signWithLedger) {
      args.push('--sign-with-ledger');
    }
  }

  /**
   * Add transaction options to arguments
   */
  static addTransactionOptions(args: string[], options: TransactionOptions): void {
    if (options.fee !== undefined) {
      args.push('--fee', options.fee.toString());
    }
    if (options.cost) {
      args.push('--cost');
    }
    if (options.instructions !== undefined) {
      args.push('--instructions', options.instructions.toString());
    }
    if (options.buildOnly) {
      args.push('--build-only');
    }
  }

  /**
   * Parse constructor arguments for contract deployment
   */
  static parseConstructorArgs(args?: string[]): string[] {
    if (!args || args.length === 0) return [];
    
    // Constructor args go after --
    return ['--', ...args];
  }

  /**
   * Parse function arguments for contract invocation
   */
  static parseFunctionArgs(functionName: string, args?: Record<string, any>): string[] {
    const result = ['--', functionName];
    
    if (args) {
      for (const [key, value] of Object.entries(args)) {
        result.push(`--${key}`, this.formatValue(value));
      }
    }
    
    return result;
  }

  /**
   * Format a value for CLI argument
   */
  static formatValue(value: any): string {
    if (typeof value === 'string') {
      // Quote strings with spaces
      return value.includes(' ') ? `"${value}"` : value;
    } else if (typeof value === 'object') {
      // Convert objects to JSON
      return JSON.stringify(value);
    } else {
      return String(value);
    }
  }

  /**
   * Parse output based on expected format
   */
  static parseOutput(output: string, format?: string): any {
    if (!output) return null;

    // Try to detect JSON
    if (format === 'json' || output.trim().startsWith('{') || output.trim().startsWith('[')) {
      try {
        return JSON.parse(output);
      } catch {
        // Not JSON, return as is
      }
    }

    // Try to detect XDR (base64)
    if (format === 'xdr' || /^[A-Za-z0-9+/]+=*$/.test(output.trim())) {
      return { xdr: output.trim() };
    }

    // Return as plain text
    return output;
  }

  /**
   * Extract contract ID from deployment output
   */
  static extractContractId(output: string): string | null {
    // Look for contract ID patterns
    const patterns = [
      /Contract ID:\s*([A-Z0-9]{56})/i,
      /ID:\s*([A-Z0-9]{56})/i,
      /([A-Z0-9]{56})/,
    ];

    for (const pattern of patterns) {
      const match = output.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * Extract transaction hash from output
   */
  static extractTransactionHash(output: string): string | null {
    // Look for transaction hash patterns
    const patterns = [
      /Transaction hash:\s*([a-f0-9]{64})/i,
      /Hash:\s*([a-f0-9]{64})/i,
      /([a-f0-9]{64})/,
    ];

    for (const pattern of patterns) {
      const match = output.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  }

  /**
   * Validate network type
   */
  static validateNetwork(network: string): NetworkType {
    const validNetworks: NetworkType[] = ['testnet', 'mainnet', 'futurenet', 'local'];
    if (!validNetworks.includes(network as NetworkType)) {
      throw new Error(`Invalid network: ${network}. Must be one of: ${validNetworks.join(', ')}`);
    }
    return network as NetworkType;
  }

  /**
   * Validate Stellar account ID
   */
  static validateAccountId(accountId: string): boolean {
    // Stellar account IDs are 56 characters starting with G
    return /^G[A-Z0-9]{55}$/.test(accountId);
  }

  /**
   * Validate contract ID
   */
  static validateContractId(contractId: string): boolean {
    // Contract IDs are 56 characters starting with C
    return /^C[A-Z0-9]{55}$/.test(contractId);
  }
}