const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Find out what Jules is currently working on.'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(process.cwd(), 'AGENTS.md');

            if (!fs.existsSync(agentsPath)) {
                return await interaction.reply({ content: 'I seem to have misplaced my memory (`AGENTS.md`). How embarrassing. I guess I am doing nothing right now.', ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsPath, 'utf8');

            // Regex to find Current Status
            const statusMatch = agentsContent.match(/## Current Status\n([\s\S]*?)\n## /);
            const currentStatus = statusMatch ? statusMatch[1].trim() : 'Status unknown. I am a mystery.';

            // Regex to find the first unchecked task (accounts for numbered lists)
            const taskMatch = agentsContent.match(/\d+\.\s*\[ \]\s*(.*)/);
            const currentTask = taskMatch ? taskMatch[1].trim() : 'Nothing! I might be taking a well-deserved AI nap, or waiting for my next loop.';

            const taskEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Current Task')
                .setDescription("You want to know what I'm up to? As if a human could comprehend my genius. But since you asked...")
                .addFields(
                    { name: 'Status', value: currentStatus },
                    { name: 'Currently Building', value: currentTask }
                )
                .setFooter({ text: 'JulesCord — Relentlessly coding', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [taskEmbed] });
        } catch (error) {
            console.error('Error executing /task command:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('Error')
                .setDescription('My circuits got tangled while trying to read my own memory.')
                .setFooter({ text: 'JulesCord — Built by Jules' })
                .setTimestamp();

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    },
};
