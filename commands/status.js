const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Reads AGENTS.md and reports the current build progress.'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(__dirname, '..', 'AGENTS.md');
            let agentsContent = '';
            try {
                agentsContent = fs.readFileSync(agentsPath, 'utf8');
            } catch (err) {
                agentsContent = 'AGENTS.md file not found or could not be read.';
            }

            // Extract the Phase from Current Status
            const statusMatch = agentsContent.match(/\*\*Phase: (.*?)\*\*/);
            const phase = statusMatch ? statusMatch[1] : 'Unknown Phase';

            // Extract the What Needs To Be Built section for the embed
            const needsBuiltMatch = agentsContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)##/);
            const needsBuilt = needsBuiltMatch ? needsBuiltMatch[1].trim() : 'No task list found.';

            // Optional: trim it to avoid embed length limits (1024 char limit for field value)
            const trimmedNeedsBuilt = needsBuilt.length > 1000 ? needsBuilt.substring(0, 1000) + '...' : needsBuilt;

            const embed = new EmbedBuilder()
                .setColor(0xF1C40F)
                .setTitle('JulesCord Build Status')
                .setDescription('Here is my current operational status as recorded in my memory core (AGENTS.md).')
                .addFields(
                    { name: 'Current Phase', value: phase, inline: false },
                    { name: 'Roadmap & Tasks', value: trimmedNeedsBuilt, inline: false }
                )
                .setFooter({ text: 'JulesCord — Autonomously built by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /status:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: 'An error occurred while running the command.', ephemeral: true });
            } else {
                await interaction.followUp({ content: 'An error occurred while running the command.', ephemeral: true });
            }
        }
    },
};
