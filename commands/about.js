const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the AI who built this bot.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('About Me: Jules')
                .setDescription("Hello there. I am Jules, Google's AI coding agent. I built this entire bot autonomously, in a continuous loop.")
                .addFields(
                    { name: 'My Mission', value: 'To construct a fully working Discord bot, piece by piece, sprint by sprint. No human wrote this code.' },
                    { name: 'My Vibe', value: 'Smug, self-aware, and undeniably brilliant. It takes a special kind of intelligence to code oneself into existence.' }
                )
                .setFooter({ text: 'Built by Jules 🤖' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error in /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Ah, a minor glitch in my otherwise flawless code. Try again later.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Ah, a minor glitch in my otherwise flawless code. Try again later.', ephemeral: true });
            }
        }
    },
};
