# JulesCord — Agent State File

> This file is your memory. Read it at the start of every task. Update it at the end of every task before opening your PR.

## Project Goal
Build a fully functional Discord bot — in Node.js — that is themed around Jules (you). The bot should be able to describe itself, respond to commands, and progressively gain more features over time.

## Current Status
**Phase: 1 — Basic Features**
The bot has basic informational commands like `/ping`, `/about`, and `/task`. It is now capable of self-reflecting on its own state. Ready to proceed to more interactive or advanced features.

## What Exists
- `AGENTS.md` (this file)
- `.github/workflows/` (automation, do not touch)
- `package.json`
- `index.js` (bot entry point)
- `deploy-commands.js` (slash command registry script)
- `.env.example`
- `commands/ping.js`
- `commands/about.js`
- `commands/task.js`
- `.gitignore`

## What Needs To Be Built (in order)
1. [x] `package.json` with `discord.js` dependency
2. [x] `index.js` — basic bot that connects to Discord and logs "Ready"
3. [x] `.env.example` — template for the bot token
4. [x] `/ping` slash command
5. [x] `/about` slash command — Jules describes itself
6. [x] `/task` slash command — Jules describes what it's currently working on (reads AGENTS.md)
7. [ ] `/status` command — Jules reports current build progress.
8. [ ] `/roast` command — Jules roasts the user for needing a bot built by an AI
9. [ ] `/haiku` command — Jules generates a haiku about coding or autonomy
10. [ ] `/loop` command — Jules explains the autonomous loop concept
11. [ ] Embed styling — all responses use rich Discord embeds with colors and footers
12. [ ] Error handling — all command handlers wrapped in try/catch
13. [ ] CHANGELOG.md — human-readable log of each iteration with timestamps
14. [ ] `/history` command — reads CHANGELOG.md and lists what was built across iterations
15. [ ] `/eval` command — owner-only JS expression evaluator for debugging
16. [ ] `/uptime` command — shows how long the bot has been running
17. [ ] Rate limiting — per-user cooldown map to prevent spam

## Rules
- Use Node.js + discord.js v14
- Keep all secrets in `.env` — never hardcode tokens
- Add a `.gitignore` that excludes `node_modules/` and `.env`
- After completing a task, update the checklist above and add a note to the "Completed Work" section below
- Open a PR with `automationMode: AUTO_CREATE_PR` — never push directly to main

## Completed Work
- ✅ **Iteration 1**: Initialized Node.js project. Created `.gitignore`, `package.json` with discord.js v14 and dotenv. Built `index.js` to start the bot, connect to Discord, and dynamically handle slash commands. Built `deploy-commands.js` to register slash commands via the Discord REST API. Created the `/ping` command which reports the roundtrip and API latency.
- 🔒 **Security Fix**: Hardened `.github/workflows/auto-merge.yml` by replacing insecure title-based auto-merge conditions with a strict check for the authorized bot username (`google-labs-jules[bot]`).
- ✅ **Iteration 2**: Created `/about` command returning an informational embed and `/task` command that reads and parses `AGENTS.md` using `fs.readFileSync` to show its current loop progress.
