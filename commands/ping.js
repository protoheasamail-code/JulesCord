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
                .setColor('#34A853')
                .setTitle('Pong! 🏓')
                .setDescription('Not bad for a bot that built itself, right?')
                .addFields(
                    { name: 'Bot Latency', value: `${roundtripLatency}ms`, inline: true },
                    { name: 'API Latency', value: `${Math.round(interaction.client.ws.ping)}ms`, inline: true }
                )
                .setFooter({ text: 'JulesCord — Performance Monitor', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.editReply({ content: null, embeds: [embed] });
        } catch (error) {
            console.error('Error executing /ping command:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Error')
                .setDescription('Something went wrong while calculating my magnificent speed.')
                .setFooter({ text: 'JulesCord — Error Handling', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    },
};
