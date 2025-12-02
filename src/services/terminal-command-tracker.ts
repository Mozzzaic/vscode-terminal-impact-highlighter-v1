import * as vscode from 'vscode';

/**
 * Service to track commands executed in the integrated terminal.
 * Allows knowing if a command is currently running.
 */
export class TerminalCommandTracker {
  private runningCommands = new Set<number>();

  /**
   * Initializes the tracker by listening to terminal events.
   * @param context The extension context to register disposables.
   */
  public initialize(context: vscode.ExtensionContext): void {
    // Listen for shell execution start events
    context.subscriptions.push(
      vscode.window.onDidStartTerminalShellExecution((event) => {
        // Use a unique identifier for each execution
        const executionId = (event as any).execution?.commandLine?.value || Date.now();
        this.runningCommands.add(executionId);
        console.log(`Terminal command started: ${executionId}. Total running: ${this.runningCommands.size}`);
      })
    );

    // Listen for shell execution end events
    context.subscriptions.push(
      vscode.window.onDidEndTerminalShellExecution((event) => {
        const executionId = (event as any).execution?.commandLine?.value || Date.now();
        this.runningCommands.delete(executionId);
        console.log(`Terminal command ended: ${executionId}. Total running: ${this.runningCommands.size}`);
      })
    );
  }

  /**
   * Checks if at least one command is currently running.
   * @returns true if a command is active, false otherwise.
   */
  public isCommandRunning(): boolean {
    return this.runningCommands.size > 0;
  }

  /**
   * Gets the number of commands currently running.
   */
  public getRunningCommandCount(): number {
    return this.runningCommands.size;
  }
}
