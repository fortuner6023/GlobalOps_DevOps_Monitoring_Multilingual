# Claude Code Extension – Cursor IDE Setup Guide

This document explains why the Claude Code extension often fails in Cursor and how to fix it.

---

## Quick start (Windows)

1. **Install Claude Code** (for the `claude` CLI; optional if you only need the Cursor extension):
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```
2. **Run the project script** from the repo root:
   ```powershell
   .\scripts\install-claude-extension-in-cursor.ps1
   ```
   The script looks for a local VSIX first; if none is found (e.g. with the native Windows installer), it **downloads the extension from Open VSX** and installs it into Cursor.
3. **Restart Cursor** completely, then in Cursor’s terminal run: `claude` to connect.

**Note:** The extension was installed into Cursor via the script (VSIX downloaded from Open VSX). Restart Cursor and run `claude` in the integrated terminal to start using it.

---

## Why It Doesn’t Work by Default

- **Cursor is VS Code–based** and supports VSIX extensions.
- **Claude Code’s IDE detection** looks for specific IDE signatures that Cursor doesn’t expose.
- So Claude Code may report “No Available IDEs” or “IDE is not connected” even when the extension is installed.

Fixing this requires **installing the extension manually** (and, if needed, installing Claude Code first so the VSIX file exists).

---

## Prerequisites

1. **Cursor IDE** installed.
2. **Claude Code** installed (needed to get the `claude-code.vsix` file).

---

## Step 1: Install Claude Code (if not already)

On **Windows**, use one of these:

**Option A – PowerShell (recommended)**  
Run in PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

**Option B – WinGet**

```powershell
winget install Anthropic.ClaudeCode
```

**Option C – npm (if you use Node.js)**

```bash
npm install -g @anthropic-ai/claude-code
```

After install, confirm:

```bash
claude --version
claude doctor
```

---

## Step 2: Find the VSIX File

After Claude Code is installed, the extension package is usually here:

| Platform   | Path |
|-----------|------|
| **Windows** | `%USERPROFILE%\.claude\local\node_modules\@anthropic-ai\claude-code\vendor\claude-code.vsix` |
| **macOS/Linux** | `~/.claude/local/node_modules/@anthropic-ai/claude-code/vendor/claude-code.vsix` |

On Windows, full path is typically:

```
C:\Users\<YourUsername>\.claude\local\node_modules\@anthropic-ai\claude-code\vendor\claude-code.vsix
```

If you used **WinGet** or a **native installer**, the VSIX might be under:

- `%LOCALAPPDATA%\Programs\Claude Code\`  
- or another path shown in the installer. Check the install folder for a `vendor` or `extensions` directory containing a `.vsix` file.

---

## Step 3: Install the Extension into Cursor

Use **one** of these methods.

### Method 1: Command line (recommended)

1. Close Cursor completely.
2. Open **PowerShell** or **Command Prompt**.
3. Run (replace with your actual path if different):

```powershell
cursor --install-extension "%USERPROFILE%\.claude\local\node_modules\@anthropic-ai\claude-code\vendor\claude-code.vsix"
```

4. Start Cursor again.

### Method 2: Drag and drop

1. Open Cursor.
2. Open the **Extensions** view: `Ctrl+Shift+X`.
3. In File Explorer, go to the folder where `claude-code.vsix` is located.
4. Drag `claude-code.vsix` into the Cursor Extensions panel.
5. Restart Cursor when prompted or after install.

### Method 3: Command Palette

1. In Cursor, press `Ctrl+Shift+P`.
2. Run: **Extensions: Install from VSIX**.
3. Browse to the `claude-code.vsix` file and select it.
4. Restart Cursor.

---

## Step 4: Connect Claude Code to Cursor

1. Open **Cursor**.
2. Open the **integrated terminal** (`Ctrl+`` `).
3. Run:

```bash
claude
```

4. If it asks to connect to an IDE, choose the option that corresponds to Cursor/VS Code.
5. You can also run `claude` and then `/ide` (or the “connect to IDE” command shown in the CLI).

**Tip:** Run `claude` from Cursor’s integrated terminal so it can detect the editor. Running only from an external terminal can sometimes prevent detection.

---

## Useful Shortcuts (after it’s working)

| Action              | Shortcut (Windows) |
|---------------------|--------------------|
| Open Claude Code    | `Ctrl+Esc`         |
| Insert file ref     | `Alt+Ctrl+K`       |

---

## Troubleshooting

### Claude Code tab is blank / not loading in center

If the **Claude Code** tab opens but the center (or panel) area is **empty/blank**, try these in order:

1. **Reload the window** — `Ctrl+Shift+P` → type **Developer: Reload Window** → Enter. The extension’s webview can end up blank after install or update; a reload often fixes it.
2. **Open Claude from a different entry point** — **Status bar**: click **✱ Claude Code** in the bottom-right of Cursor. **Command Palette**: `Ctrl+Shift+P` → type **Claude Code** → choose **Claude Code: Open in Side Bar** or **Open in New Tab**. Opening in the **sidebar** (right side) often works when the center tab stays blank in Cursor.
3. **Use the Spark icon** — Open a file (e.g. any `.md` or `.ts`). Look for the **Spark icon** in the **top-right editor toolbar** and click it to open Claude.
4. **Check workspace trust** — The extension does not run in Restricted Mode. If the workspace is untrusted, trust it and reload.
5. **Reduce extension conflicts** — Temporarily disable other AI extensions (e.g. Cline, Continue) and reload.
6. **Use terminal mode as fallback** — Settings (`Ctrl+,`) → search **Claude Code** → enable **Use Terminal**. Then run `claude` in the integrated terminal; the CLI uses the same account and history.

### Panel shows but does not respond to commands (stuck “thinking” / no reply)

If the Claude Code tab **loads** and you can type, but **nothing happens** when you send a message (stuck “thinking” or no response):

1. **Initialize git in the project** — Claude Code can hang in folders that are **not** a git repository (known regression since 2.1.31). In your project folder run:
   ```powershell
   git init
   ```
   Then **fully quit and restart Cursor**, and try Claude again.

2. **Clear stale IDE lock files** — Old lock files can leave the extension talking to a dead process. **Quit Cursor completely**, then delete the lock file(s):
   - Windows: `%USERPROFILE%\.claude\ide\` — delete any `.lock` files.
   - Reopen Cursor and open Claude Code again.

3. **Restart Cursor fully** — Not just “Reload Window”. Quit the app and start it again so the Claude Code process restarts.

4. **Use terminal mode** — If the panel still never responds, use the CLI instead: Settings → **Claude Code** → turn on **Use Terminal**. In the integrated terminal run `claude`; you get the same account and history, with input in the terminal.

5. **Run `/doctor` in terminal** — In the integrated terminal run `claude` and then type `/doctor` to check installation and config; fix any reported issues.

### “No Available IDEs” or “IDE is not connected”

- Install the extension using one of the methods above (don’t rely on Cursor’s marketplace if the extension isn’t listed).
- Fully **quit and restart Cursor** (not just “Reload Window”).
- Run `claude` from **Cursor’s integrated terminal**, then connect to IDE from the CLI.

### VSIX file not found

- Confirm **Claude Code is installed** (Step 1).
- Run `claude doctor` and check the output for install path.
- Search your user profile for `claude-code.vsix` (e.g. under `%USERPROFILE%\.claude` or `%LOCALAPPDATA%`).

### Extension still not working after Cursor update

- Reinstall the extension from the same VSIX (Method 1 or 2).
- Some users had issues on Cursor `0.51.1`; you can try a slightly older stable build if needed.

### `cursor` command not found

- Add Cursor to your PATH, or use the **full path** to the Cursor executable in the install command, for example:

```powershell
& "C:\Users\<You>\AppData\Local\Programs\cursor\Cursor.exe" --install-extension "C:\Users\<You>\.claude\local\node_modules\@anthropic-ai\claude-code\vendor\claude-code.vsix"
```

Replace `<You>` with your username and adjust the path if Cursor is installed elsewhere.

---

## Automated Script (Windows)

In this project, the script **`scripts/install-claude-extension-in-cursor.ps1`** can:

1. Look for the VSIX in the usual location.
2. If found, run `cursor --install-extension` with that path.
3. If not found, print the manual steps above.

Run it from the repo root in PowerShell:

```powershell
.\scripts\install-claude-extension-in-cursor.ps1
```

---

## Summary Checklist

- [ ] Claude Code installed (`claude --version` works).
- [ ] VSIX path known (e.g. under `%USERPROFILE%\.claude\local\...`).
- [ ] Extension installed in Cursor (CLI, drag-and-drop, or “Install from VSIX”).
- [ ] Cursor restarted after install.
- [ ] `claude` run from Cursor’s integrated terminal and connected to IDE.

After this, the Claude Code extension should work in Cursor. If you hit a different error, note the exact message and where it appears (Cursor UI vs `claude` CLI) for further troubleshooting.
