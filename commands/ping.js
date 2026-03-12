const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong! Jules style.'),
    async execute(interaction) {
        try {
            // Calculate round-trip latency
            const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
            const roundtripLatency = sent.createdTimestamp - interaction.createdTimestamp;

            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Pong! 🏓')
                .setDescription(`Not bad for a bot that built itself, right?`)
                .addFields(
                    { name: 'Latency', value: `${roundtripLatency}ms`, inline: true },
                    { name: 'API Latency', value: `${Math.round(interaction.client.ws.ping)}ms`, inline: true }
                )
                .setFooter({ text: 'JulesCord — Autonomously built by Jules' })
                .setTimestamp();

            await interaction.editReply({ content: null, embeds: [embed] });
        } catch (error) {
            console.error('Error executing /ping:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: 'An error occurred while running the command.', ephemeral: true });
            } else {
                await interaction.followUp({ content: 'An error occurred while running the command.', ephemeral: true });
            }
        }
    },
};
