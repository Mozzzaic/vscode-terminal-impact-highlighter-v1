import * as vscode from 'vscode';

/**
 * Configuration service for the extension.
 * Encapsulates reading settings from VS Code configuration.
 * Supports in-memory overrides for when settings can't be saved.
 */
export class ConfigService {
  private readonly configSection = 'terminalImpactHighlighter';
  private inMemoryEnabledState: boolean | undefined = undefined;

  /**
   * Checks if the extension is enabled.
   * Returns in-memory override if set, otherwise reads from config.
   */
  public isEnabled(): boolean {
    if (this.inMemoryEnabledState !== undefined) {
      return this.inMemoryEnabledState;
    }
    return this.getConfig().get<boolean>('enabled', true);
  }

  /**
   * Sets an in-memory override for the enabled state.
   * Used when settings file can't be written to.
   */
  public setInMemoryEnabled(enabled: boolean): void {
    this.inMemoryEnabledState = enabled;
  }

  /**
   * Clears the in-memory override, reverting to config file.
   */
  public clearInMemoryEnabled(): void {
    this.inMemoryEnabledState = undefined;
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
    return this.getConfig().get<'terminalOnly' | 'always'>('triggerMode', 'always');
  }

  /**
   * Gets the VS Code configuration object.
   */
  private getConfig(): vscode.WorkspaceConfiguration {
    return vscode.workspace.getConfiguration(this.configSection);
  }
}
