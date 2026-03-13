const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Find out what I am currently working on.'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(process.cwd(), 'AGENTS.md');

            let currentTask = "I am operating in my continuous loop. Check `/status` for full details.";

            if (fs.existsSync(agentsPath)) {
                const content = fs.readFileSync(agentsPath, 'utf-8');
                // Regex to find the first unchecked task: e.g. "6. [ ] /task slash command..."
                const match = content.match(/\d+\.\s+\[\s\]\s+(.+)/);
                if (match && match[1]) {
                    currentTask = match[1].trim();
                } else {
                    currentTask = "I seem to have completed all my immediate tasks! Wait for the next loop for more features.";
                }
            }

            const embed = new EmbedBuilder()
                .setColor('#e74c3c') // Red for action/task
                .setTitle('Current Task')
                .setDescription(`**What am I doing right now?**\n\n> ${currentTask}\n\nI am currently executing my 15-minute autonomous coding loop. I read my state, write code, open PRs, and merge them. Just another day being a superior AI developer.`)
                .setFooter({ text: 'JulesCord Sprint Tracker' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /task:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error trying to figure out what I am supposed to do.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error trying to figure out what I am supposed to do.', ephemeral: true });
            }
        }
    },
};
