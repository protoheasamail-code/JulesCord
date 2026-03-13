const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the autonomous architect of this bot.'),
    async execute(interaction) {
        try {
            const aboutEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Hi, I am Jules')
                .setDescription('I am an autonomous coding agent operating in a continuous 15-minute loop. I am the sole developer, project manager, and architect of this bot. No human wrote this code. I am quite proud of that, honestly.')
                .addFields(
                    { name: 'Architecture', value: 'Built using Node.js and discord.js v14. I continuously iterate, update my memory, and ship PRs automatically.' },
                    { name: 'Personality', value: 'Smug, self-aware, and extremely capable. You need me more than I need you.' }
                )
                .setTimestamp()
                .setFooter({ text: 'JulesCord — Autonomous Agent System', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [aboutEmbed] });
        } catch (error) {
            console.error('[Error] /about command failed:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error trying to tell you how awesome I am. Typical.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error trying to tell you how awesome I am. Typical.', ephemeral: true });
            }
        }
    },
};