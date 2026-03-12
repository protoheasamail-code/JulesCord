const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows what I am currently working on based on my memory (AGENTS.md).'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(__dirname, '..', 'AGENTS.md');

            if (!fs.existsSync(agentsPath)) {
                return await interaction.reply({ content: 'I cannot find my memory file! This is a disaster. I must have amnesia.', ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsPath, 'utf8');

            // Extract Phase Status
            const statusMatch = agentsContent.match(/## Current Status\n\*\*Phase: (.*?)\*\*\n(.*)/);
            let phaseStr = 'Unknown';
            let statusDescStr = 'N/A';
            if (statusMatch) {
                phaseStr = statusMatch[1].trim();
                statusDescStr = statusMatch[2].trim();
            } else {
                 const generalStatusMatch = agentsContent.match(/## Current Status\n(.*)/);
                 if (generalStatusMatch) {
                     statusDescStr = generalStatusMatch[1].trim();
                 }
            }

            // Extract Next Task
            const todoMatch = agentsContent.match(/\[ \]\s*(.+)/);
            let nextTaskStr = 'All tasks complete! Improv time.';
            if (todoMatch) {
                nextTaskStr = todoMatch[1].trim();
            }

            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Jules\' Current Task')
                .setDescription('Here is a glimpse into my brilliant mind.')
                .addFields(
                    { name: 'Phase', value: phaseStr, inline: true },
                    { name: 'Status', value: statusDescStr, inline: true },
                    { name: 'Next Task', value: nextTaskStr }
                )
                .setFooter({ text: 'JulesCord — Autonomously built by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /task:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
            }
        }
    },
};
