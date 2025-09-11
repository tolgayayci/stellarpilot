// Container Tool Definitions
import { ToolDefinition } from '../../../types/index.js';

export const CONTAINER_TOOLS: ToolDefinition[] = [
  {
    name: 'stellar_container_start',
    description: 'Start a container running a Stellar node, RPC, API, and friendbot (faucet)',
    inputSchema: {
      type: 'object',
      properties: {
        network: {
          type: 'string',
          enum: ['local', 'testnet', 'futurenet', 'pubnet'],
          description: 'Network to start (default: local)',
        },
        dockerHost: {
          type: 'string',
          description: 'Override the default docker host path',
        },
        name: {
          type: 'string',
          description: 'Optional argument to specify the container name',
        },
        limits: {
          type: 'string',
          description: 'Specify the limits for the local network only',
        },
        portsMapping: {
          type: 'string',
          description: 'Specify HOST_PORT:CONTAINER_PORT mapping (default: 8000:8000)',
        },
        imageTagOverride: {
          type: 'string',
          description: 'Override the default docker image tag for the given network',
        },
        protocolVersion: {
          type: 'string',
          description: 'Specify the protocol version for the local network only',
        },
      },
      required: [],
    },
  },
  {
    name: 'stellar_container_stop',
    description: 'Stop a network container started with stellar container start',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Container to stop (default: local)',
        },
        dockerHost: {
          type: 'string',
          description: 'Override the default docker host path',
        },
      },
      required: [],
    },
  },
  {
    name: 'stellar_container_logs',
    description: 'Get logs from a running network container',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Container to get logs from (default: local)',
        },
        dockerHost: {
          type: 'string',
          description: 'Override the default docker host path',
        },
      },
      required: [],
    },
  },
];