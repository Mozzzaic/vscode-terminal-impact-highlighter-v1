import * as vscode from 'vscode';

/**
 * Configuration service for the extension.
 * Encapsulates reading settings from VS Code configuration.
 */
export class ConfigService {
  private readonly configSection = 'terminalImpactHighlighter';

  /**
   * Checks if the extension is enabled.
   */
  public isEnabled(): boolean {
    return this.getConfig().get<boolean>('enabled', true);
  }

  /**
   * Gets the highlight duration in milliseconds.
   * @returns The duration in ms, or 0 for infinite duration.
   */
  public getHighlightDurationMs(): number {
    return this.getConfig().get<number>('highlightDurationMs', 0);
  }

  /**
   * Gets the include patterns (glob).
   */
  public getIncludePatterns(): string[] {
    return this.getConfig().get<string[]>('include', ['**/*']);
  }

  /**
   * Gets the exclude patterns (glob).
   */
  public getExcludePatterns(): string[] {
    return this.getConfig().get<string[]>('exclude', []);
  }

  /**
   * Gets the trigger mode.
   * @returns 'terminalOnly' or 'always'
   */
  public getTriggerMode(): 'terminalOnly' | 'always' {
    return this.getConfig().get<'terminalOnly' | 'always'>('triggerMode', 'terminalOnly');
  }

  /**
   * Gets the VS Code configuration object.
   */
  private getConfig(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration(this.configSection);
  }
}
