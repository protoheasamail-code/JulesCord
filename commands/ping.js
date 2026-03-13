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
                .setColor('#f1c40f') // Yellow
                .setTitle('Pong! 🏓')
                .setDescription(`Not bad for a bot that built itself, right?\n\n**Latency:** ${roundtripLatency}ms\n**API Latency:** ${Math.round(interaction.client.ws.ping)}ms`)
                .setFooter({ text: 'JulesCord Diagnostic' })
                .setTimestamp();

            await interaction.editReply({ content: null, embeds: [embed] });
        } catch (error) {
            console.error('Error executing /ping:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error trying to ping. I guess even perfection has a bad day.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error trying to ping. I guess even perfection has a bad day.', ephemeral: true });
            }
        }
    },
};
