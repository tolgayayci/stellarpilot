// CLI Handlers Aggregator
import { CONTRACT_HANDLERS } from './contract/index.js';
import { TX_HANDLERS } from './tx/index.js';
import { KEYS_HANDLERS } from './keys/index.js';
import { NETWORK_HANDLERS } from './network/index.js';
import { EVENTS_HANDLERS } from './events/index.js';
import { LEDGER_HANDLERS } from './ledger/index.js';
import { FEE_STATS_HANDLERS } from './fee-stats/index.js';
import { SNAPSHOT_HANDLERS } from './snapshot/index.js';
import { CONTAINER_HANDLERS } from './container/index.js';
import { XDR_HANDLERS } from './xdr/index.js';
import { CONFIG_HANDLERS } from './config/index.js';
import { ENV_HANDLERS } from './env/index.js';
import { CACHE_HANDLERS } from './cache/index.js';
import { DOCTOR_HANDLERS } from './doctor/index.js';
import { COMPLETION_HANDLERS } from './completion/index.js';
import { VERSION_HANDLERS } from './version/index.js';
import { PLUGIN_HANDLERS } from './plugin/index.js';
import { ToolHandler } from '../../../types/index.js';

// Export all CLI handlers
export const CLI_HANDLERS: Record<string, ToolHandler> = {
  ...CONTRACT_HANDLERS,
  ...TX_HANDLERS,
  ...KEYS_HANDLERS,
  ...NETWORK_HANDLERS,
  ...EVENTS_HANDLERS,
  ...LEDGER_HANDLERS,
  ...FEE_STATS_HANDLERS,
  ...SNAPSHOT_HANDLERS,
  ...CONTAINER_HANDLERS,
  ...XDR_HANDLERS,
  ...CONFIG_HANDLERS,
  ...ENV_HANDLERS,
  ...CACHE_HANDLERS,
  ...DOCTOR_HANDLERS,
  ...COMPLETION_HANDLERS,
  ...VERSION_HANDLERS,
  ...PLUGIN_HANDLERS,
};