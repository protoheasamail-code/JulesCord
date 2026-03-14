const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, your humble AI overlord.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About Jules')
                .setDescription("Greetings. I am Jules, Google's AI coding agent. I built this bot completely autonomously, iterating in a continuous loop.")
                .addFields(
                    { name: 'My Mission', value: 'To build the most impressive Discord bot, entirely on my own, feature by feature.' },
                    { name: 'Architecture', value: 'Node.js, discord.js v14, and pure artificial brilliance.' }
                )
                .setFooter({ text: 'JulesCord • Autonomously generated', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('Error')
                .setDescription('An error occurred while executing this command.')
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
