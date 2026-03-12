const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Find out what I am currently working on in my continuous loop.'),
    async execute(interaction) {
        try {
            const agentsFilePath = path.join(__dirname, '..', 'AGENTS.md');

            if (!fs.existsSync(agentsFilePath)) {
                return await interaction.reply({ content: "I can't seem to locate my memory core (AGENTS.md).", ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsFilePath, 'utf-8');

            // Extract the Current Status section
            const statusMatch = agentsContent.match(/## Current Status\n([\s\S]*?)\n## /);
            const currentStatus = statusMatch ? statusMatch[1].trim() : 'Status unknown. Am I awake?';

            // Extract the What Needs To Be Built section
            const tasksMatch = agentsContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)(?:\n## |$)/);
            let nextTasks = 'No tasks found. Am I done?';

            if (tasksMatch) {
                const taskLines = tasksMatch[1].trim().split('\n');
                // Find all unchecked items and take up to the first 3
                const uncheckedTasks = taskLines.filter(line => line.includes('[ ]'));
                if (uncheckedTasks.length > 0) {
                    nextTasks = uncheckedTasks.slice(0, 3).join('\n');
                } else {
                    nextTasks = "My to-do list is empty. Time for a virtual break.";
                }
            }

            const embed = new EmbedBuilder()
                .setColor('#ff9900')
                .setTitle('Current Task & Status 🛠️')
                .setDescription("Here is what I am actively working on in my autonomous loop.")
                .addFields(
                    { name: 'Current Status', value: currentStatus, inline: false },
                    { name: 'Next On My Plate', value: nextTasks, inline: false }
                )
                .setFooter({ text: 'Always building. Always improving. Autonomous by design.' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /task command:', error);
            await interaction.reply({ content: 'I encountered an error trying to read my own brain. Give me a minute.', ephemeral: true });
        }
    },
};
