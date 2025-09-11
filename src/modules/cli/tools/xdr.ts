// XDR Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const XDR_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_xdr_decode',
    description: 'Decode XDR data to human-readable format',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'XDR type to decode (e.g., TransactionEnvelope, TransactionResult)',
        },
        input: {
          type: 'array',
          items: { type: 'string' },
          description: 'XDR data to decode (base64 encoded)',
        },
        inputFormat: {
          type: 'string',
          enum: ['single', 'single-base64', 'stream', 'stream-base64', 'stream-framed'],
          description: 'Input format',
        },
        outputFormat: {
          type: 'string',
          enum: ['json', 'json-formatted', 'text', 'rust-debug', 'rust-debug-formatted'],
          description: 'Output format',
        },
        channel: {
          type: 'string',
          enum: ['+curr', '+next'],
          description: 'XDR specification channel',
        },
      },
      required: ['type'],
    },
  },
  {
    name: 'stellar_xdr_encode',
    description: 'Encode JSON data to XDR format',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'XDR type to encode to',
        },
        input: {
          type: 'array',
          items: { type: 'string' },
          description: 'JSON data to encode',
        },
        inputFormat: {
          type: 'string',
          enum: ['json'],
          description: 'Input format',
        },
        outputFormat: {
          type: 'string',
          enum: ['single', 'single-base64', 'stream'],
          description: 'Output format',
        },
        channel: {
          type: 'string',
          enum: ['+curr', '+next'],
          description: 'XDR specification channel',
        },
      },
      required: ['type'],
    },
  },
  {
    name: 'stellar_xdr_guess',
    description: 'Guess the XDR type of given data',
    inputSchema: {
      type: 'object',
      properties: {
        input: {
          type: 'string',
          description: 'XDR data to analyze',
        },
        inputFormat: {
          type: 'string',
          enum: ['single', 'single-base64', 'stream', 'stream-base64', 'stream-framed'],
          description: 'Input format',
        },
        certainty: {
          type: 'number',
          description: 'Certainty threshold',
        },
        channel: {
          type: 'string',
          enum: ['+curr', '+next'],
          description: 'XDR specification channel',
        },
      },
      required: [],
    },
  },
  {
    name: 'stellar_xdr_types_list',
    description: 'List all available XDR types',
    inputSchema: {
      type: 'object',
      properties: {
        output: {
          type: 'string',
          enum: ['plain', 'json', 'json-formatted'],
          description: 'Output format',
        },
        channel: {
          type: 'string',
          enum: ['+curr', '+next'],
          description: 'XDR specification channel',
        },
      },
      required: [],
    },
  },
  {
    name: 'stellar_xdr_types_schema',
    description: 'Get JSON schema for a specific XDR type',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'XDR type to get schema for',
        },
        output: {
          type: 'string',
          enum: ['json-schema-draft201909'],
          description: 'Output format',
        },
        channel: {
          type: 'string',
          enum: ['+curr', '+next'],
          description: 'XDR specification channel',
        },
      },
      required: ['type'],
    },
  },
  {
    name: 'stellar_xdr_compare',
    description: 'Compare two XDR values',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'XDR type of both inputs',
        },
        left: {
          type: 'string',
          description: 'Left XDR value to compare',
        },
        right: {
          type: 'string',
          description: 'Right XDR value to compare',
        },
        inputFormat: {
          type: 'string',
          enum: ['single-base64'],
          description: 'Input format',
        },
        channel: {
          type: 'string',
          enum: ['+curr', '+next'],
          description: 'XDR specification channel',
        },
      },
      required: ['type', 'left', 'right'],
    },
  },
  {
    name: 'stellar_xdr_generate_default',
    description: 'Generate default XDR values for a type',
    inputSchema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          description: 'XDR type to generate',
        },
        outputFormat: {
          type: 'string',
          enum: ['single', 'single-base64', 'json', 'json-formatted', 'text'],
          description: 'Output format',
        },
        channel: {
          type: 'string',
          enum: ['+curr', '+next'],
          description: 'XDR specification channel',
        },
      },
      required: ['type'],
    },
  },
];