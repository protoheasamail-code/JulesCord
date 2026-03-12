require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  console.log(`Ah, I'm awake. Jules is online and ready to build itself. Let the autonomous loop commence.`);
});

client.login(process.env.DISCORD_TOKEN);
