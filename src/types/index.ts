// Stellar Pilot Type Definitions

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
  };
}

export interface ToolResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
  isError?: boolean;
}

export type ToolHandler = (args: any) => Promise<{
  content: Array<{
    type: string;
    text: string;
  }>;
  isError?: boolean;
}>;

export interface ModuleDefinition {
  tools: ToolDefinition[];
  handlers: Record<string, ToolHandler>;
}

// Future module types (placeholders)
export interface CLIModuleConfig {
  network?: 'testnet' | 'mainnet' | 'futurenet';
  stellarPath?: string;
}

export interface HorizonModuleConfig {
  horizonUrl?: string;
  network?: string;
}

export interface SDKModuleConfig {
  network?: string;
  horizonUrl?: string;
}

export interface DocsModuleConfig {
  indexPath?: string;
  searchLimit?: number;
}