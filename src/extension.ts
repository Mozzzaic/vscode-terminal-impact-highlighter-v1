import * as vscode from 'vscode';
import { minimatch } from 'minimatch';
import { ConfigService } from './services/config.service';
import { TerminalCommandTracker } from './services/terminal-command-tracker';
import { HighlightStore } from './features/highlight-store';
import { HighlightDecorationProvider } from './features/highlight-decoration-provider';
import { StatusBarController } from './features/status-bar-controller';

export function activate(context: vscode.ExtensionContext) {
  console.log('Terminal Impact Highlighter extension activated');

  // 1. Instantiate services and features
  const configService = new ConfigService();
  const terminalTracker = new TerminalCommandTracker();
  const highlightStore = new HighlightStore();
  const decorationProvider = new HighlightDecorationProvider(highlightStore);
  const statusBarController = new StatusBarController(configService);

  // 2. Initialize terminal command tracker
  terminalTracker.initialize(context);

  // 3. Register status bar controller for disposal
  context.subscriptions.push(statusBarController);

  // 4. Register decoration provider
  context.subscriptions.push(
    vscode.window.registerFileDecorationProvider(decorationProvider)
  );

  // 5. Listen to store changes to refresh decorations
  highlightStore.onDidChange(() => {
    decorationProvider.refresh();
  });

  // 6. Listen to configuration changes to update status bar
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('terminalImpactHighlighter')) {
        statusBarController.update();
      }
    })
  );

  // 7. Create FileSystemWatcher to detect changes
  const fileWatcher = vscode.workspace.createFileSystemWatcher('**/*');

  // Common handler for file events
  const handleFileEvent = (uri: vscode.Uri) => {
    // Check 1: Is the extension enabled?
    if (!configService.isEnabled()) {
      console.log(`Extension disabled, ignoring file: ${uri.fsPath}`);
      return;
    }

    // Check 2: Based on mode, do we need an active terminal command?
    const triggerMode = configService.getTriggerMode();
    const isCommandRunning = terminalTracker.isCommandRunning();

    // If "terminalOnly" mode AND no command is running, ignore
    if (triggerMode === 'terminalOnly' && !isCommandRunning) {
      console.log(`Terminal-only mode and no command running, ignoring file: ${uri.fsPath}`);
      return;
    }

    // Check 3: Does the file pass include/exclude filters?
    if (!shouldHighlightFile(uri, configService)) {
      console.log(`File filtered out: ${uri.fsPath}`);
      return;
    }

    // All conditions met, add to store
    const durationMs = configService.getHighlightDurationMs();
    highlightStore.add(uri, durationMs);
    console.log(`File highlighted: ${uri.fsPath} (mode: ${triggerMode}, duration: ${durationMs}ms)`);
  };

  // File events
  fileWatcher.onDidCreate(handleFileEvent);
  fileWatcher.onDidChange(handleFileEvent);

  // 8. Command to clear all highlights
  const clearHighlightsCommand = vscode.commands.registerCommand(
    'terminal-impact-highlighter.clearHighlights',
    () => {
      highlightStore.clear();
      vscode.window.showInformationMessage('All highlights cleared.');
    }
  );

  // 9. Command to toggle extension activation
  const toggleEnabledCommand = vscode.commands.registerCommand(
    'terminal-impact-highlighter.toggleEnabled',
    async () => {
      const config = vscode.workspace.getConfiguration('terminalImpactHighlighter');
      const currentValue = config.get<boolean>('enabled', true);
      await config.update('enabled', !currentValue, vscode.ConfigurationTarget.Global);
      const newState = !currentValue ? 'enabled' : 'disabled';
      vscode.window.showInformationMessage(`Terminal Impact Highlighter ${newState}.`);
    }
  );

  // 10. Hello World command (for testing)
  const helloWorldCommand = vscode.commands.registerCommand(
    'terminal-impact-highlighter.helloWorld',
    () => {
      vscode.window.showInformationMessage(
        `Terminal Impact Highlighter is active! Running commands: ${terminalTracker.getRunningCommandCount()}`
      );
    }
  );

  // Register disposables
  context.subscriptions.push(fileWatcher, clearHighlightsCommand, toggleEnabledCommand, helloWorldCommand);
}

/**
 * Checks if a file should be highlighted based on include/exclude filters.
 */
function shouldHighlightFile(uri: vscode.Uri, config: ConfigService): boolean {
  const relativePath = vscode.workspace.asRelativePath(uri, false);
  const includePatterns = config.getIncludePatterns();
  const excludePatterns = config.getExcludePatterns();

  // Check exclude patterns first
  for (const pattern of excludePatterns) {
    if (minimatch(relativePath, pattern, { dot: true })) {
      return false;
    }
  }

  // Check include patterns
  for (const pattern of includePatterns) {
    if (minimatch(relativePath, pattern, { dot: true })) {
      return true;
    }
  }

  // If no include pattern matches, reject
  return false;
}

export function deactivate() {
  console.log('Terminal Impact Highlighter extension deactivated');
}
