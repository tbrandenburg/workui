# workui

> A TUI built on top of [work CLI](https://github.com/tbrandenburg/work/)

> [!IMPORTANT]
> This is very much a work in progress. Please open an issue if you have feature requests or bug reports.

![workui demo screenshot](./media/ghui-screenshot.png)

## Overview

workui is a terminal user interface for the work CLI - a unified, stateless command-line tool that bridges AI agents and task management systems. It provides a visual interface for managing work items across multiple backends (Jira, GitHub, Linear, Azure DevOps, local filesystem) without vendor lock-in.

**Key Features:**

- Visual interface for work CLI commands
- Context-aware work item management
- Multi-backend support through work CLI
- Real-time work item filtering and querying
- Relationship visualization between work items

## Prerequisites

- [work CLI](https://github.com/tbrandenburg/work/) installed and configured
- Node.js 18+ (LTS recommended)
- Authenticated contexts in work CLI (see work CLI documentation)

## Installation

### Mac

```sh
brew install macklinu/tap/workui
```

If you're looking for Windows or Linux builds, please check the [Releases page](https://github.com/macklinu/workui/releases) for now and/or help me figure out how to publish the executables to [Linux](https://github.com/macklinu/workui/issues/2) or [Windows](https://github.com/macklinu/workui/issues/3) package managers.

## Usage

Everything is built on top of [work CLI](https://github.com/tbrandenburg/work/), so you need to have work CLI installed and configured with at least one context.

> [!WARNING]
> I need to work on keybindings for navigation + more commands that get you into work item list/detail views, so the entrypoints and keyboard shortcuts below are likely to change.

### Work Items

View work items for the current context by typing `workui items`. Press `i` while in `workui` to go to the work items view at any time.

### Contexts

Press `c` while in `workui` to switch between configured work CLI contexts at any time.

## Context Management

workui leverages work CLI's context system. Before using workui, ensure you have configured at least one context:

```bash
# Example: Add a GitHub context
work context add gh-project --tool github --repo owner/repo

# Example: Add a Jira context
work context add jira-project --tool jira --project ABC

# Set active context
work context set gh-project

# Now you can use workui
workui items
```

## Development

To install dependencies:

```bash
bun install
```

To run and reload when saving changes:

```bash
bun run --watch src/index.tsx
```

## Architecture

workui is built using:

- [OpenTUI](https://github.com/sst/opentui) for terminal UI components
- [Effect](https://effect.website/) for functional programming patterns
- [work CLI](https://github.com/tbrandenburg/work/) as the backend

The application follows a context-driven architecture where:

1. **Contexts** define tool + scope + credentials
2. **Work items** are queried and managed within contexts
3. **Relations** between work items are visualized and navigable

## Target Users

- **Applied AI Engineers**: Visual interface for agent-driven task management
- **Product & Business Owners**: Quick overview of work items across projects
- **DevOps Engineers**: Visual monitoring of work items in CI/CD workflows
- **Technical Project Managers**: Unified view across different project management systems

## Contributing

1. Follow the coding standards
2. Write tests for new features
3. Update documentation for new features
4. Ensure compatibility with work CLI interface

## License

MIT License - see [LICENSE](LICENSE) for details.

## Credits and Acknowledgements

This project is forked from [ghui](https://github.com/macklinu/ghui) by [Mackie Underdown](https://github.com/macklinu). The original ghui provided a terminal user interface for GitHub CLI, which served as the foundation for workui's architecture and design patterns.

**Original ghui features that inspired workui:**

- Terminal UI built with OpenTUI
- Two-column master-detail layout
- Context-aware navigation
- Real-time data fetching and display

We're grateful for the solid foundation that ghui provided, enabling us to focus on adapting the interface for the work CLI's multi-backend task management system.
