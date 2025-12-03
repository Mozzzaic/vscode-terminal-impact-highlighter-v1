# Change Log

All notable changes to the "Terminal Impact" extension will be documented in this file.

## [1.0.6] - 2024-12-03

### Changed
- **Documentation Update:** Added screenshot to README showing the extension in action
- Improved README with better diamond icon (◆) explanations throughout
- Updated "Why use this?" section to explicitly mention diamond badges
- Enhanced Features section with detailed visual feedback descriptions

### Note
- All features from v1.0.5 included (diamond badge, auto-clear, error handling, etc.)

## [1.0.5] - 2024-12-03 (Unpublished)

### Note
- This version was published but immediately superseded by v1.0.6 with improved documentation

### Changed
- **Visual Update:** Changed badge character from circle (●) to diamond (◆) for better distinction from GitHub UI elements
- Improved badge color with professional orange theme color (`charts.orange`) that adapts to light/dark themes
- Enhanced tooltip text to "Modified by Terminal Impact" for better clarity

### Fixed
- **Status bar button now works reliably** with robust error handling and 3-layer fallback strategy
- **Fixed settings file error handling** - Extension now works even when VS Code settings.json has syntax errors
- **Auto-clear highlights when opening files** - highlights now automatically disappear when you click/open a file
- Fixed toggle command to properly update status bar and clear highlights when disabling
- Extension no longer conflicts with GitHub's existing UI indicators

### Added
- **In-memory state management** - Extension works in current session even if settings can't be saved
- **3-layer fallback strategy**: Tries Global settings → Workspace settings → In-memory state
- **User-friendly error dialogs** with options to "Open Settings" or "Continue Anyway"
- Automatic highlight cleanup when opening or focusing files in the editor
- Error handling and logging for toggle command debugging
- Configuration change listener now auto-clears highlights when extension is disabled

## [0.0.4] - 2024-12-03 (Unpublished)

### Note
- This version was not published. All features moved to v1.0.5

## [0.0.3] - 2024-12-03

### Changed
- **BREAKING CHANGE:** Default trigger mode changed from "terminalOnly" to "always"
- Extension now works out-of-the-box without configuration
- Highlights all file changes by default (manual edits, AI agents, terminal commands)
- Users can switch to "terminalOnly" mode in settings if they prefer CLI-only tracking
- Updated documentation to reflect new default behavior

### Fixed
- Extension now works immediately after installation without requiring settings changes
- Better user experience for AI-assisted development workflows

## [0.0.2] - 2024-12-03

### Changed
- Cleaned up README.md (removed placeholder demo GIF note)
- Improved documentation clarity

### Fixed
- Status bar button now shows "TI On/Off" instead of "Highlighter On/Off"
- Default highlight duration changed to infinite (0ms) instead of 5 seconds
- Extension works reliably with infinite highlight duration

## [0.0.1] - 2024-12-03

### Added
- Initial release
- Two detection modes: "terminalOnly" and "always"
- Status bar toggle button
- File highlight badges in VS Code Explorer
- Configurable highlight duration
- Include/exclude glob pattern filtering
- Auto-expiration of highlights (configurable)
- Modular architecture with services and features
