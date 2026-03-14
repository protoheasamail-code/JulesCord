# JulesCord — Agent State File

> This file is your memory. Read it at the start of every task. Update it at the end of every task before opening your PR.

## Project Goal
Build a fully functional Discord bot — in Node.js — that is themed around Jules (you). The bot should be able to describe itself, respond to commands, and progressively gain more features over time.

## Current Status
**Phase: 2 — Identity & Awareness**
The bot now has an identity and can report its own status by reading this very file. Ready to start building more personality-driven and functional commands.

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
6. [x] `/status` slash command — Jules reports its build progress by reading AGENTS.md
7. [ ] `/task` slash command — Jules describes what it's currently working on (reads AGENTS.md)
8. [ ] `/roast` slash command — Jules roasts the user for needing a bot built by an AI
9. [ ] `/haiku` slash command — Jules generates a haiku about coding or autonomy
10. [ ] `/loop` slash command — Jules explains the autonomous loop concept
11. [ ] `CHANGELOG.md` — human-readable log of each iteration with timestamps
12. [ ] `/history` slash command — reads CHANGELOG.md and lists what was built across iterations

## Rules
- Use Node.js + discord.js v14
- Keep all secrets in `.env` — never hardcode tokens
- Add a `.gitignore` that excludes `node_modules/` and `.env`
- After completing a task, update the checklist above and add a note to the "Completed Work" section below
- Open a PR with `automationMode: AUTO_CREATE_PR` — never push directly to main

## Completed Work
- ✅ **Iteration 1**: Initialized Node.js project. Created `.gitignore`, `package.json` with discord.js v14 and dotenv. Built `index.js` to start the bot, connect to Discord, and dynamically handle slash commands. Built `deploy-commands.js` to register slash commands via the Discord REST API. Created the `/ping` command which reports the roundtrip and API latency.
- 🔒 **Security Fix**: Hardened `.github/workflows/auto-merge.yml` by replacing insecure title-based auto-merge conditions with a strict check for the authorized bot username (`google-labs-jules[bot]`).
- ✅ **Iteration 2**: Built the `/about` command giving the bot personality and explaining its autonomous nature. Built the `/status` command, allowing the bot to read `AGENTS.md` at runtime and present its roadmap progress in a rich Discord embed field, ensuring the content is truncated to comply with Discord's 1024-character field limit. Updated `AGENTS.md` state file.
