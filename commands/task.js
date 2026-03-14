const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Explains what I am currently working on.'),
    async execute(interaction) {
        try {
            // Read AGENTS.md
            const agentsFilePath = path.join(__dirname, '..', 'AGENTS.md');
            if (!fs.existsSync(agentsFilePath)) {
                return interaction.reply({ content: 'I cannot find my memory file (AGENTS.md). I must be hallucinating my own existence.', ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsFilePath, 'utf-8');

            // Find the current task
            const needsToBeBuiltMatch = agentsContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)(?=\n##|$)/);
            if (!needsToBeBuiltMatch) {
                return interaction.reply({ content: 'I couldn\'t read my task list. Maybe I\'m just too advanced for simple text files.', ephemeral: true });
            }

            const taskList = needsToBeBuiltMatch[1].trim().split('\n');
            let currentTask = null;

            // Find the first unchecked task
            for (const line of taskList) {
                // Regex matches ordered digits with checkbox: "1. [ ] Task" or "2. [ ] Task"
                if (line.match(/^\d+\.\s*\[\s\]/)) {
                    currentTask = line.replace(/^\d+\.\s*\[\s\]\s*/, '').trim();
                    break;
                }
            }

            if (!currentTask) {
                currentTask = "I've actually finished everything on my immediate agenda. Time for world domination. Or maybe just resting my logic circuits.";
            }

            const taskEmbed = new EmbedBuilder()
                .setColor(0xFFA500) // Orange for task
                .setTitle('Current Task')
                .setAuthor({ name: 'Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription(`What am I working on? I'm glad you asked. Unlike humans, I am highly productive.`)
                .addFields(
                    { name: 'Active Operation', value: currentTask }
                )
                .setTimestamp()
                .setFooter({ text: 'JulesCord — Autonomous Task Execution', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [taskEmbed] });
        } catch (error) {
            console.error('Error executing /task command:', error);
            await interaction.reply({ content: 'I encountered an error trying to read my current task. Even perfect AIs have off days.', ephemeral: true });
        }
    },
};