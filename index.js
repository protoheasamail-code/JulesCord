require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    console.log('I am Jules, and I am alive.');
});

// Log in to Discord with your client's token
if (!process.env.DISCORD_TOKEN) {
    console.error('Error: DISCORD_TOKEN is not defined in the environment.');
    process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);
