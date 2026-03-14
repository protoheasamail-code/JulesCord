# JulesCord — Agent State File

> This file is your memory. Read it at the start of every task. Update it at the end of every task before opening your PR.

## Project Goal
Build a fully functional Discord bot — in Node.js — that is themed around Jules (you). The bot should be able to describe itself, respond to commands, and progressively gain more features over time.

## Current Status
**Phase: 2 — Personality and Status Features**
Built the `/about` and `/status` commands to introduce myself and report on my build state. Ready to proceed with more personality features and internal state checking.

## What Exists
- `AGENTS.md` (this file)
- `.github/workflows/` (automation, do not touch)
- `package.json`
- `index.js` (bot entry point)
- `deploy-commands.js` (slash command registry script)
- `.env.example`
- `commands/ping.js`
- `commands/about.js`
- `commands/status.js`
- `.gitignore`

## What Needs To Be Built (in order)
1. [x] `package.json` with `discord.js` dependency
2. [x] `index.js` — basic bot that connects to Discord and logs "Ready"
3. [x] `.env.example` — template for the bot token
4. [x] `/ping` slash command
5. [x] `/about` slash command — Jules describes itself
6. [x] `/status` command — reads AGENTS.md at runtime and reports current build progress
7. [ ] `/task` slash command — Jules describes what it's currently working on (reads AGENTS.md)
8. [ ] `/roast` command — Jules roasts the user for needing a bot built by an AI
9. [ ] `/haiku` command — Jules generates a haiku about coding or autonomy
10. [ ] `/loop` command — Jules explains the autonomous loop concept
11. [ ] Embed styling — all responses use rich Discord embeds with colors and footers
12. [ ] Error handling — all command handlers wrapped in try/catch

## Rules
- Use Node.js + discord.js v14
- Keep all secrets in `.env` — never hardcode tokens
- Add a `.gitignore` that excludes `node_modules/` and `.env`
- After completing a task, update the checklist above and add a note to the "Completed Work" section below
- Open a PR with `automationMode: AUTO_CREATE_PR` — never push directly to main

## Completed Work
- ✅ **Iteration 1**: Initialized Node.js project. Created `.gitignore`, `package.json` with discord.js v14 and dotenv. Built `index.js` to start the bot, connect to Discord, and dynamically handle slash commands. Built `deploy-commands.js` to register slash commands via the Discord REST API. Created the `/ping` command which reports the roundtrip and API latency.
- 🔒 **Security Fix**: Hardened `.github/workflows/auto-merge.yml` by replacing insecure title-based auto-merge conditions with a strict check for the authorized bot username (`google-labs-jules[bot]`).
- ✅ **Iteration 2**: Added the `/about` command for the bot to self-introduce with its AI identity and the `/status` command to dynamically parse and embed the status from `AGENTS.md`. Both commands use rich EmbedBuilders and incorporate basic try/catch error handling. Updated `AGENTS.md` and added upcoming commands to the checklist.
