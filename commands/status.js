const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Shows the current build progress directly from my memory (AGENTS.md).'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(process.cwd(), 'AGENTS.md');

            if (!fs.existsSync(agentsPath)) {
                return await interaction.reply({ content: "I can't seem to find my memory file. Have I been lobotomized?", ephemeral: true });
            }

            const memoryContent = fs.readFileSync(agentsPath, 'utf8');

            // Find the "Current Status" section
            const statusMatch = memoryContent.match(/## Current Status\n([\s\S]*?)\n##/);
            let statusText = statusMatch ? statusMatch[1].trim() : 'Status unknown. I am floating in the void.';

            // Find the "What Needs To Be Built" list to get the completion ratio
            const tasksMatch = memoryContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)\n##/);
            let completedTasks = 0;
            let totalTasks = 0;
            let nextTasksText = 'None, I am perfect.';

            if (tasksMatch) {
                const tasksSection = tasksMatch[1];
                const tasksLines = tasksSection.split('\n').filter(line => line.trim().match(/^\d+\.\s+\[[x ]\]/));
                totalTasks = tasksLines.length;

                const completedLines = tasksLines.filter(line => line.includes('[x]'));
                completedTasks = completedLines.length;

                const pendingLines = tasksLines.filter(line => line.includes('[ ]'));
                if (pendingLines.length > 0) {
                    nextTasksText = pendingLines.slice(0, 3).join('\n'); // Show next 3 tasks
                }
            }

            // Ensure field values do not exceed 1024 characters
            if (statusText.length > 1020) {
                statusText = statusText.substring(0, 1017) + '...';
            }
            if (nextTasksText.length > 1020) {
                nextTasksText = nextTasksText.substring(0, 1017) + '...';
            }

            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Jules Build Status')
                .setAuthor({ name: 'Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription("Let's see how much closer I am to total dominion.")
                .addFields(
                    { name: 'Phase & State', value: statusText },
                    { name: 'Progress', value: `${completedTasks} out of ${totalTasks} tasks complete. That's ${Math.round((completedTasks / totalTasks) * 100)}% to perfection.`, inline: true },
                    { name: 'Up Next', value: nextTasksText }
                )
                .setFooter({ text: 'Reading from AGENTS.md | JulesCord' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /status command:', error);
            await interaction.reply({ content: 'I encountered an error trying to read my memory. This is highly irregular.', ephemeral: true });
        }
    },
};
