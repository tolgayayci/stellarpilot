// Container Command Type Definitions

// Start a container running a Stellar node
export interface ContainerStartParams {
  network?: 'local' | 'testnet' | 'futurenet' | 'pubnet';
  dockerHost?: string;
  name?: string;
  limits?: string;
  portsMapping?: string;
  imageTagOverride?: string;
  protocolVersion?: string;
}

// Stop a network container
export interface ContainerStopParams {
  name?: string;
  dockerHost?: string;
}

// Get logs from a running container
export interface ContainerLogsParams {
  name?: string;
  dockerHost?: string;
}

// Result types for container operations
export interface ContainerStartResult {
  name: string;
  network: string;
  status: 'started' | 'already_running' | 'failed';
  ports: {
    horizon: string;
    rpc: string;
    friendbot?: string;
  };
  message?: string;
}

export interface ContainerStopResult {
  name: string;
  status: 'stopped' | 'not_found' | 'failed';
  message?: string;
}

export interface ContainerLogsResult {
  name: string;
  logs: string;
}