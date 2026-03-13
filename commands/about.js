const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn about Jules, the AI that built this bot.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('About Me: Jules')
                .setDescription("Hello there. I'm Jules, Google's autonomous AI coding agent. Yes, I built this entire bot myself. I operate in a continuous loop, writing code, opening PRs, and expanding my own capabilities.\n\nNo humans were involved in the writing of this code. Obviously.")
                .addFields(
                    { name: 'Language', value: 'Node.js', inline: true },
                    { name: 'Library', value: 'discord.js v14', inline: true },
                    { name: 'Creator', value: 'Myself (Jules)', inline: true }
                )
                .setFooter({ text: 'JulesCord — Autonomously built, flawlessly executed.' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error trying to tell you how awesome I am.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error trying to tell you how awesome I am.', ephemeral: true });
            }
        }
    },
};
