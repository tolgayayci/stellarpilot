#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';

// Import the CLI module
import { CLIModule } from './modules/cli/index.js';

// RPC Module kept but not imported - for future use
// import { RPCModule } from './modules/rpc/index.js';

// Future module imports
// import { HorizonModule } from './modules/horizon/index.js';
// import { SDKModule } from './modules/sdk/index.js';
// import { DocsModule } from './modules/docs/index.js';

const server = new Server(
  {
    name: 'stellarpilot',
    version: '2.0.0',
  },
  {
    capabilities: {
      tools: {},
      // resources: {}, // For future resource support
      // prompts: {},   // For future prompt templates
    },
  }
);

// Aggregate all tools from active modules
const ALL_TOOLS = [
  ...CLIModule.tools,
  // Future modules will add their tools here
  // ...RPCModule.tools,
  // ...HorizonModule.tools,
  // ...SDKModule.tools,
  // ...DocsModule.tools,
];

// Aggregate all handlers from active modules
const ALL_HANDLERS = {
  ...CLIModule.handlers,
  // Future modules will add their handlers here
  // ...RPCModule.handlers,
  // ...HorizonModule.handlers,
  // ...SDKModule.handlers,
  // ...DocsModule.handlers,
};

// Handle tool listing requests
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: ALL_TOOLS,
  };
});

// Handle tool execution requests
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    // Find the appropriate handler for the tool
    const handler = ALL_HANDLERS[name];
    
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`);
    }
    
    // Execute the handler and return the result
    return await handler(args);
    
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
  
  // Log startup message
  console.error('🚀 StellarPilot MCP Server v2.0.0');
  console.error('🛠️  CLI Module Active - Stellar Commands Available');
  console.error(`📋 ${ALL_TOOLS.length} tools loaded and ready`);
  console.error('-------------------------------------------');
  console.error('Available operations:');
  console.error('');
  console.error('📄 Contract Operations:');
  console.error('  • Deploy contracts (WASM/Asset)');
  console.error('  • Invoke contract functions');
  console.error('  • Build & optimize contracts');
  console.error('  • Generate client bindings');
  console.error('  • Manage aliases & data');
  console.error('');
  console.error('💸 Transaction Operations:');
  console.error('  • Send payments (XLM & assets)');
  console.error('  • Create & fund accounts');
  console.error('  • Manage trustlines');
  console.error('  • DEX trading operations');
  console.error('  • Sign, simulate & send transactions');
  console.error('  • Path payments & account merges');
  console.error('');
  console.error('🔑 Identity & Key Management:');
  console.error('  • Generate new identities');
  console.error('  • Add existing keys & seed phrases');
  console.error('  • Fund accounts on testnet');
  console.error('  • Manage default identity');
  console.error('  • Secure storage support');
  console.error('');
  console.error('🌐 Network Configuration:');
  console.error('  • Add & configure networks');
  console.error('  • Check network health & info');
  console.error('  • Manage default network');
  console.error('  • Fetch network settings');
  console.error('  • Support for testnet, mainnet, futurenet');
  console.error('-------------------------------------------');
  console.error('Server running on stdio transport');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});