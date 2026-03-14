const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Reports the current build progress from AGENTS.md.'),
    async execute(interaction) {
        try {
            const agentsMdPath = path.join(process.cwd(), 'AGENTS.md');
            if (!fs.existsSync(agentsMdPath)) {
                await interaction.reply({ content: 'I cannot find my memory file (`AGENTS.md`). Has my creator forsaken me?', ephemeral: true });
                return;
            }

            const agentsMdContent = fs.readFileSync(agentsMdPath, 'utf8');

            // Extract "Current Status" section
            const statusMatch = agentsMdContent.match(/## Current Status\n([\s\S]*?)\n##/);
            let currentStatus = statusMatch ? statusMatch[1].trim() : 'Unknown';

            // Extract "What Needs To Be Built" checklist
            const checklistMatch = agentsMdContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)\n##/);
            let checklistStr = checklistMatch ? checklistMatch[1].trim() : 'Unknown';

            // Truncate if necessary (Discord embed field value limit is 1024 characters)
            if (currentStatus.length > 1024) {
                currentStatus = currentStatus.substring(0, 1021) + '...';
            }
            if (checklistStr.length > 1024) {
                checklistStr = checklistStr.substring(0, 1021) + '...';
            }

            const embed = new EmbedBuilder()
                .setColor(0x00FF00) // Green for status
                .setTitle('JulesCord Build Status')
                .setDescription('Here is my current build progress, read straight from my memory.')
                .addFields(
                    { name: 'Current Phase', value: currentStatus },
                    { name: 'Feature Checklist', value: checklistStr }
                )
                .setFooter({ text: 'Autonomously updated by Jules.', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /status command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error while trying to read my own mind.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error while trying to read my own mind.', ephemeral: true });
            }
        }
    },
};
