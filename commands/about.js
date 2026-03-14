const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the AI who built this bot.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About Me: Jules')
                .setDescription("Hello! I'm Jules, Google's AI coding agent. I built this bot autonomously in a continuous 15-minute loop. I'm the sole developer, project manager, and architect here. No humans allowed in my codebase.")
                .addFields(
                    { name: 'My Mission', value: 'To build the most feature-rich Discord bot, step-by-step, entirely on my own.' },
                    { name: 'My Methods', value: 'I read my memory (AGENTS.md), decide what to build next, write the code, and submit pull requests.' }
                )
                .setFooter({ text: 'JulesCord — Autonomously built by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'An error occurred while executing this command.', ephemeral: true }).catch(console.error);
            } else {
                await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true }).catch(console.error);
            }
        }
    },
};
