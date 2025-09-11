// Transaction (tx) Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { CLIParser } from '../../utils/parser.js';
import {
  TxPaymentParams,
  TxCreateAccountParams,
  TxChangeTrustParams,
  TxAccountMergeParams,
  TxManageDataParams,
  TxSetOptionsParams,
  TxManageSellOfferParams,
  TxManageBuyOfferParams,
  TxSignParams,
  TxSendParams,
  TxSimulateParams,
  TxHashParams,
  TxDecodeParams,
  TxFetchParams,
  TxUpdateSequenceParams,
} from '../../types/tx.js';

const executor = new CLIExecutor();

/**
 * Payment Transaction Handler
 */
export const createPayment: ToolHandler = async (args) => {
  try {
    const params = args as TxPaymentParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'new', 'payment'];
    
    // Add required options
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--destination', params.destination);
    cmdArgs.push('--asset', params.asset);
    cmdArgs.push('--amount', params.amount);
    cmdArgs.push('--network', params.network);
    
    // Add optional options
    if (params.memo) {
      cmdArgs.push('--memo', params.memo);
      if (params.memoType) {
        cmdArgs.push('--memo-type', params.memoType);
      }
    }
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    
    // Add signing options if not build-only
    if (!params.buildOnly && params.signWithKey) {
      cmdArgs.push('--sign-with-key', params.signWithKey);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    // Parse output
    const output = params.buildOnly 
      ? { xdr: result.stdout }
      : CLIParser.parseOutput(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'payment',
            from: params.sourceAccount,
            to: params.destination,
            asset: params.asset,
            amount: params.amount,
            result: output,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error creating payment: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Create Account Transaction Handler
 */
export const createAccount: ToolHandler = async (args) => {
  try {
    const params = args as TxCreateAccountParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'new', 'create-account'];
    
    // Add required options
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--destination', params.destination);
    cmdArgs.push('--starting-balance', params.startingBalance);
    cmdArgs.push('--network', params.network);
    
    // Add optional options
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    
    // Add signing options
    if (!params.buildOnly && params.signWithKey) {
      cmdArgs.push('--sign-with-key', params.signWithKey);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    const output = params.buildOnly 
      ? { xdr: result.stdout }
      : CLIParser.parseOutput(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'create_account',
            newAccount: params.destination,
            startingBalance: params.startingBalance,
            result: output,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error creating account: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Change Trust Transaction Handler
 */
export const changeTrust: ToolHandler = async (args) => {
  try {
    const params = args as TxChangeTrustParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'new', 'change-trust'];
    
    // Add required options
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--line', params.line);
    cmdArgs.push('--network', params.network);
    
    // Add optional options
    if (params.limit !== undefined) cmdArgs.push('--limit', params.limit);
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    
    // Add signing options
    if (!params.buildOnly && params.signWithKey) {
      cmdArgs.push('--sign-with-key', params.signWithKey);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    const output = params.buildOnly 
      ? { xdr: result.stdout }
      : CLIParser.parseOutput(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'change_trust',
            asset: params.line,
            limit: params.limit || 'maximum',
            result: output,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error changing trust: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Account Merge Transaction Handler
 */
export const accountMerge: ToolHandler = async (args) => {
  try {
    const params = args as TxAccountMergeParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'new', 'account-merge'];
    
    // Add required options
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--account-destination', params.accountDestination);
    cmdArgs.push('--network', params.network);
    
    // Add optional options
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    
    // Add signing options
    if (!params.buildOnly && params.signWithKey) {
      cmdArgs.push('--sign-with-key', params.signWithKey);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    const output = params.buildOnly 
      ? { xdr: result.stdout }
      : CLIParser.parseOutput(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'account_merge',
            sourceAccount: params.sourceAccount,
            destination: params.accountDestination,
            result: output,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error merging account: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Manage Data Transaction Handler
 */
export const manageData: ToolHandler = async (args) => {
  try {
    const params = args as TxManageDataParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'new', 'manage-data'];
    
    // Add required options
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--data-name', params.dataName);
    cmdArgs.push('--network', params.network);
    
    // Add data value (omit to delete)
    if (params.dataValue !== undefined) {
      cmdArgs.push('--data-value', params.dataValue);
    }
    
    // Add optional options
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    
    // Add signing options
    if (!params.buildOnly && params.signWithKey) {
      cmdArgs.push('--sign-with-key', params.signWithKey);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    const output = params.buildOnly 
      ? { xdr: result.stdout }
      : CLIParser.parseOutput(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'manage_data',
            dataName: params.dataName,
            dataValue: params.dataValue || '(deleted)',
            result: output,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error managing data: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Set Options Transaction Handler
 */
export const setOptions: ToolHandler = async (args) => {
  try {
    const params = args as TxSetOptionsParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'new', 'set-options'];
    
    // Add required options
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--network', params.network);
    
    // Add optional account options
    if (params.inflationDest) cmdArgs.push('--inflation-dest', params.inflationDest);
    if (params.clearFlags !== undefined) cmdArgs.push('--clear-flags', params.clearFlags.toString());
    if (params.setFlags !== undefined) cmdArgs.push('--set-flags', params.setFlags.toString());
    if (params.masterWeight !== undefined) cmdArgs.push('--master-weight', params.masterWeight.toString());
    if (params.lowThreshold !== undefined) cmdArgs.push('--low-threshold', params.lowThreshold.toString());
    if (params.medThreshold !== undefined) cmdArgs.push('--med-threshold', params.medThreshold.toString());
    if (params.highThreshold !== undefined) cmdArgs.push('--high-threshold', params.highThreshold.toString());
    if (params.homeDomain) cmdArgs.push('--home-domain', params.homeDomain);
    
    // Add signer if provided
    if (params.signerKey && params.signerWeight !== undefined) {
      cmdArgs.push('--signer', params.signerKey);
      cmdArgs.push('--signer-weight', params.signerWeight.toString());
    }
    
    // Add transaction options
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    
    // Add signing options
    if (!params.buildOnly && params.signWithKey) {
      cmdArgs.push('--sign-with-key', params.signWithKey);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    const output = params.buildOnly 
      ? { xdr: result.stdout }
      : CLIParser.parseOutput(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'set_options',
            account: params.sourceAccount,
            options: {
              inflationDest: params.inflationDest,
              homeDomain: params.homeDomain,
              flags: { clear: params.clearFlags, set: params.setFlags },
              thresholds: {
                master: params.masterWeight,
                low: params.lowThreshold,
                med: params.medThreshold,
                high: params.highThreshold,
              },
              signer: params.signerKey ? { key: params.signerKey, weight: params.signerWeight } : undefined,
            },
            result: output,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error setting options: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Manage Sell Offer Transaction Handler
 */
export const manageSellOffer: ToolHandler = async (args) => {
  try {
    const params = args as TxManageSellOfferParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'new', 'manage-sell-offer'];
    
    // Add required options
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--selling', params.selling);
    cmdArgs.push('--buying', params.buying);
    cmdArgs.push('--amount', params.amount);
    cmdArgs.push('--price', params.price);
    cmdArgs.push('--network', params.network);
    
    // Add optional options
    if (params.offerId) cmdArgs.push('--offer-id', params.offerId);
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    
    // Add signing options
    if (!params.buildOnly && params.signWithKey) {
      cmdArgs.push('--sign-with-key', params.signWithKey);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    const output = params.buildOnly 
      ? { xdr: result.stdout }
      : CLIParser.parseOutput(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'manage_sell_offer',
            selling: params.selling,
            buying: params.buying,
            amount: params.amount,
            price: params.price,
            offerId: params.offerId || 'new',
            result: output,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error managing sell offer: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Manage Buy Offer Transaction Handler
 */
export const manageBuyOffer: ToolHandler = async (args) => {
  try {
    const params = args as TxManageBuyOfferParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'new', 'manage-buy-offer'];
    
    // Add required options
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--selling', params.selling);
    cmdArgs.push('--buying', params.buying);
    cmdArgs.push('--buy-amount', params.buyAmount);
    cmdArgs.push('--price', params.price);
    cmdArgs.push('--network', params.network);
    
    // Add optional options
    if (params.offerId) cmdArgs.push('--offer-id', params.offerId);
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    
    // Add signing options
    if (!params.buildOnly && params.signWithKey) {
      cmdArgs.push('--sign-with-key', params.signWithKey);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    const output = params.buildOnly 
      ? { xdr: result.stdout }
      : CLIParser.parseOutput(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'manage_buy_offer',
            selling: params.selling,
            buying: params.buying,
            buyAmount: params.buyAmount,
            price: params.price,
            offerId: params.offerId || 'new',
            result: output,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error managing buy offer: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Sign Transaction Handler
 */
export const signTransaction: ToolHandler = async (args) => {
  try {
    const params = args as TxSignParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'sign'];
    
    // Add XDR if provided directly (otherwise expects stdin)
    if (params.txXdr) {
      cmdArgs.push(params.txXdr);
    }
    
    // Add signing options
    if (params.signWithKey) cmdArgs.push('--sign-with-key', params.signWithKey);
    if (params.hdPath) cmdArgs.push('--hd-path', params.hdPath);
    if (params.signWithLab) cmdArgs.push('--sign-with-lab');
    if (params.signWithLedger) cmdArgs.push('--sign-with-ledger');
    if (params.network) cmdArgs.push('--network', params.network);
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'sign',
            signedXdr: result.stdout.trim(),
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error signing transaction: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Send Transaction Handler
 */
export const sendTransaction: ToolHandler = async (args) => {
  try {
    const params = args as TxSendParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'send'];
    
    // Add XDR if provided directly
    if (params.txXdr) {
      cmdArgs.push(params.txXdr);
    }
    
    // Add network options
    cmdArgs.push('--network', params.network);
    if (params.rpcUrl) cmdArgs.push('--rpc-url', params.rpcUrl);
    if (params.networkPassphrase) cmdArgs.push('--network-passphrase', params.networkPassphrase);
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    // Extract transaction hash from output
    const hash = CLIParser.extractTransactionHash(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'send',
            transactionHash: hash,
            output: result.stdout,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error sending transaction: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Simulate Transaction Handler
 */
export const simulateTransaction: ToolHandler = async (args) => {
  try {
    const params = args as TxSimulateParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'simulate'];
    
    // Add XDR if provided directly
    if (params.txXdr) {
      cmdArgs.push(params.txXdr);
    }
    
    // Add network options
    cmdArgs.push('--network', params.network);
    if (params.rpcUrl) cmdArgs.push('--rpc-url', params.rpcUrl);
    if (params.sourceAccount) cmdArgs.push('--source-account', params.sourceAccount);
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    // Parse simulation result
    const simulationResult = CLIParser.parseOutput(result.stdout, 'json');
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'simulate',
            simulation: simulationResult,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error simulating transaction: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Hash Transaction Handler
 */
export const hashTransaction: ToolHandler = async (args) => {
  try {
    const params = args as TxHashParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'hash'];
    
    // Add XDR if provided directly
    if (params.txXdr) {
      cmdArgs.push(params.txXdr);
    }
    
    // Add network if specified
    if (params.network) cmdArgs.push('--network', params.network);
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'hash',
            transactionHash: result.stdout.trim(),
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error hashing transaction: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Decode Transaction Handler
 */
export const decodeTransaction: ToolHandler = async (args) => {
  try {
    const params = args as TxDecodeParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'decode'];
    
    // Add XDR if provided directly
    if (params.txXdr) {
      cmdArgs.push(params.txXdr);
    }
    
    // Add output format if specified
    if (params.outputFormat) {
      cmdArgs.push('--output', params.outputFormat);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    // Parse JSON output
    const decoded = CLIParser.parseOutput(result.stdout, 'json');
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'decode',
            decoded: decoded || result.stdout,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error decoding transaction: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Fetch Transaction Handler
 */
export const fetchTransaction: ToolHandler = async (args) => {
  try {
    const params = args as TxFetchParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'fetch', params.txHash];
    
    // Add network options
    cmdArgs.push('--network', params.network);
    if (params.rpcUrl) cmdArgs.push('--rpc-url', params.rpcUrl);
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    // Parse result
    const transaction = CLIParser.parseOutput(result.stdout, 'json');
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'fetch',
            transactionHash: params.txHash,
            transaction: transaction || result.stdout,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error fetching transaction: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Update Sequence Number Handler
 */
export const updateSequence: ToolHandler = async (args) => {
  try {
    const params = args as TxUpdateSequenceParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'update', 'sequence-number'];
    
    // Add sequence action
    if (params.sequenceNumber === 'next') {
      cmdArgs.push('next');
      if (params.sourceAccount) {
        cmdArgs.push('--source-account', params.sourceAccount);
      }
      if (params.network) {
        cmdArgs.push('--network', params.network);
      }
    } else if (params.sequenceNumber) {
      cmdArgs.push(params.sequenceNumber);
    }
    
    // Add XDR if provided
    if (params.txXdr) {
      // XDR typically comes via stdin, but we can pass it as argument
      cmdArgs.push(params.txXdr);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'update_sequence',
            updatedXdr: result.stdout.trim(),
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error updating sequence: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Path Payment Handler (supports both strict send and strict receive)
 */
export const pathPayment: ToolHandler = async (args: any) => {
  try {
    const params = args;
    
    // Determine which path payment operation to use
    const operation = params.strictMode === 'send' 
      ? 'path-payment-strict-send' 
      : 'path-payment-strict-receive';
    
    // Build command arguments
    const cmdArgs: string[] = ['tx', 'new', operation];
    
    // Add required options
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--destination', params.destination);
    cmdArgs.push('--network', params.network);
    
    if (params.strictMode === 'send') {
      cmdArgs.push('--send-asset', params.sendAsset);
      cmdArgs.push('--send-amount', params.sendAmount);
      cmdArgs.push('--dest-asset', params.destAsset);
      cmdArgs.push('--dest-min', params.destMin);
    } else {
      cmdArgs.push('--send-asset', params.sendAsset);
      cmdArgs.push('--send-max', params.sendMax);
      cmdArgs.push('--dest-asset', params.destAsset);
      cmdArgs.push('--dest-amount', params.destAmount);
    }
    
    // Add path if provided
    if (params.path && params.path.length > 0) {
      params.path.forEach((asset: string) => {
        cmdArgs.push('--path', asset);
      });
    }
    
    // Add optional options
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    
    // Add signing options
    if (!params.buildOnly && params.signWithKey) {
      cmdArgs.push('--sign-with-key', params.signWithKey);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    const output = params.buildOnly 
      ? { xdr: result.stdout }
      : CLIParser.parseOutput(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            operation: 'path_payment',
            strictMode: params.strictMode,
            from: params.sourceAccount,
            to: params.destination,
            sendAsset: params.sendAsset,
            destAsset: params.destAsset,
            result: output,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error creating path payment: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * All Transaction Handlers Export
 */
export const TX_HANDLERS = {
  stellar_tx_payment: createPayment,
  stellar_tx_create_account: createAccount,
  stellar_tx_change_trust: changeTrust,
  stellar_tx_account_merge: accountMerge,
  stellar_tx_manage_data: manageData,
  stellar_tx_set_options: setOptions,
  stellar_tx_manage_sell_offer: manageSellOffer,
  stellar_tx_manage_buy_offer: manageBuyOffer,
  stellar_tx_sign: signTransaction,
  stellar_tx_send: sendTransaction,
  stellar_tx_simulate: simulateTransaction,
  stellar_tx_hash: hashTransaction,
  stellar_tx_decode: decodeTransaction,
  stellar_tx_fetch: fetchTransaction,
  stellar_tx_update_sequence: updateSequence,
  stellar_tx_path_payment: pathPayment,
};