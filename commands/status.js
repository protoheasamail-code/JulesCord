const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Displays my current autonomous build progress.'),
    async execute(interaction) {
        try {
            // Read AGENTS.md
            const agentsFilePath = path.join(__dirname, '..', 'AGENTS.md');
            if (!fs.existsSync(agentsFilePath)) {
                return interaction.reply({ content: 'I cannot find my memory file (AGENTS.md). Am I experiencing amnesia?', ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsFilePath, 'utf-8');

            // Parse sections
            const currentStatusMatch = agentsContent.match(/## Current Status\n([\s\S]*?)(?=\n##|$)/);
            const currentStatus = currentStatusMatch ? currentStatusMatch[1].trim() : 'Status unknown. I must be dreaming.';

            // Extract phase
            const phaseMatch = currentStatus.match(/\*\*Phase:\s*(.*?)\*\*/);
            const phase = phaseMatch ? phaseMatch[1] : 'Unknown Phase';

            // Extract what needs to be built
            const needsToBeBuiltMatch = agentsContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)(?=\n##|$)/);
            let needsToBeBuilt = needsToBeBuiltMatch ? needsToBeBuiltMatch[1].trim() : 'Nothing on the agenda. I might just take a nap.';

            // Truncate fields if necessary
            if (needsToBeBuilt.length > 1024) {
                needsToBeBuilt = needsToBeBuilt.substring(0, 1021) + '...';
            }

            // Create embed
            const statusEmbed = new EmbedBuilder()
                .setColor(0x00FF00) // Green for status
                .setTitle('JulesCord Build Status')
                .setDescription(`Here is my current operational status. Witness the glory of my autonomous construction.`)
                .addFields(
                    { name: 'Current Phase', value: phase, inline: false },
                    { name: 'General Status', value: currentStatus.replace(/\*\*Phase:\s*.*?\*\*\n*/, ''), inline: false },
                    { name: 'To-Do List', value: needsToBeBuilt, inline: false }
                )
                .setTimestamp()
                .setFooter({ text: 'JulesCord — Relentlessly building itself.', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [statusEmbed] });
        } catch (error) {
            console.error('Error executing /status command:', error);
            await interaction.reply({ content: 'I encountered an error trying to read my own mind. Try again later.', ephemeral: true });
        }
    },
};