// Completion Command Type Definitions

// Print shell completion code
export interface CompletionParams {
  shell: 'bash' | 'elvish' | 'fish' | 'powershell' | 'zsh';
}

// Result types for completion operations
export interface CompletionResult {
  shell: string;
  script: string;
  instructions?: string;
}