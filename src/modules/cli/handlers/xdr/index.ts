// XDR Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import {
  XdrDecodeParams,
  XdrEncodeParams,
  XdrGuessParams,
  XdrTypesListParams,
  XdrTypesSchemaParams,
  XdrCompareParams,
  XdrGenerateDefaultParams,
} from '../../types/xdr.js';

// Create executor instance
const executor = new CLIExecutor();

// Helper function to execute CLI commands
async function executeCLI(args: string[]) {
  try {
    const result = await executor.execute({
      command: args[0],
      args: args.slice(1),
      json: false,
    });
    
    return {
      content: [
        {
          type: 'text',
          text: result.stdout || 'Command executed successfully',
        },
      ],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
}

// Decode XDR data
const handleXdrDecode: ToolHandler = async (args: unknown) => {
  const params = args as XdrDecodeParams;
  const cliArgs = ['xdr'];
  
  if (params.channel) cliArgs.push(params.channel);
  cliArgs.push('decode', '--type', params.type);
  
  if (params.inputFormat) cliArgs.push('--input', params.inputFormat);
  if (params.outputFormat) cliArgs.push('--output', params.outputFormat);
  if (params.input) {
    params.input.forEach(data => cliArgs.push(data));
  }
  
  return executeCLI(cliArgs);
};

// Encode data to XDR
const handleXdrEncode: ToolHandler = async (args: unknown) => {
  const params = args as XdrEncodeParams;
  const cliArgs = ['xdr'];
  
  if (params.channel) cliArgs.push(params.channel);
  cliArgs.push('encode', '--type', params.type);
  
  if (params.inputFormat) cliArgs.push('--input', params.inputFormat);
  if (params.outputFormat) cliArgs.push('--output', params.outputFormat);
  if (params.input) {
    params.input.forEach(data => cliArgs.push(data));
  }
  
  return executeCLI(cliArgs);
};

// Guess XDR type
const handleXdrGuess: ToolHandler = async (args: unknown) => {
  const params = args as XdrGuessParams;
  const cliArgs = ['xdr'];
  
  if (params.channel) cliArgs.push(params.channel);
  cliArgs.push('guess');
  
  if (params.inputFormat) cliArgs.push('--input', params.inputFormat);
  if (params.certainty !== undefined) cliArgs.push('--certainty', params.certainty.toString());
  if (params.input) cliArgs.push(params.input);
  
  return executeCLI(cliArgs);
};

// List XDR types
const handleXdrTypesList: ToolHandler = async (args: unknown) => {
  const params = args as XdrTypesListParams;
  const cliArgs = ['xdr'];
  
  if (params.channel) cliArgs.push(params.channel);
  cliArgs.push('types', 'list');
  
  if (params.output) cliArgs.push('--output', params.output);
  
  return executeCLI(cliArgs);
};

// Get XDR type schema
const handleXdrTypesSchema: ToolHandler = async (args: unknown) => {
  const params = args as XdrTypesSchemaParams;
  const cliArgs = ['xdr'];
  
  if (params.channel) cliArgs.push(params.channel);
  cliArgs.push('types', 'schema', '--type', params.type);
  
  if (params.output) cliArgs.push('--output', params.output);
  
  return executeCLI(cliArgs);
};

// Compare XDR values
const handleXdrCompare: ToolHandler = async (args: unknown) => {
  const params = args as XdrCompareParams;
  const cliArgs = ['xdr'];
  
  if (params.channel) cliArgs.push(params.channel);
  cliArgs.push('compare', '--type', params.type, params.left, params.right);
  
  if (params.inputFormat) cliArgs.push('--input', params.inputFormat);
  
  return executeCLI(cliArgs);
};

// Generate default XDR value
const handleXdrGenerateDefault: ToolHandler = async (args: unknown) => {
  const params = args as XdrGenerateDefaultParams;
  const cliArgs = ['xdr'];
  
  if (params.channel) cliArgs.push(params.channel);
  cliArgs.push('generate', 'default', '--type', params.type);
  
  if (params.outputFormat) cliArgs.push('--output', params.outputFormat);
  
  return executeCLI(cliArgs);
};

// Export all XDR handlers
export const XDR_HANDLERS: Record<string, ToolHandler> = {
  stellar_xdr_decode: handleXdrDecode,
  stellar_xdr_encode: handleXdrEncode,
  stellar_xdr_guess: handleXdrGuess,
  stellar_xdr_types_list: handleXdrTypesList,
  stellar_xdr_types_schema: handleXdrTypesSchema,
  stellar_xdr_compare: handleXdrCompare,
  stellar_xdr_generate_default: handleXdrGenerateDefault,
};