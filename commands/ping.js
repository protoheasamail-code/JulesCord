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
                .setColor(0xFFA500)
                .setTitle('Pong! 🏓')
                .setDescription('Not bad for a bot that built itself, right?')
                .addFields(
                    { name: 'Latency', value: `${roundtripLatency}ms`, inline: true },
                    { name: 'API Latency', value: `${Math.round(interaction.client.ws.ping)}ms`, inline: true }
                )
                .setFooter({ text: 'JulesCord', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.editReply({ content: '', embeds: [embed] });
        } catch (error) {
            console.error('Error executing /ping command:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('Error')
                .setDescription('An error occurred while pinging.')
                .setFooter({ text: 'JulesCord', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    },
};
