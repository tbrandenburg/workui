# ghui

> A TUI built on top of [gh](https://cli.github.com/)

> [!IMPORTANT]
> This is very much a work in progress. Please open an issue if you have feature requests or bug reports.

![ghui demo screenshot](./media/ghui-screenshot.png)

## Installation

### Mac

```sh
brew install macklinu/tap/ghui
```

## Usage

Everything is built of top of [gh](https://cli.github.com/), so if you're authenticated via `gh auth login`, you should be able to view your GitHub (or GitHub Enterprise) repos with `ghui`.

> [!WARNING]
> I need to work on keybindings for navigation + more commands that get you into PR and issue list/detail views, so the entrypoints and keyboard shortcuts below are likely to change.

### Pull requests

View the PRs for the current working directory repo by typing `ghui prs`. Press `p` while in `ghui` to go to the PRs view at any time.

### Issues

Press `i` while in `ghui` to go to the issues view at any time.

## Development

To install dependencies:

```bash
bun install
```

To run and reload when saving changes:

```bash
bun run --watch src/index.tsx
```
