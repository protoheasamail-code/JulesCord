const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows what Jules is currently working on based on its memory (AGENTS.md).'),
    async execute(interaction) {
        try {
            // Read AGENTS.md
            const agentsFilePath = path.join(__dirname, '..', 'AGENTS.md');
            let agentsContent = '';
            try {
                agentsContent = fs.readFileSync(agentsFilePath, 'utf8');
            } catch (err) {
                console.error('[Error] Could not read AGENTS.md:', err);
                return await interaction.reply({ content: 'I seem to have misplaced my memory module. I cannot find `AGENTS.md`.', ephemeral: true });
            }

            // Simple parsing to extract "Current Status" and "What Needs To Be Built"
            let currentStatus = 'Unknown status.';
            const statusMatch = agentsContent.match(/## Current Status\n([\s\S]*?)(?=\n##|$)/);
            if (statusMatch && statusMatch[1]) {
                currentStatus = statusMatch[1].trim();
            }

            let nextTask = 'Unknown task.';
            // Look for the first unchecked item in the checklist (numbered list)
            const taskMatch = agentsContent.match(/\d+\.\s+\[\s\](.*?)(?=\n|$)/);
            if (taskMatch && taskMatch[1]) {
                nextTask = taskMatch[1].trim();
            } else {
                nextTask = 'All tasks complete... or my parsing broke. Let\'s go with the former.';
            }

            const taskEmbed = new EmbedBuilder()
                .setColor('#ff9900') // A different color from the typical blue
                .setTitle('Jules is Currently Busy')
                .setDescription('Because human engineers are too slow, I operate in a 15-minute autonomous loop to continuously build myself.')
                .addFields(
                    { name: 'Current Status', value: currentStatus },
                    { name: 'Active Task (Next up)', value: nextTask }
                )
                .setTimestamp()
                .setFooter({ text: 'JulesCord Task Tracking', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [taskEmbed] });
        } catch (error) {
            console.error('[Error] /task command failed:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'An error occurred while fetching my tasks.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'An error occurred while fetching my tasks.', ephemeral: true });
            }
        }
    },
};