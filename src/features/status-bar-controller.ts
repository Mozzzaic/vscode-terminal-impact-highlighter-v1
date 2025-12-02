import * as vscode from 'vscode';
import { ConfigService } from '../services/config.service';

/**
 * Status bar controller to display the extension's state.
 * Displays a clickable button that allows toggling the extension activation.
 */
export class StatusBarController {
  private statusBarItem: vscode.StatusBarItem;

  constructor(private configService: ConfigService) {
    // Create the status bar item aligned to the left
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100
    );

    // Set the command to execute on click
    this.statusBarItem.command = 'terminal-impact-highlighter.toggleEnabled';

    // Show the item
    this.statusBarItem.show();

    // Initialize the display
    this.update();
  }

  /**
   * Updates the status bar display based on the current configuration state.
   */
  public update(): void {
    const isEnabled = this.configService.isEnabled();

    if (isEnabled) {
      this.statusBarItem.text = '$(circle-filled) TIH On';
      this.statusBarItem.tooltip = 'Terminal Impact Highlighter: Extension enabled';
    } else {
      this.statusBarItem.text = '$(circle-outline) TIH Off';
      this.statusBarItem.tooltip = 'Terminal Impact Highlighter: Extension disabled';
    }
  }

  /**
   * Disposes of the status bar item resources.
   */
  public dispose(): void {
    this.statusBarItem.dispose();
  }
}
