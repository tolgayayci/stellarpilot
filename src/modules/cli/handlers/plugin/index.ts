// Plugin Handlers
import { ToolHandler } from '../../../../types/index.js';
import { CLIExecutor } from '../../utils/executor.js';
import { 
  PluginSearchParams, 
  PluginSearchResult,
  PluginListParams,
  PluginListResult,
  PluginInfo,
  InstalledPlugin
} from '../../types/plugin.js';

// Helper function to execute CLI commands
async function executeCLI(
  command: string,
  subcommand: string,
  args: string[] = []
): Promise<{ output?: string; error?: string }> {
  const executor = new CLIExecutor();
  
  try {
    const result = await executor.execute({
      command: 'plugin',
      args: [subcommand, ...args],
    });
    return { output: result.stdout };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

// stellar plugin search handler
const pluginSearchHandler: ToolHandler = async (args: unknown) => {
  const result = await executeCLI('plugin', 'search');
  
  if (result.error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error searching for plugins: ${result.error}`,
        },
      ],
    };
  }
  
  const searchResult = parseSearchOutput(result.output || '');
  
  return {
    content: [
      {
        type: 'text',
        text: formatSearchOutput(searchResult),
      },
    ],
  };
};

// stellar plugin list handler
const pluginListHandler: ToolHandler = async (args: unknown) => {
  const result = await executeCLI('plugin', 'ls');
  
  if (result.error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error listing plugins: ${result.error}`,
        },
      ],
    };
  }
  
  const listResult = parseListOutput(result.output || '');
  
  return {
    content: [
      {
        type: 'text',
        text: formatListOutput(listResult),
      },
    ],
  };
};

// Helper function to parse plugin search output
function parseSearchOutput(output: string): PluginSearchResult {
  const plugins: PluginInfo[] = [];
  
  // Parse the output to extract plugin information
  // This is a simple parser that looks for common patterns
  const lines = output.split('\n');
  let currentPlugin: PluginInfo | null = null;
  
  for (const line of lines) {
    // Look for plugin name patterns
    if (line.includes('stellar-') || line.includes('soroban-')) {
      if (currentPlugin) {
        plugins.push(currentPlugin);
      }
      currentPlugin = {
        name: line.trim(),
      };
    } else if (currentPlugin) {
      // Look for additional information
      if (line.includes('Description:')) {
        currentPlugin.description = line.replace('Description:', '').trim();
      } else if (line.includes('Repository:')) {
        currentPlugin.repository = line.replace('Repository:', '').trim();
      } else if (line.includes('Stars:')) {
        const stars = parseInt(line.replace('Stars:', '').trim());
        if (!isNaN(stars)) {
          currentPlugin.stars = stars;
        }
      } else if (line.includes('Author:')) {
        currentPlugin.author = line.replace('Author:', '').trim();
      } else if (line.includes('URL:')) {
        currentPlugin.url = line.replace('URL:', '').trim();
      }
    }
  }
  
  if (currentPlugin) {
    plugins.push(currentPlugin);
  }
  
  // If no structured data found, try to parse as list
  if (plugins.length === 0 && output.trim()) {
    const items = output.split('\n').filter(line => line.trim());
    for (const item of items) {
      if (item && !item.startsWith('Searching') && !item.startsWith('Found')) {
        plugins.push({ name: item.trim() });
      }
    }
  }
  
  return {
    plugins,
    totalCount: plugins.length,
  };
}

// Helper function to parse plugin list output
function parseListOutput(output: string): PluginListResult {
  const plugins: InstalledPlugin[] = [];
  
  // Parse the output to extract installed plugin information
  const lines = output.split('\n');
  
  for (const line of lines) {
    if (!line.trim() || line.startsWith('Installed plugins:') || line.startsWith('No plugins')) {
      continue;
    }
    
    // Parse different formats of plugin listing
    // Format 1: "plugin-name v1.0.0 (active)"
    const match1 = line.match(/^(.+?)\s+v?([\d.]+)\s*\((\w+)\)/);
    if (match1) {
      plugins.push({
        name: match1[1].trim(),
        version: match1[2],
        status: match1[3] as 'active' | 'inactive' | 'error',
      });
      continue;
    }
    
    // Format 2: "plugin-name (version: 1.0.0)"
    const match2 = line.match(/^(.+?)\s*\(version:\s*([\d.]+)\)/);
    if (match2) {
      plugins.push({
        name: match2[1].trim(),
        version: match2[2],
        status: 'active',
      });
      continue;
    }
    
    // Format 3: Simple plugin name
    if (line.trim()) {
      plugins.push({
        name: line.trim(),
        status: 'active',
      });
    }
  }
  
  return { plugins };
}

// Helper function to format search output
function formatSearchOutput(result: PluginSearchResult): string {
  const output: string[] = [];
  
  if (result.plugins.length === 0) {
    return 'No plugins found. Try searching on GitHub for Stellar CLI plugins.';
  }
  
  output.push(`Found ${result.totalCount} plugin(s):\n`);
  
  for (const plugin of result.plugins) {
    output.push(`**${plugin.name}**`);
    if (plugin.description) {
      output.push(`  Description: ${plugin.description}`);
    }
    if (plugin.repository) {
      output.push(`  Repository: ${plugin.repository}`);
    }
    if (plugin.stars !== undefined) {
      output.push(`  Stars: ${plugin.stars}`);
    }
    if (plugin.author) {
      output.push(`  Author: ${plugin.author}`);
    }
    if (plugin.url) {
      output.push(`  URL: ${plugin.url}`);
    }
    output.push('');
  }
  
  return output.join('\n');
}

// Helper function to format list output
function formatListOutput(result: PluginListResult): string {
  const output: string[] = [];
  
  if (result.plugins.length === 0) {
    return 'No plugins installed. Use `stellar plugin search` to find available plugins.';
  }
  
  output.push(`Installed plugins (${result.plugins.length}):\n`);
  
  for (const plugin of result.plugins) {
    let line = `• ${plugin.name}`;
    if (plugin.version) {
      line += ` v${plugin.version}`;
    }
    if (plugin.status) {
      const statusIcon = plugin.status === 'active' ? '✓' : 
                        plugin.status === 'error' ? '✗' : '-';
      line += ` [${statusIcon} ${plugin.status}]`;
    }
    output.push(line);
    
    if (plugin.description) {
      output.push(`  ${plugin.description}`);
    }
    if (plugin.path) {
      output.push(`  Path: ${plugin.path}`);
    }
  }
  
  return output.join('\n');
}

// Export handlers
export const PLUGIN_HANDLERS: Record<string, ToolHandler> = {
  stellar_plugin_search: pluginSearchHandler,
  stellar_plugin_list: pluginListHandler,
};