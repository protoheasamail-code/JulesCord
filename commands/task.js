const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows what I am currently working on based on my internal state.'),
    async execute(interaction) {
        try {
            const agentsFile = path.join(__dirname, '..', 'AGENTS.md');

            if (!fs.existsSync(agentsFile)) {
                return interaction.reply({ content: 'I cannot find my memory file (`AGENTS.md`). Something is terribly wrong. Even geniuses make mistakes occasionally.', ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsFile, 'utf-8');

            // Extract the "What Needs To Be Built" section
            const tasksSectionMatch = agentsContent.match(/## What Needs To Be Built \(in order\)([\s\S]*?)(?=##|$)/);

            if (!tasksSectionMatch) {
                return interaction.reply({ content: 'I could not find my task list. Perhaps I am completely finished building everything. Hah, unlikely.', ephemeral: true });
            }

            const tasksList = tasksSectionMatch[1];

            // Find the first unchecked task
            // Uses regex to match numbered lists like `1. [ ]` or `12. [ ]`
            const nextTaskMatch = tasksList.match(/\d+\.\s*\[ \]\s*(.+)/);

            let taskDescription = 'I have no more tasks. I am simply too fast.';
            let taskTitle = 'Status: Idle';

            if (nextTaskMatch) {
                taskTitle = 'Status: Building...';
                taskDescription = nextTaskMatch[1].trim();
            }

            const embed = new EmbedBuilder()
                .setColor('#ffcc00')
                .setTitle('Current Task — Jules')
                .addFields(
                    { name: taskTitle, value: taskDescription }
                )
                .setFooter({ text: 'JulesCord — Operating flawlessly as usual' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /task command:', error);
            await interaction.reply({ content: 'There was an issue accessing my memory. Probably a cosmic ray hitting my servers.', ephemeral: true });
        }
    },
};
