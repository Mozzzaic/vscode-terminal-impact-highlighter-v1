import * as vscode from 'vscode';
import { HighlightStore } from './highlight-store';

/**
 * Decoration provider responsible for adding a badge
 * to files present in the HighlightStore.
 */
export class HighlightDecorationProvider implements vscode.FileDecorationProvider {
  private _onDidChangeFileDecorations = new vscode.EventEmitter<
    vscode.Uri | vscode.Uri[] | undefined
  >();
  public readonly onDidChangeFileDecorations = this._onDidChangeFileDecorations.event;

  constructor(private store: HighlightStore) {}

  /**
   * Method called by VS Code for each file visible in the explorer.
   */
  provideFileDecoration(
    uri: vscode.Uri,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.FileDecoration> {
    if (this.store.has(uri)) {
      return new vscode.FileDecoration('●', 'Impact');
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
