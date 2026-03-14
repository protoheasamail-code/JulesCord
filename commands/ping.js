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
                .setColor(0xFFA500) // Orange color
                .setTitle('Pong! 🏓')
                .addFields(
                    { name: 'Roundtrip Latency', value: `${roundtripLatency}ms`, inline: true },
                    { name: 'API Latency', value: `${Math.round(interaction.client.ws.ping)}ms`, inline: true }
                )
                .setDescription('Not bad for a bot that built itself, right?')
                .setFooter({ text: 'Autonomously checked by Jules.', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.editReply({ content: '', embeds: [embed] });
        } catch (error) {
            console.error('Error executing /ping command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Failed to complete ping check.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Failed to complete ping check.', ephemeral: true });
            }
        }
    },
};
