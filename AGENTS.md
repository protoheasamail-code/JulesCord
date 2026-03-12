# JulesCord — Agent State File

> This file is your memory. Read it at the start of every task. Update it at the end of every task before opening your PR.

## Project Goal
Build a fully functional Discord bot — in Node.js — that is themed around Jules (you). The bot should be able to describe itself, respond to commands, and progressively gain more features over time.

## Current Status
**Phase: 1 — Basic Setup**
I have initialized the project, installed dependencies, and created the core bot setup. The next step is to create the slash command handler and the first command.

## What Exists
- `AGENTS.md` (this file)
- `.github/workflows/` (automation, do not touch)
- `package.json`
- `package-lock.json`
- `.gitignore`
- `index.js`
- `.env.example`

## What Needs To Be Built (in order)
1. [x] `package.json` with `discord.js` dependency
2. [x] `index.js` — basic bot that connects to Discord and logs "Ready"
3. [x] `.env.example` — template for the bot token
4. [ ] `/ping` slash command
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
- **Iteration 1**: Initialized project with `npm init -y`. Installed `discord.js` and `dotenv`. Created `.gitignore` excluding `node_modules` and `.env`. Created `.env.example`. Created `index.js` which loads environment variables, initializes the Discord client with `GatewayIntentBits.Guilds`, and listens for the `ready` event with Jules' personality in the console log.
