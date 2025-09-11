// CLI Command Executor
import { spawn } from 'child_process';
import { CLIExecutorOptions, CLIExecutorResult } from '../types/index.js';

export class CLIExecutor {
  private stellarPath: string;
  private defaultTimeout: number;

  constructor(stellarPath: string = 'stellar', defaultTimeout: number = 60000) {
    this.stellarPath = stellarPath;
    this.defaultTimeout = defaultTimeout;
  }

  /**
   * Execute a Stellar CLI command
   */
  async execute(options: CLIExecutorOptions): Promise<CLIExecutorResult> {
    return new Promise((resolve, reject) => {
      const { command, args, cwd, env, timeout = this.defaultTimeout, json = false } = options;
      
      // Build the full command
      const fullArgs = [command, ...args];
      
      // Log the command for debugging
      console.error(`Executing: ${this.stellarPath} ${fullArgs.join(' ')}`);
      
      const child = spawn(this.stellarPath, fullArgs, {
        cwd,
        env: { ...process.env, ...env },
        shell: false,
      });

      let stdout = '';
      let stderr = '';
      let timedOut = false;

      // Set timeout
      const timer = setTimeout(() => {
        timedOut = true;
        child.kill('SIGTERM');
      }, timeout);

      // Capture stdout
      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      // Capture stderr
      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      // Handle process completion
      child.on('close', (exitCode) => {
        clearTimeout(timer);

        if (timedOut) {
          reject(new Error(`Command timed out after ${timeout}ms`));
          return;
        }

        const result: CLIExecutorResult = {
          stdout: stdout.trim(),
          stderr: stderr.trim(),
          exitCode: exitCode || 0,
        };

        // Try to parse JSON output if requested
        if (json && result.stdout) {
          try {
            result.parsed = JSON.parse(result.stdout);
          } catch (e) {
            // If JSON parsing fails, leave parsed as undefined
            console.error('Failed to parse JSON output:', e);
          }
        }

        // Check for common errors in stderr
        if (result.exitCode !== 0) {
          const errorMessage = this.extractErrorMessage(result);
          reject(new Error(errorMessage));
          return;
        }

        resolve(result);
      });

      // Handle process errors
      child.on('error', (error) => {
        clearTimeout(timer);
        if (error.message.includes('ENOENT')) {
          reject(new Error(`Stellar CLI not found. Please ensure 'stellar' is installed and in PATH.`));
        } else {
          reject(error);
        }
      });
    });
  }

  /**
   * Extract a meaningful error message from the result
   */
  private extractErrorMessage(result: CLIExecutorResult): string {
    // Check stderr first
    if (result.stderr) {
      // Look for common error patterns
      if (result.stderr.includes('error:')) {
        const match = result.stderr.match(/error:\s*(.+)/i);
        if (match) return match[1];
      }
      if (result.stderr.includes('Error:')) {
        const match = result.stderr.match(/Error:\s*(.+)/i);
        if (match) return match[1];
      }
      // Return full stderr if no pattern matched
      return result.stderr;
    }

    // Check stdout for errors
    if (result.stdout && result.stdout.toLowerCase().includes('error')) {
      return result.stdout;
    }

    // Default error message
    return `Command failed with exit code ${result.exitCode}`;
  }

  /**
   * Check if Stellar CLI is available
   */
  async checkAvailability(): Promise<boolean> {
    try {
      const result = await this.execute({
        command: 'version',
        args: [],
        timeout: 5000,
      });
      return result.exitCode === 0;
    } catch {
      return false;
    }
  }

  /**
   * Get Stellar CLI version
   */
  async getVersion(): Promise<string> {
    const result = await this.execute({
      command: 'version',
      args: [],
      timeout: 5000,
    });
    return result.stdout;
  }
}