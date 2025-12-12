import * as vscode from 'vscode';
import { HighlightStore } from './highlight-store';
import { ConfigService } from '../services/config.service';

/**
 * Decoration provider responsible for adding a badge
 * to files present in the HighlightStore.
 */
export class HighlightDecorationProvider implements vscode.FileDecorationProvider {
  private _onDidChangeFileDecorations = new vscode.EventEmitter<
    vscode.Uri | vscode.Uri[] | undefined
  >();
  public readonly onDidChangeFileDecorations = this._onDidChangeFileDecorations.event;

  constructor(
    private store: HighlightStore,
    private configService: ConfigService
  ) {}

  /**
   * Method called by VS Code for each file visible in the explorer.
   * Uses orange/amber theme color for professional IDE-like appearance.
   */
  provideFileDecoration(
    uri: vscode.Uri,
    _token: vscode.CancellationToken  // Prefixed with _ to indicate intentionally unused
  ): vscode.ProviderResult<vscode.FileDecoration> {
    if (this.store.has(uri)) {
      // Use orange/amber theme color with configurable badge symbol
      return new vscode.FileDecoration(
        this.configService.getBadgeSymbol(),  // Configurable badge symbol
        'Modified by Terminal Impact',  // Tooltip on hover
        new vscode.ThemeColor('charts.orange')  // Professional orange color that works in light/dark themes
      );
    }
    return undefined;
  }

  /**
   * Notifies VS Code that it should refresh decorations.
   * @param uris Specific URIs to refresh, or undefined to refresh all.
   */
  public refresh(uris?: vscode.Uri[]): void {
    this._onDidChangeFileDecorations.fire(uris);
  }
}
