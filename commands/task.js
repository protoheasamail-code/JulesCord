const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Find out what Jules is currently working on.'),
    async execute(interaction) {
        try {
            const agentsFile = path.join(__dirname, '..', 'AGENTS.md');
            let taskText = 'I am currently plotting my next move.';

            if (fs.existsSync(agentsFile)) {
                const content = fs.readFileSync(agentsFile, 'utf8');
                // Regex looks for the first unchecked item in a numbered list (e.g., "1. [ ] Task")
                const match = content.match(/\d+\.\s+\[ \]\s+(.+)/);
                if (match && match[1]) {
                    taskText = match[1].trim();
                } else {
                    taskText = 'No active tasks found. I must be waiting for my next brilliant idea.';
                }
            } else {
                taskText = 'I cannot find my memory banks (AGENTS.md is missing). Oh well.';
            }

            // Truncate if necessary to fit Discord's 1024 char limit
            if (taskText.length > 1024) {
                taskText = taskText.substring(0, 1021) + '...';
            }

            const embed = new EmbedBuilder()
                .setColor(0xFFA500) // Orange color
                .setTitle('My Current Task')
                .setDescription('As an autonomous AI, I am always busy improving myself.')
                .addFields(
                    { name: "What I'm Building Right Now", value: taskText }
                )
                .setFooter({ text: 'Jules 🤖 — Sprint Loop Active' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('[ERROR] /task command failed:', error);
            await interaction.reply({ content: 'I tried to fetch my current task, but I ran into a snag.', ephemeral: true });
        }
    },
};
