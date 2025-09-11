// Version Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { CLIParser } from '../../utils/parser.js';
import { VersionParams, VersionResult } from '../../types/version.js';

// Helper function to execute CLI commands
async function executeCLI(
  command: string,
  args: Record<string, unknown>
): Promise<{ output?: string; error?: string }> {
  const executor = new CLIExecutor();
  const cliArgs = CLIParser.buildArgs(args);
  
  try {
    const result = await executor.execute({
      command,
      args: cliArgs,
    });
    return { output: result.stdout };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

// stellar version handler
const versionHandler: ToolHandler = async (args: unknown) => {
  const params = args as VersionParams;
  
  const result = await executeCLI('version', {
    ...(params.onlyVersion && { onlyVersion: true }),
    ...(params.onlyVersionMajor && { onlyVersionMajor: true }),
  });
  
  if (result.error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error getting version: ${result.error}`,
        },
      ],
    };
  }
  
  const versionResult = parseVersionOutput(result.output || '', params);
  
  return {
    content: [
      {
        type: 'text',
        text: formatVersionOutput(versionResult, params),
      },
    ],
  };
};

// Helper function to parse version output
function parseVersionOutput(output: string, params: VersionParams): VersionResult {
  const result: VersionResult = {};
  
  if (params.onlyVersion || params.onlyVersionMajor) {
    // Simple version output
    const version = output.trim();
    if (params.onlyVersionMajor) {
      result.majorVersion = version;
    } else {
      result.version = version;
    }
  } else {
    // Full version info
    result.fullInfo = output;
    
    // Try to extract specific components
    const versionMatch = output.match(/stellar(?:[-\s]+cli)?(?:[-\s]+)?v?(\d+\.\d+\.\d+)/i);
    if (versionMatch) {
      result.version = versionMatch[1];
    }
    
    const commitMatch = output.match(/commit[:\s]+([a-f0-9]{7,40})/i);
    if (commitMatch) {
      result.gitCommit = commitMatch[1];
    }
    
    const dateMatch = output.match(/built[:\s]+(.+?)(?:\n|$)/i);
    if (dateMatch) {
      result.buildDate = dateMatch[1];
    }
    
    const rustMatch = output.match(/rust[:\s]+(.+?)(?:\n|$)/i);
    if (rustMatch) {
      result.rustVersion = rustMatch[1];
    }
    
    const platformMatch = output.match(/target[:\s]+(.+?)(?:\n|$)/i);
    if (platformMatch) {
      result.platform = platformMatch[1];
    }
  }
  
  return result;
}

// Helper function to format version output
function formatVersionOutput(result: VersionResult, params: VersionParams): string {
  if (params.onlyVersionMajor && result.majorVersion) {
    return `Major version: ${result.majorVersion}`;
  }
  
  if (params.onlyVersion && result.version) {
    return `Version: ${result.version}`;
  }
  
  if (result.fullInfo) {
    const output: string[] = ['Stellar CLI Version Information:', ''];
    
    if (result.version) {
      output.push(`Version: ${result.version}`);
    }
    if (result.gitCommit) {
      output.push(`Git Commit: ${result.gitCommit}`);
    }
    if (result.buildDate) {
      output.push(`Build Date: ${result.buildDate}`);
    }
    if (result.rustVersion) {
      output.push(`Rust Version: ${result.rustVersion}`);
    }
    if (result.platform) {
      output.push(`Platform: ${result.platform}`);
    }
    
    output.push('', 'Full Output:', '```', result.fullInfo, '```');
    
    return output.join('\n');
  }
  
  return 'Version information not available';
}

// Export handlers
export const VERSION_HANDLERS: Record<string, ToolHandler> = {
  stellar_version: versionHandler,
};