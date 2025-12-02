import * as vscode from 'vscode';

/**
 * Metadata for a highlighted file.
 */
interface HighlightMetadata {
  uri: vscode.Uri;
  timer?: NodeJS.Timeout;
}

/**
 * Store to keep track of file URIs to highlight.
 * Emits an event when the file list changes,
 * so the UI can be updated.
 * Automatically manages highlight expiration.
 */
export class HighlightStore {
  private _onDidChange = new vscode.EventEmitter<vscode.Uri[]>();
  public readonly onDidChange = this._onDidChange.event;

  private highlightedUris = new Map<string, HighlightMetadata>();

  /**
   * Adds a file to the highlight store with optional expiration.
   * @param uri The URI of the file to highlight.
   * @param durationMs Duration in ms before expiration (0 = infinite).
   */
  public add(uri: vscode.Uri, durationMs: number = 0): void {
    const key = uri.toString();

    // If file is already in store, cancel the old timer
    if (this.highlightedUris.has(key)) {
      const existing = this.highlightedUris.get(key);
      if (existing?.timer) {
        clearTimeout(existing.timer);
      }
    }

    // Create metadata
    const metadata: HighlightMetadata = { uri };

    // If duration is specified, set up expiration
    if (durationMs > 0) {
      metadata.timer = setTimeout(() => {
        this.delete(uri);
      }, durationMs);
    }

    this.highlightedUris.set(key, metadata);
    this._onDidChange.fire([...this.highlightedUris.values()].map(m => m.uri));
  }

  /**
   * Checks if a file is in the store.
   */
  public has(uri: vscode.Uri): boolean {
    return this.highlightedUris.has(uri.toString());
  }

  /**
   * Removes a file from the highlight store.
   */
  public delete(uri: vscode.Uri): void {
    const key = uri.toString();
    const metadata = this.highlightedUris.get(key);

    if (metadata) {
      // Cancel the timer if present
      if (metadata.timer) {
        clearTimeout(metadata.timer);
      }

      this.highlightedUris.delete(key);
      this._onDidChange.fire([...this.highlightedUris.values()].map(m => m.uri));
    }
  }

  /**
   * Clears the entire store.
   */
  public clear(): void {
    // Cancel all active timers
    for (const metadata of this.highlightedUris.values()) {
      if (metadata.timer) {
        clearTimeout(metadata.timer);
      }
    }

    this.highlightedUris.clear();
    this._onDidChange.fire([]);
  }

  /**
   * Gets the number of currently highlighted files.
   */
  public size(): number {
    return this.highlightedUris.size;
  }
}
