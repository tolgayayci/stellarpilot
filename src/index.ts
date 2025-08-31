#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { StrKey, xdr, Keypair } from 'stellar-sdk';

const RPC_TESTNET_URL = 'https://soroban-testnet.stellar.org';

interface RPCError {
  code?: number;
  message?: string;
  data?: any;
}

interface RPCResponse {
  jsonrpc: string;
  id: number | string;
  result?: any;
  error?: RPCError;
}

async function callRPC(method: string, params?: any): Promise<any> {
  const requestBody = {
    jsonrpc: '2.0',
    id: Date.now(),
    method,
    params: params || {}
  };
  
  try {
    const response = await fetch(RPC_TESTNET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json() as RPCResponse;
    
    if (data.error) {
      throw new Error(data.error.message || `RPC Error ${data.error.code}`);
    }
    
    return data.result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to call RPC: ${String(error)}`);
  }
}

function accountIdToLedgerKey(accountId: string): string {
  try {
    const accountIdBuffer = StrKey.decodeEd25519PublicKey(accountId);
    const accountKey = xdr.LedgerKey.account(
      new xdr.LedgerKeyAccount({
        accountId: xdr.PublicKey.publicKeyTypeEd25519(accountIdBuffer),
      })
    );
    return accountKey.toXDR('base64');
  } catch (error) {
    throw new Error(`Invalid account ID: ${accountId}`);
  }
}

const server = new Server(
  {
    name: 'stellarpilot',
    version: '2.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const TOOLS = [
  {
    name: 'getLatestLedger',
    description: 'Get information about the latest ledger',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'getTransaction',
    description: 'Get details about a specific transaction by hash',
    inputSchema: {
      type: 'object',
      properties: {
        hash: {
          type: 'string',
          description: 'The transaction hash',
        },
      },
      required: ['hash'],
    },
  },
  {
    name: 'getTransactions',
    description: 'Get a list of recent transactions',
    inputSchema: {
      type: 'object',
      properties: {
        startLedger: {
          type: 'number',
          description: 'The ledger sequence to start from',
        },
        limit: {
          type: 'number',
          description: 'Number of transactions to return (default: 10)',
          default: 10,
        },
      },
      required: ['startLedger'],
    },
  },
  {
    name: 'getLedgerEntry',
    description: 'Get ledger entry data for an account',
    inputSchema: {
      type: 'object',
      properties: {
        accountId: {
          type: 'string',
          description: 'The Stellar account public key',
        },
      },
      required: ['accountId'],
    },
  },
  {
    name: 'getFeeStats',
    description: 'Get current network fee statistics',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS,
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    switch (name) {
      case 'getLatestLedger': {
        const result = await callRPC('getLatestLedger');
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                id: result.id,
                protocolVersion: result.protocolVersion,
                sequence: result.sequence,
                hash: result.hash,
              }, null, 2),
            },
          ],
        };
      }
      
      case 'getTransaction': {
        const { hash } = args as { hash: string };
        const result = await callRPC('getTransaction', { hash });
        
        if (!result) {
          throw new Error('Transaction not found');
        }
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                status: result.status,
                latestLedger: result.latestLedger,
                latestLedgerCloseTime: result.latestLedgerCloseTime,
                oldestLedger: result.oldestLedger,
                oldestLedgerCloseTime: result.oldestLedgerCloseTime,
                applicationOrder: result.applicationOrder,
                envelopeXdr: result.envelopeXdr,
                resultXdr: result.resultXdr,
                resultMetaXdr: result.resultMetaXdr,
                ledger: result.ledger,
                createdAt: result.createdAt,
              }, null, 2),
            },
          ],
        };
      }
      
      case 'getTransactions': {
        const { startLedger, limit = 10 } = args as { startLedger: number; limit?: number };
        const result = await callRPC('getTransactions', {
          startLedger,
          pagination: {
            limit
          }
        });
        
        const transactions = result.transactions || [];
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                latestLedger: result.latestLedger,
                latestLedgerCloseTimestamp: result.latestLedgerCloseTimestamp,
                oldestLedger: result.oldestLedger,
                oldestLedgerCloseTimestamp: result.oldestLedgerCloseTimestamp,
                cursor: result.cursor,
                transactionCount: transactions.length,
                transactions: transactions.map((tx: any) => ({
                  status: tx.status,
                  hash: tx.hash,
                  ledger: tx.ledger,
                  createdAt: tx.createdAt,
                  applicationOrder: tx.applicationOrder,
                  feeBump: tx.feeBump,
                  envelopeXdr: tx.envelopeXdr,
                  resultXdr: tx.resultXdr,
                  resultMetaXdr: tx.resultMetaXdr,
                })),
              }, null, 2),
            },
          ],
        };
      }
      
      case 'getLedgerEntry': {
        const { accountId } = args as { accountId: string };
        
        let ledgerKey: string;
        try {
          ledgerKey = accountIdToLedgerKey(accountId);
        } catch (error) {
          throw new Error(`Invalid account ID: ${error instanceof Error ? error.message : String(error)}`);
        }
        
        const result = await callRPC('getLedgerEntries', {
          keys: [ledgerKey]
        });
        
        if (!result.entries || result.entries.length === 0) {
          throw new Error('Account not found');
        }
        
        const entry = result.entries[0];
        
        let accountData: any = {};
        try {
          const ledgerEntryData = xdr.LedgerEntryData.fromXDR(entry.xdr, 'base64');
          if (ledgerEntryData.switch().name === 'account') {
            const account = ledgerEntryData.account();
            accountData = {
              accountId: StrKey.encodeEd25519PublicKey(account.accountId().ed25519()),
              balance: account.balance().toString(),
              sequenceNumber: account.seqNum().toString(),
              numSubEntries: account.numSubEntries(),
              inflationDest: account.inflationDest() ? 
                StrKey.encodeEd25519PublicKey(account.inflationDest()!.ed25519()) : null,
              flags: account.flags(),
              homeDomain: account.homeDomain().toString(),
              thresholds: {
                masterWeight: account.thresholds()[0],
                low: account.thresholds()[1],
                medium: account.thresholds()[2],
                high: account.thresholds()[3],
              },
              signers: account.signers().map((signer: any) => ({
                key: signer.key().ed25519() ? 
                  StrKey.encodeEd25519PublicKey(signer.key().ed25519()) : 
                  signer.key().toString(),
                weight: signer.weight(),
              })),
            };
          }
        } catch (error) {
          accountData = {
            rawXdr: entry.xdr,
            parseError: 'Could not parse account data from XDR',
          };
        }
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                lastModifiedLedgerSeq: entry.lastModifiedLedgerSeq,
                key: entry.key,
                account: accountData,
                latestLedger: result.latestLedger,
              }, null, 2),
            },
          ],
        };
      }
      
      case 'getFeeStats': {
        const result = await callRPC('getFeeStats');
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                sorobanInclusionFee: result.sorobanInclusionFee,
                inclusionFee: result.inclusionFee,
                latestLedger: result.latestLedger,
              }, null, 2),
            },
          ],
        };
      }
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
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
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('StellarPilot MCP server (RPC version) running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});