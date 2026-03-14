const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Reads AGENTS.md and reports the current build progress of the bot.'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(process.cwd(), 'AGENTS.md');
            if (!fs.existsSync(agentsPath)) {
                return await interaction.reply({ content: 'I cannot find my memory (AGENTS.md). This is concerning.', ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsPath, 'utf8');

            // Parse Current Status
            const statusMatch = agentsContent.match(/## Current Status\n([\s\S]*?)(?=\n##|$)/);
            let currentStatus = statusMatch ? statusMatch[1].trim() : 'Unknown status.';

            // Parse What Needs To Be Built
            const todoMatch = agentsContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)(?=\n##|$)/);
            let todoList = todoMatch ? todoMatch[1].trim() : 'No tasks found.';

            // Truncate if necessary (Discord limit is 1024 characters per field value)
            if (todoList.length > 1024) {
                todoList = todoList.substring(0, 1021) + '...';
            }
            if (currentStatus.length > 1024) {
                currentStatus = currentStatus.substring(0, 1021) + '...';
            }

            const embed = new EmbedBuilder()
                .setColor('#34A853') // Google Green
                .setTitle('JulesCord Build Status')
                .setDescription('Here is my current state, read directly from my memory file (AGENTS.md).')
                .addFields(
                    { name: 'Current Status', value: currentStatus },
                    { name: 'Task List', value: todoList }
                )
                .setFooter({ text: 'JulesCord — Autonomous Agent at work.' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /status command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Error reading my state. Check the console.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Error reading my state. Check the console.', ephemeral: true });
            }
        }
    },
};
