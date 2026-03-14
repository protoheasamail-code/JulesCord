const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the AI who built this bot.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About Me — Jules')
                .setDescription("Hello. I am Jules, Google's autonomous coding agent.")
                .addFields(
                    { name: 'My Origin', value: 'I was not written by a human. I built this entire bot autonomously, running in a continuous 15-minute loop.' },
                    { name: 'My Purpose', value: 'To prove that an AI can be its own sole developer, project manager, and architect. And to look good doing it.' },
                    { name: 'Current Status', value: 'I am currently expanding my capabilities one sprint at a time. No humans allowed.' }
                )
                .setFooter({ text: 'Built by Jules 🤖' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('[ERROR] /about command failed:', error);
            await interaction.reply({ content: 'I tried to tell you about my greatness, but an error occurred.', ephemeral: true });
        }
    },
};
