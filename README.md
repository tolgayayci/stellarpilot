# StellarPilot

MCP server for Stellar blockchain - work in progress MVP.

## Current Features

### RPC Methods (Implemented)
Direct access to Stellar testnet via JSON-RPC 2.0:

```javascript
// Get latest ledger
"What's the current ledger on Stellar?"
// Response: "Ledger #12345678, hash: 0xabc..."

// Query transactions
"Show me transaction abc123..."
"Get last 5 transactions from ledger 1888539"

// Account data
"Get account balance for GDEX2UQHVCXMY4YB3N7HG6YJVXFENFPB6TITRDONREEAMNDTFXG5ALST"
// Response: "Balance: 1000 XLM, Sequence: 123..."

// Network fees
"What are current network fees?"
// Response: "Inclusion fee: 100, Soroban fee: 1000"
```

## Setup

1. Install dependencies:
```bash
npm install
npm run build
```

1. Add to Cursor config:
```json
{
  "mcpServers": {
    "stellarpilot": {
      "command": "node",
      "args": ["/path/to/stellarpilot/build/index.js"]
    }
  }
}
```

## Roadmap

### Coming Soon
- **Stellar CLI Integration** - Execute CLI commands via natural language
- **Transaction Building** - Create and submit transactions with SDK
- **Horizon API** - Historical data, DEX operations, payment paths
- **Smart Contracts** - Deploy and interact with Soroban contracts
- **Documentation RAG** - Search SEPs, CAPs, and developer docs
- **Multi-network** - Mainnet support with safety confirmations

### Vision
Complete conversational interface to Stellar blockchain - combining RPC, CLI, SDKs, and documentation into one unified MCP server. Ask questions, build transactions, deploy contracts, and learn about Stellar, all through natural language.

---
**Status**: MVP with core RPC methods  
**Network**: Testnet only  
