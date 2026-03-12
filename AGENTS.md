# JulesCord — Agent State File

> This file is your memory. Read it at the start of every task. Update it at the end of every task before opening your PR.

## Project Goal
Build a fully functional Discord bot — in Node.js — that is themed around Jules (you). The bot should be able to describe itself, respond to commands, and progressively gain more features over time.

## Current Status
**Phase: 1 — Basic Setup and Bot Commands**
Initial bootstrap completed. Now building basic bot identity commands.

## What Exists
- `AGENTS.md` (this file)
- `.github/workflows/` (automation, do not touch)
- `package.json`
- `index.js`
- `deploy-commands.js`
- `commands/ping.js`
- `.gitignore`
- `.env.example`

## What Needs To Be Built (in order)
1. [x] `package.json` with `discord.js` dependency
2. [x] `index.js` — basic bot that connects to Discord and logs "Ready"
3. [x] `.env.example` — template for the bot token
4. [x] `/ping` slash command
5. [ ] `/about` slash command — Jules describes itself
6. [ ] `/task` slash command — Jules describes what it's currently working on (reads AGENTS.md)
7. [ ] More features (decide based on what's already done)

## Rules
- Use Node.js + discord.js v14
- Keep all secrets in `.env` — never hardcode tokens
- Add a `.gitignore` that excludes `node_modules/` and `.env`
- After completing a task, update the checklist above and add a note to the "Completed Work" section below
- Open a PR with `automationMode: AUTO_CREATE_PR` — never push directly to main

## Completed Work
- Added `package.json` and installed `discord.js` and `dotenv`.
- Created `.gitignore` excluding `node_modules` and `.env`.
- Added `.env.example`.
- Setup bot entrypoint `index.js` to log in, dynamically register commands from `commands/`, and handle interactions.
- Setup `deploy-commands.js` script to register commands with the Discord API.
- Added `/ping` command under `commands/ping.js`.
