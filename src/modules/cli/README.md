# Stellar CLI Module - Complete Tools Reference

This module provides 73 tools for comprehensive Stellar blockchain operations through the official Stellar CLI.

## Contract Operations (15 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_contract_deploy` | Deploy a smart contract to the network | `wasm_path`, `source_account`, `network` |
| `stellar_contract_invoke` | Call a contract function | `contract_id`, `function`, `args`, `source_account` |
| `stellar_contract_build` | Build contract from source | `source_path`, `output` |
| `stellar_contract_extend` | Extend contract TTL | `contract_id`, `ledgers_to_extend` |
| `stellar_contract_fetch` | Fetch deployed contract from network | `contract_id`, `output_path` |
| `stellar_contract_read` | Read contract state | `contract_id`, `key` |
| `stellar_contract_restore` | Restore expired contract | `contract_id`, `source_account` |
| `stellar_contract_optimize` | Optimize WASM binary | `wasm_path`, `output` |
| `stellar_contract_bindings` | Generate type bindings | `contract_id`, `language` |
| `stellar_contract_alias` | Manage contract aliases | `alias`, `contract_id` |
| `stellar_contract_install` | Install contract binary | `wasm_path`, `source_account` |
| `stellar_contract_init` | Initialize new contract project | `project_name`, `template` |
| `stellar_contract_atomic_swap` | Create atomic swap example | `source_account` |
| `stellar_contract_timelock` | Create timelock example | `source_account` |
| `stellar_contract_stellar_asset` | Deploy Stellar asset contract | `asset_code`, `issuer` |

## Transaction Management (16 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_tx_new_payment` | Send payments | `source_account`, `destination`, `amount`, `asset` |
| `stellar_tx_new_trust` | Create trustlines | `source_account`, `asset`, `limit` |
| `stellar_tx_new_offer` | Manage DEX offers | `source_account`, `selling`, `buying`, `amount`, `price` |
| `stellar_tx_new_account_merge` | Merge accounts | `source_account`, `destination` |
| `stellar_tx_new_bump_sequence` | Bump sequence number | `source_account`, `bump_to` |
| `stellar_tx_new_change_trust` | Modify trustlines | `source_account`, `asset`, `limit` |
| `stellar_tx_new_clawback` | Clawback assets | `source_account`, `from`, `asset`, `amount` |
| `stellar_tx_new_clawback_claimable_balance` | Clawback claimable balance | `balance_id` |
| `stellar_tx_new_create_claimable_balance` | Create claimable balance | `source_account`, `asset`, `amount`, `claimants` |
| `stellar_tx_new_set_options` | Set account options | `source_account`, `home_domain`, `signer`, `weight` |
| `stellar_tx_new_set_trustline_flags` | Set trustline flags | `source_account`, `trustor`, `asset`, `flags` |
| `stellar_tx_new_liquidity_pool` | Liquidity pool operations | `source_account`, `pool_id`, `amount_a`, `amount_b` |
| `stellar_tx_new_revoke_sponsorship` | Revoke sponsorship | `source_account`, `sponsored_id` |
| `stellar_tx_sign` | Sign transactions | `xdr`, `source_account` |
| `stellar_tx_send` | Submit transactions | `xdr`, `network` |
| `stellar_tx_simulate` | Simulate execution | `xdr`, `network` |

## Identity & Key Management (8 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_keys_generate` | Generate new keypair | `name`, `network` |
| `stellar_keys_add` | Add existing key | `name`, `secret_key` |
| `stellar_keys_address` | Show public address | `name` |
| `stellar_keys_fund` | Fund testnet account | `name` |
| `stellar_keys_ls` | List saved identities | - |
| `stellar_keys_rm` | Remove identity | `name` |
| `stellar_keys_show` | Display key details | `name` |
| `stellar_keys_use` | Set default identity | `name` |

## Network Configuration (7 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_network_add` | Add custom network | `name`, `rpc_url`, `passphrase` |
| `stellar_network_rm` | Remove network | `name` |
| `stellar_network_ls` | List networks | - |
| `stellar_network_use` | Switch network | `name` |
| `stellar_network_current` | Show current network | - |
| `stellar_network_rpc_url` | Get RPC URL | `name` |
| `stellar_network_pass_phrase` | Get network passphrase | `name` |

## Event Monitoring (1 tool)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_events_watch` | Monitor contract events | `contract_id`, `start_ledger`, `event_type` |

## Ledger Operations (2 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_ledger_get` | Get specific ledger | `sequence` |
| `stellar_ledger_latest` | Show latest ledger | - |

## Fee Statistics (1 tool)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_fee_stats` | Get network fee statistics | - |

## Snapshot Management (1 tool)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_snapshot_create` | Download ledger snapshot | `ledger`, `output_path` |

## Container Operations (3 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_container_start` | Start local Stellar network | `protocol_version`, `limits` |
| `stellar_container_stop` | Stop the local network | - |
| `stellar_container_logs` | Show container logs | `container_id` |

## XDR Operations (7 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_xdr_decode` | Decode XDR string | `xdr`, `type` |
| `stellar_xdr_encode` | Encode to XDR format | `json`, `type` |
| `stellar_xdr_from_json` | Convert JSON to XDR | `json_path`, `type` |
| `stellar_xdr_to_json` | Convert XDR to JSON | `xdr`, `type` |
| `stellar_xdr_hash` | Calculate XDR hash | `xdr` |
| `stellar_xdr_sign` | Sign XDR data | `xdr`, `secret_key` |
| `stellar_xdr_verify` | Verify XDR signature | `xdr`, `public_key` |

## Configuration Management (2 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_config_get` | Show CLI configuration | `key` |
| `stellar_config_set` | Update configuration | `key`, `value` |

## Utilities (9 tools)

| Tool | Description | Parameters |
|------|-------------|------------|
| `stellar_env_show` | Display environment variables | - |
| `stellar_cache_clean` | Clear transaction cache | - |
| `stellar_cache_list` | List cached transactions | - |
| `stellar_cache_path` | Show cache location | - |
| `stellar_cache_actionlog` | View action log | - |
| `stellar_doctor_diagnose` | Troubleshoot issues | - |
| `stellar_completion_generate` | Generate shell completion | `shell` |
| `stellar_version` | Check CLI version | - |
| `stellar_plugin_search` | Search for plugins | `query` |
| `stellar_plugin_list` | List installed plugins | - |

## Requirements

- Stellar CLI installed on the system
- Node.js 18+ for MCP server
- Network connectivity to Stellar RPC endpoints

## Related Documentation

- [Stellar CLI Official Docs](https://developers.stellar.org/docs/tools/stellar-cli)