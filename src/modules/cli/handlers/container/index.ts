// Container Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { 
  ContainerStartParams, 
  ContainerStopParams, 
  ContainerLogsParams 
} from '../../types/container.js';

// Create executor instance
const executor = new CLIExecutor();

// Helper function to execute CLI commands
async function executeCLI(args: string[]) {
  try {
    const result = await executor.execute({
      command: args[0],
      args: args.slice(1),
      json: false,
    });
    
    return {
      content: [
        {
          type: 'text',
          text: result.stdout || 'Command executed successfully',
        },
      ],
    };
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
}

// Start a container running a Stellar node
const handleContainerStart: ToolHandler = async (args: unknown) => {
  const params = args as ContainerStartParams;
  const cliArgs = ['container', 'start'];
  
  if (params.network) cliArgs.push(params.network);
  if (params.dockerHost) cliArgs.push('--docker-host', params.dockerHost);
  if (params.name) cliArgs.push('--name', params.name);
  if (params.limits) cliArgs.push('--limits', params.limits);
  if (params.portsMapping) cliArgs.push('--ports-mapping', params.portsMapping);
  if (params.imageTagOverride) cliArgs.push('--image-tag-override', params.imageTagOverride);
  if (params.protocolVersion) cliArgs.push('--protocol-version', params.protocolVersion);
  
  return executeCLI(cliArgs);
};

// Stop a network container
const handleContainerStop: ToolHandler = async (args: unknown) => {
  const params = args as ContainerStopParams;
  const cliArgs = ['container', 'stop'];
  
  if (params.name) cliArgs.push(params.name);
  if (params.dockerHost) cliArgs.push('--docker-host', params.dockerHost);
  
  return executeCLI(cliArgs);
};

// Get logs from a running container
const handleContainerLogs: ToolHandler = async (args: unknown) => {
  const params = args as ContainerLogsParams;
  const cliArgs = ['container', 'logs'];
  
  if (params.name) cliArgs.push(params.name);
  if (params.dockerHost) cliArgs.push('--docker-host', params.dockerHost);
  
  return executeCLI(cliArgs);
};

// Export all container handlers
export const CONTAINER_HANDLERS: Record<string, ToolHandler> = {
  stellar_container_start: handleContainerStart,
  stellar_container_stop: handleContainerStop,
  stellar_container_logs: handleContainerLogs,
};