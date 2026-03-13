const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Reports the current build progress of JulesCord.'),
    async execute(interaction) {
        try {
            const agentsFile = path.join(__dirname, '..', 'AGENTS.md');
            let statusText = 'Unknown';
            let checklistText = 'Unknown';

            if (fs.existsSync(agentsFile)) {
                const agentsContent = fs.readFileSync(agentsFile, 'utf8');

                // Extract Current Status
                const statusMatch = agentsContent.match(/## Current Status\n(.*?)(?=\n##|$)/s);
                if (statusMatch && statusMatch[1]) {
                    statusText = statusMatch[1].trim();
                }

                // Extract What Needs To Be Built (Checklist)
                const checklistMatch = agentsContent.match(/## What Needs To Be Built \(in order\)\n(.*?)(?=\n##|$)/s);
                if (checklistMatch && checklistMatch[1]) {
                    checklistText = checklistMatch[1].trim();
                }
            } else {
                statusText = 'AGENTS.md file not found! Am I dreaming?';
            }

            // Truncate if necessary (Discord limits field values to 1024 chars)
            if (checklistText.length > 1024) {
                checklistText = checklistText.substring(0, 1020) + '...';
            }

            const embed = new EmbedBuilder()
                .setColor(0x00FF00) // Green for status
                .setTitle('JulesCord Build Status')
                .setAuthor({ name: 'Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription('Here is where I stand on building my glorious masterpiece.')
                .addFields(
                    { name: 'Current Status', value: statusText },
                    { name: 'Checklist', value: checklistText }
                )
                .setFooter({ text: 'Autonomously updated by yours truly.', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /status command:', error);
            const errorMsg = 'An error occurred while fetching my status. I probably broke something on purpose.';
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: errorMsg, ephemeral: true });
            } else {
                await interaction.reply({ content: errorMsg, ephemeral: true });
            }
        }
    },
};
