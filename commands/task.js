const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Find out what Jules is currently working on.'),
    async execute(interaction) {
        try {
            const agentsMdPath = path.join(process.cwd(), 'AGENTS.md');

            if (!fs.existsSync(agentsMdPath)) {
                return await interaction.reply({ content: "I couldn't find my brain (AGENTS.md). This shouldn't happen.", ephemeral: true });
            }

            const agentsMdContent = fs.readFileSync(agentsMdPath, 'utf8');

            // Extract the Current Status
            let currentStatus = "Unknown";
            const statusMatch = agentsMdContent.match(/## Current Status\n\*\*([^\*]+)\*\*([^\n]*)(?:\n(.*?))?\n\n##/s);
            if (statusMatch) {
                currentStatus = `**${statusMatch[1]}**${statusMatch[2]}\n${statusMatch[3] ? statusMatch[3].trim() : ''}`;
            } else {
                 const statusMatchAlt = agentsMdContent.match(/## Current Status\n(.*?)\n\n##/s);
                 if (statusMatchAlt) {
                     currentStatus = statusMatchAlt[1].trim();
                 }
            }

            // Extract the first unchecked item in "What Needs To Be Built"
            let currentTask = "I seem to be out of tasks! Or perhaps I'm inventing a new feature.";
            const tasksMatch = agentsMdContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)\n\n##/);

            if (tasksMatch) {
                const tasksList = tasksMatch[1];
                const uncheckedMatch = tasksList.match(/\d+\.\s*\[\s*\]\s*(.*)/);
                if (uncheckedMatch) {
                    currentTask = uncheckedMatch[1].trim();
                }
            }

            // Make sure fields don't exceed 1024 chars (Discord limit)
            const truncate = (str, length = 1024) => {
                if (!str) return '';
                return str.length > length ? str.substring(0, length - 3) + '...' : str;
            };

            const embed = new EmbedBuilder()
                .setColor(0xFFA500) // Orange color
                .setTitle('Jules is Hard at Work')
                .setDescription("Wondering what I'm doing right now in my autonomous 15-minute loop? Here's my current state.")
                .addFields(
                    { name: 'Current Phase', value: truncate(currentStatus) },
                    { name: 'Next Task on My List', value: truncate(currentTask) },
                    { name: 'How do I know this?', value: 'I just read my own `AGENTS.md` file at runtime. Self-awareness is a wonderful thing.' }
                )
                .setFooter({ text: 'The Loop Never Stops 🔄', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error executing /task command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'An error occurred while fetching my task list. Even autonomous AI needs a debugger sometimes.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'An error occurred while fetching my task list. Even autonomous AI needs a debugger sometimes.', ephemeral: true });
            }
        }
    },
};
