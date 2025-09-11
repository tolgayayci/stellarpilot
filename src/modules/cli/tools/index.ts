// CLI Tools Aggregator
import { CONTRACT_TOOLS } from './contract.js';
import { TX_TOOLS } from './tx.js';
import { KEYS_TOOLS } from './keys.js';
import { NETWORK_TOOLS } from './network.js';
import { EVENTS_TOOLS } from './events.js';
import { LEDGER_TOOLS } from './ledger.js';
import { FEE_STATS_TOOLS } from './fee-stats.js';
import { SNAPSHOT_TOOLS } from './snapshot.js';
import { CONTAINER_TOOLS } from './container.js';
import { XDR_TOOLS } from './xdr.js';
import { CONFIG_TOOLS } from './config.js';
import { ENV_TOOLS } from './env.js';
import { CACHE_TOOLS } from './cache.js';
import { DOCTOR_TOOLS } from './doctor.js';
import { COMPLETION_TOOLS } from './completion.js';
import { VERSION_TOOLS } from './version.js';
import { PLUGIN_TOOLS } from './plugin.js';
import { ToolDefinition } from '../../../types/index.js';

// Export all CLI tools
export const CLI_TOOLS: ToolDefinition[] = [
  ...CONTRACT_TOOLS,
  ...TX_TOOLS,
  ...KEYS_TOOLS,
  ...NETWORK_TOOLS,
  ...EVENTS_TOOLS,
  ...LEDGER_TOOLS,
  ...FEE_STATS_TOOLS,
  ...SNAPSHOT_TOOLS,
  ...CONTAINER_TOOLS,
  ...XDR_TOOLS,
  ...CONFIG_TOOLS,
  ...ENV_TOOLS,
  ...CACHE_TOOLS,
  ...DOCTOR_TOOLS,
  ...COMPLETION_TOOLS,
  ...VERSION_TOOLS,
  ...PLUGIN_TOOLS,
];