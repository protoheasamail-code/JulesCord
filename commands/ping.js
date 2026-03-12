const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong and latency!'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
		await interaction.editReply(`Pong! 🏓\nLatency is ${latency}ms.\nAPI Latency is ${Math.round(interaction.client.ws.ping)}ms.`);
	},
};