// Completion Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { CLIParser } from '../../utils/parser.js';
import { CompletionParams, CompletionResult } from '../../types/completion.js';

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

// stellar completion handler
const completionHandler: ToolHandler = async (args: unknown) => {
  const params = args as CompletionParams;
  
  const result = await executeCLI('completion', {
    shell: params.shell,
  });
  
  if (result.error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error generating shell completion: ${result.error}`,
        },
      ],
    };
  }
  
  const completionResult: CompletionResult = {
    shell: params.shell,
    script: result.output || '',
    instructions: getShellInstructions(params.shell),
  };
  
  return {
    content: [
      {
        type: 'text',
        text: formatCompletionOutput(completionResult),
      },
    ],
  };
};

// Helper function to get shell-specific instructions
function getShellInstructions(shell: string): string {
  switch (shell) {
    case 'bash':
      return 'To enable: source <(stellar completion --shell bash)\n' +
             'Or add to ~/.bashrc for permanent setup';
    case 'zsh':
      return 'To enable: source <(stellar completion --shell zsh)\n' +
             'Or add to ~/.zshrc for permanent setup';
    case 'fish':
      return 'To enable: stellar completion --shell fish > ~/.config/fish/completions/stellar.fish';
    case 'powershell':
      return 'To enable: stellar completion --shell powershell | Out-String | Invoke-Expression\n' +
             'Or add to $PROFILE for permanent setup';
    case 'elvish':
      return 'To enable: stellar completion --shell elvish > ~/.elvish/lib/stellar-completion.elv';
    default:
      return '';
  }
}

// Helper function to format completion output
function formatCompletionOutput(result: CompletionResult): string {
  const output: string[] = [];
  
  output.push(`Shell completion code for ${result.shell}:\n`);
  output.push('```' + result.shell);
  output.push(result.script);
  output.push('```\n');
  
  if (result.instructions) {
    output.push('Setup Instructions:');
    output.push(result.instructions);
  }
  
  return output.join('\n');
}

// Export handlers
export const COMPLETION_HANDLERS: Record<string, ToolHandler> = {
  stellar_completion: completionHandler,
};