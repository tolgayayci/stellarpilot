// Doctor Command Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { DoctorParams } from '../../types/doctor.js';

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

// Diagnose and troubleshoot CLI and network issues
const handleDoctor: ToolHandler = async (args: unknown) => {
  const params = args as DoctorParams;
  const cliArgs = ['doctor'];
  
  if (params.configDir) cliArgs.push('--config-dir', params.configDir);
  
  return executeCLI(cliArgs);
};

// Export all doctor handlers
export const DOCTOR_HANDLERS: Record<string, ToolHandler> = {
  stellar_doctor: handleDoctor,
};