// Contract Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { CLIParser } from '../../utils/parser.js';
import {
  ContractDeployParams,
  ContractInvokeParams,
  ContractBuildParams,
  ContractInitParams,
  ContractOptimizeParams,
  ContractAliasParams,
  ContractAssetDeployParams,
  ContractBindingsParams,
  ContractInfoParams,
  ContractExtendParams,
  ContractRestoreParams,
  ContractReadParams,
  ContractFetchParams,
  ContractUploadParams,
  ContractIdParams,
} from '../../types/contract.js';

const executor = new CLIExecutor();

/**
 * Deploy Contract Handler
 */
export const deployContract: ToolHandler = async (args) => {
  try {
    const params = args as ContractDeployParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['contract', 'deploy'];
    
    // Add wasm source (either path or hash)
    if (params.wasmPath) {
      cmdArgs.push('--wasm', params.wasmPath);
    } else if (params.wasmHash) {
      cmdArgs.push('--wasm-hash', params.wasmHash);
    } else {
      throw new Error('Either wasm_path or wasm_hash must be provided');
    }
    
    // Add required options
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--network', params.network);
    
    // Add optional options
    if (params.salt) cmdArgs.push('--salt', params.salt);
    if (params.alias) cmdArgs.push('--alias', params.alias);
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    if (params.ignoreChecks) cmdArgs.push('--ignore-checks');
    
    // Add constructor arguments if provided
    if (params.constructorArgs && params.constructorArgs.length > 0) {
      cmdArgs.push('--', ...params.constructorArgs);
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    // Extract contract ID from output
    const contractId = CLIParser.extractContractId(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            contractId,
            output: result.stdout,
            ...(params.buildOnly && { xdr: result.stdout }),
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error deploying contract: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Invoke Contract Handler
 */
export const invokeContract: ToolHandler = async (args) => {
  try {
    const params = args as ContractInvokeParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['contract', 'invoke'];
    
    // Add required options
    cmdArgs.push('--id', params.contractId);
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--network', params.network);
    
    // Add optional options
    if (params.send) cmdArgs.push('--send', params.send);
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    
    // Add function name and arguments
    cmdArgs.push('--', params.functionName);
    if (params.functionArgs) {
      for (const [key, value] of Object.entries(params.functionArgs)) {
        cmdArgs.push(`--${key}`, CLIParser.formatValue(value));
      }
    }
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    // Parse output
    const output = CLIParser.parseOutput(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            result: output,
            raw: result.stdout,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error invoking contract: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Build Contract Handler
 */
export const buildContract: ToolHandler = async (args) => {
  try {
    const params = args as ContractBuildParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['contract', 'build'];
    
    // Add optional options
    if (params.manifestPath) cmdArgs.push('--manifest-path', params.manifestPath);
    if (params.package) cmdArgs.push('--package', params.package);
    if (params.profile) cmdArgs.push('--profile', params.profile);
    if (params.features && params.features.length > 0) {
      cmdArgs.push('--features', params.features.join(','));
    }
    if (params.allFeatures) cmdArgs.push('--all-features');
    if (params.noDefaultFeatures) cmdArgs.push('--no-default-features');
    if (params.outDir) cmdArgs.push('--out-dir', params.outDir);
    if (params.printCommandsOnly) cmdArgs.push('--print-commands-only');
    if (params.meta) {
      for (const [key, value] of Object.entries(params.meta)) {
        cmdArgs.push('--meta', `${key}=${value}`);
      }
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
            output: result.stdout,
            commands: params.printCommandsOnly ? result.stdout : undefined,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error building contract: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Initialize Contract Project Handler
 */
export const initContract: ToolHandler = async (args) => {
  try {
    const params = args as ContractInitParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['contract', 'init', params.projectPath];
    
    // Add optional options
    if (params.name) cmdArgs.push('--name', params.name);
    if (params.overwrite) cmdArgs.push('--overwrite');
    
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
            projectPath: params.projectPath,
            contractName: params.name || 'hello-world',
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
          text: `Error initializing contract: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Optimize Contract Handler
 */
export const optimizeContract: ToolHandler = async (args) => {
  try {
    const params = args as ContractOptimizeParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['contract', 'optimize'];
    
    // Add WASM files
    for (const wasmPath of params.wasmPaths) {
      cmdArgs.push('--wasm', wasmPath);
    }
    
    // Add output path if specified
    if (params.wasmOut) cmdArgs.push('--wasm-out', params.wasmOut);
    
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
            optimizedFiles: params.wasmPaths.map(p => 
              params.wasmOut || p.replace('.wasm', '.optimized.wasm')
            ),
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
          text: `Error optimizing contract: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Manage Contract Alias Handler
 */
export const manageAlias: ToolHandler = async (args) => {
  try {
    const params = args as ContractAliasParams;
    
    // Build command arguments based on action
    const cmdArgs: string[] = ['contract', 'alias', params.action];
    
    switch (params.action) {
      case 'add':
        if (!params.alias || !params.contractId) {
          throw new Error('Alias and contract_id required for add action');
        }
        cmdArgs.push(params.alias);
        cmdArgs.push('--id', params.contractId);
        if (params.overwrite) cmdArgs.push('--overwrite');
        break;
      
      case 'remove':
      case 'show':
        if (!params.alias) {
          throw new Error('Alias required for ' + params.action + ' action');
        }
        cmdArgs.push(params.alias);
        break;
      
      case 'list':
        // No additional arguments needed
        break;
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
            action: params.action,
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
          text: `Error managing alias: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Deploy Asset Contract Handler
 */
export const deployAssetContract: ToolHandler = async (args) => {
  try {
    const params = args as ContractAssetDeployParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['contract', 'asset', 'deploy'];
    
    // Add required options
    cmdArgs.push('--asset', params.asset);
    cmdArgs.push('--source-account', params.sourceAccount);
    cmdArgs.push('--network', params.network);
    
    // Add optional options
    if (params.alias) cmdArgs.push('--alias', params.alias);
    if (params.fee) cmdArgs.push('--fee', params.fee.toString());
    if (params.buildOnly) cmdArgs.push('--build-only');
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    // Extract contract ID from output
    const contractId = CLIParser.extractContractId(result.stdout);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            contractId,
            asset: params.asset,
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
          text: `Error deploying asset contract: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * Generate Contract Bindings Handler
 */
export const generateBindings: ToolHandler = async (args) => {
  try {
    const params = args as ContractBindingsParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['contract', 'bindings', params.language];
    
    // Add source (wasm, wasm-hash, or contract-id)
    if (params.wasm) {
      cmdArgs.push('--wasm', params.wasm);
    } else if (params.wasmHash) {
      cmdArgs.push('--wasm-hash', params.wasmHash);
    } else if (params.contractId) {
      cmdArgs.push('--contract-id', params.contractId);
    }
    
    // Add output directory for languages that support it
    if (params.outputDir && ['typescript', 'rust'].includes(params.language)) {
      cmdArgs.push('--output-dir', params.outputDir);
    }
    
    // Add other options
    if (params.overwrite) cmdArgs.push('--overwrite');
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
            language: params.language,
            outputDir: params.outputDir,
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
          text: `Error generating bindings: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

// Continue with remaining handlers...

/**
 * Get Contract Info Handler
 */
export const getContractInfo: ToolHandler = async (args) => {
  try {
    const params = args as ContractInfoParams;
    
    // Build command arguments
    const cmdArgs: string[] = ['contract', 'info', params.subcommand];
    
    // Add source
    if (params.wasm) {
      cmdArgs.push('--wasm', params.wasm);
    } else if (params.wasmHash) {
      cmdArgs.push('--wasm-hash', params.wasmHash);
    } else if (params.contractId) {
      cmdArgs.push('--contract-id', params.contractId);
    } else {
      throw new Error('One of wasm, wasm_hash, or contract_id must be provided');
    }
    
    // Add output format
    if (params.output) cmdArgs.push('--output', params.output);
    if (params.network) cmdArgs.push('--network', params.network);
    
    // Execute command
    const result = await executor.execute({
      command: cmdArgs[0],
      args: cmdArgs.slice(1),
    });
    
    // Parse output based on format
    const parsedOutput = params.output?.includes('json') 
      ? CLIParser.parseOutput(result.stdout, 'json')
      : result.stdout;
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            infoType: params.subcommand,
            data: parsedOutput,
          }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error getting contract info: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};

/**
 * All Contract Handlers Export
 */
export const CONTRACT_HANDLERS = {
  stellar_contract_deploy: deployContract,
  stellar_contract_invoke: invokeContract,
  stellar_contract_build: buildContract,
  stellar_contract_init: initContract,
  stellar_contract_optimize: optimizeContract,
  stellar_contract_alias: manageAlias,
  stellar_contract_asset_deploy: deployAssetContract,
  stellar_contract_bindings: generateBindings,
  stellar_contract_info: getContractInfo,
  // Additional handlers can be added here for extend, restore, read, fetch, upload, id
};