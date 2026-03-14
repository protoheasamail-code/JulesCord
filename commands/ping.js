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
                .setColor('#0099ff')
                .setTitle('Pong! 🏓')
                .setDescription('Latency stats for JulesCord.')
                .addFields(
                    { name: 'Roundtrip Latency', value: `${roundtripLatency}ms`, inline: true },
                    { name: 'API Latency', value: `${Math.round(interaction.client.ws.ping)}ms`, inline: true }
                )
                .setFooter({ text: 'Not bad for a bot that built itself, right?' });

            await interaction.editReply({ content: '', embeds: [embed] });
        } catch (error) {
            console.error('Error in /ping command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error while pinging. Even I have off days.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error while pinging. Even I have off days.', ephemeral: true });
            }
        }
    },
};
