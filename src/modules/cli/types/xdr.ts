// XDR Command Type Definitions

// Base XDR parameters
export interface XdrBaseParams {
  channel?: '+curr' | '+next';
}

// List all available XDR types
export interface XdrTypesListParams extends XdrBaseParams {
  output?: 'plain' | 'json' | 'json-formatted';
}

// Get JSON schema for a specific XDR type
export interface XdrTypesSchemaParams extends XdrBaseParams {
  type: string;
  output?: 'json-schema-draft201909';
}

// Generate JSON schema files for all XDR types
export interface XdrTypesSchemaFilesParams extends XdrBaseParams {
  outDir: string;
  output?: 'json-schema-draft201909';
}

// Guess the XDR type of given data
export interface XdrGuessParams extends XdrBaseParams {
  input?: string;
  inputFormat?: 'single' | 'single-base64' | 'stream' | 'stream-base64' | 'stream-framed';
  outputFormat?: 'list';
  certainty?: number;
}

// Decode XDR data
export interface XdrDecodeParams extends XdrBaseParams {
  type: string;
  input?: string[];
  inputFormat?: 'single' | 'single-base64' | 'stream' | 'stream-base64' | 'stream-framed';
  outputFormat?: 'json' | 'json-formatted' | 'text' | 'rust-debug' | 'rust-debug-formatted';
}

// Encode data to XDR
export interface XdrEncodeParams extends XdrBaseParams {
  type: string;
  input?: string[];
  inputFormat?: 'json';
  outputFormat?: 'single' | 'single-base64' | 'stream';
}

// Compare two XDR values
export interface XdrCompareParams extends XdrBaseParams {
  type: string;
  left: string;
  right: string;
  inputFormat?: 'single-base64';
}

// Generate default XDR values
export interface XdrGenerateDefaultParams extends XdrBaseParams {
  type: string;
  outputFormat?: 'single' | 'single-base64' | 'json' | 'json-formatted' | 'text';
}

// Generate arbitrary XDR values
export interface XdrGenerateArbitraryParams extends XdrBaseParams {
  type: string;
  outputFormat?: 'single' | 'single-base64' | 'json' | 'json-formatted' | 'text';
}

// Print XDR version information
export interface XdrVersionParams extends XdrBaseParams {}

// Result types for XDR operations
export interface XdrTypesListResult {
  types: string[];
}

export interface XdrGuessResult {
  possibleTypes: Array<{
    type: string;
    certainty: number;
  }>;
}

export interface XdrDecodeResult {
  decoded: any;
  type: string;
}

export interface XdrEncodeResult {
  encoded: string;
  type: string;
}

export interface XdrCompareResult {
  result: -1 | 0 | 1;
  message: string;
}