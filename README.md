# Terminal Impact

**See what changed. Instantly.**

Terminal Impact adds visual badges to your VS Code Explorer for files created or modified by your tools. Whether it's a CLI command or an AI Agent, never lose track of filesystem changes again.

## Why use this?

*   **For CLI Users:** You run `rails g model User` or `npm install`. Dozens of files appear. Which ones? This extension lights them up.
*   **For AI Users (Cursor / Claude):** AI agents write code fast. Sometimes too fast. Switch to **"Always" mode** to visually track every file the AI touches in real-time.

## Features

### 🚀 Two Detection Modes
*   **Terminal Only (Default):** Zero noise. The extension *only* highlights files when a terminal command is running. Perfect for keeping focus.
*   **Always (AI Mode):** Highlights *any* file change on disk. Essential when using tools like **Claude Code**, **Cursor**, or external scripts.

### ⚡️ Instant Feedback
*   **Created (C):** Green badge for new files.
*   **Modified (M):** Blue badge for changed files.
*   Badges automatically disappear when you open the file or after a configurable timeout.

### 🎛️ Status Bar Control
Toggle the extension On/Off instantly with a single click in your Status Bar.
*   `$(circle-filled) TI On` : Watching active.
*   `$(circle-outline) TI Off` : Extension disabled.

---

## Configuration

You can customize everything in your User Settings (`settings.json`):

| Setting | Default | Description |
| :--- | :--- | :--- |
| `terminalImpactHighlighter.triggerMode` | `"terminalOnly"` | **Crucial Setting.** Use `"terminalOnly"` for standard CLI usage. Switch to `"always"` to track AI Agents (Claude/Cursor). |
| `terminalImpactHighlighter.highlightDurationMs` | `0` | How long (in ms) badges stay visible. `0` means infinite (stays until manually cleared). Set to `5000` for 5 seconds timeout. |
| `terminalImpactHighlighter.enabled` | `true` | Master switch for the extension. |
| `terminalImpactHighlighter.include` | `["**/*"]` | Glob patterns to watch. |
| `terminalImpactHighlighter.exclude` | `["**/node_modules/**", "**/.git/**"]` | Glob patterns to ignore (highly recommended for performance). |

### Customizing Colors
Don't like the default Green/Blue? You can change them in your `settings.json`:
"workbench.colorCustomizations": {
"terminalImpactHighlighter.createdResourceForeground": "#ff0000",
"terminalImpactHighlighter.modifiedResourceForeground": "#ffff00"
}

---

## Commands

*   **Terminal Impact: Toggle Enabled**: Quickly enable/disable the extension (same as clicking the Status Bar item).
*   **Terminal Impact: Clear All Highlights**: Manually remove all current badges from the explorer.

## Installation

1.  Install via VS Code Marketplace.
2.  Reload VS Code.
3.  Run a command in your terminal!

---

**Enjoy coding with clarity!**
