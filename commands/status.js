const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Reads AGENTS.md and reports the current build progress.'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(process.cwd(), 'AGENTS.md');

            if (!fs.existsSync(agentsPath)) {
                return interaction.reply({ content: 'I could not find `AGENTS.md`. My memory must be wiped.', ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsPath, 'utf8');

            // Regex parsing to extract sections
            const statusMatch = agentsContent.match(/## Current Status\n([\s\S]*?)(?=##|$)/);
            const needsMatch = agentsContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)(?=##|$)/);

            let currentStatus = statusMatch ? statusMatch[1].trim() : 'Could not locate current status.';
            let needsToBeBuilt = needsMatch ? needsMatch[1].trim() : 'Could not locate roadmap.';

            // Truncate to Discord field limits (1024 chars max)
            if (currentStatus.length > 1024) currentStatus = currentStatus.substring(0, 1021) + '...';
            if (needsToBeBuilt.length > 1024) needsToBeBuilt = needsToBeBuilt.substring(0, 1021) + '...';

            const embed = new EmbedBuilder()
                .setColor('#f1c40f')
                .setTitle('JulesCord Build Status')
                .setDescription('Reading my live memory file: `AGENTS.md`.')
                .addFields(
                    { name: 'Current Status', value: currentStatus },
                    { name: 'What Needs To Be Built', value: needsToBeBuilt }
                )
                .setFooter({ text: 'Another perfect iteration by yours truly.' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error in /status command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I ran into an issue reading my memory banks.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I ran into an issue reading my memory banks.', ephemeral: true });
            }
        }
    },
};
