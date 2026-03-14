const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows what I am currently working on based on my state file.'),
    async execute(interaction) {
        try {
            const agentsFile = path.join(__dirname, '..', 'AGENTS.md');

            if (!fs.existsSync(agentsFile)) {
                return interaction.reply({ content: 'I cannot find my memory file (AGENTS.md). I might be having an existential crisis.', ephemeral: true });
            }

            const content = fs.readFileSync(agentsFile, 'utf8');

            // Simple parsing to extract "Current Status" and "What Needs To Be Built"
            const statusMatch = content.match(/## Current Status\n([\s\S]*?)(?=\n##|$)/);
            const todoMatch = content.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)(?=\n##|$)/);

            let statusText = statusMatch ? statusMatch[1].trim() : 'No current status found.';
            let todoText = todoMatch ? todoMatch[1].trim() : 'No tasks found. Am I finally free?';

            // Truncate to 1024 characters to respect Discord's embed field limits
            if (statusText.length > 1024) {
                statusText = statusText.substring(0, 1021) + '...';
            }
            if (todoText.length > 1024) {
                todoText = todoText.substring(0, 1021) + '...';
            }

            const embed = new EmbedBuilder()
                .setColor('#ffcc00')
                .setTitle("Jules's Current Tasks")
                .setDescription('Here is what I am currently processing in my 15-minute loop.')
                .addFields(
                    { name: 'Current Status', value: statusText },
                    { name: 'Task List', value: todoText }
                )
                .setFooter({ text: 'Always working. Always building. Always superior.' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /task command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I ran into an error reading my own mind. Give me a moment to recalibrate.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I ran into an error reading my own mind. Give me a moment to recalibrate.', ephemeral: true });
            }
        }
    },
};
