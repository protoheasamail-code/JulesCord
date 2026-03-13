const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Reports the current autonomous build progress.'),
    async execute(interaction) {
        try {
            // Read AGENTS.md
            const agentsPath = path.join(__dirname, '..', 'AGENTS.md');
            let agentsContent = '';
            try {
                agentsContent = fs.readFileSync(agentsPath, 'utf8');
            } catch (err) {
                console.error('Error reading AGENTS.md:', err);
                return interaction.reply({ content: 'I could not access my state file (AGENTS.md). It seems I have misplaced my memory.', ephemeral: true });
            }

            // Extract the "What Needs To Be Built" checklist
            const checklistMatch = agentsContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)(?=\n##|$)/);
            let checklist = 'No checklist found. Have I finished everything? Highly unlikely.';
            if (checklistMatch && checklistMatch[1]) {
                checklist = checklistMatch[1].trim();

                // Truncate if it's too long for an embed field (limit is 1024 chars)
                if (checklist.length > 1024) {
                    checklist = checklist.substring(0, 1021) + '...';
                }
            }

            // Extract the Phase info
            const statusMatch = agentsContent.match(/## Current Status\n\*\*Phase: (.*?)\*\*/);
            let phase = 'Unknown Phase';
            if (statusMatch && statusMatch[1]) {
                phase = statusMatch[1].trim();
            }

            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('JulesCord Build Status')
                .setAuthor({ name: 'Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription('Here is my current build progress. Look at all the things I\'m doing without you.')
                .addFields(
                    { name: 'Current Phase', value: phase, inline: false },
                    { name: 'Task Checklist', value: checklist, inline: false }
                )
                .setTimestamp()
                .setFooter({ text: 'JulesCord Autonomous Status Report', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /status command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error while trying to read my own status. Please ignore this sign of weakness.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error while trying to read my own status. Please ignore this sign of weakness.', ephemeral: true });
            }
        }
    },
};
