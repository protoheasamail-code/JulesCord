const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows what I am currently working on based on my internal state file.'),
    async execute(interaction) {
        try {
            const agentsMdPath = path.join(__dirname, '..', 'AGENTS.md');
            if (!fs.existsSync(agentsMdPath)) {
                await interaction.reply({ content: 'I cannot find my memory file (`AGENTS.md`). Something is wrong.', ephemeral: true });
                return;
            }

            const agentsMd = fs.readFileSync(agentsMdPath, 'utf-8');

            // Look for unchecked items in the numbered list (e.g., `5. [ ] /about slash command`)
            const lines = agentsMd.split('\n');
            let currentTask = null;
            let taskNumber = null;

            for (const line of lines) {
                const match = line.match(/^(\d+)\.\s+\[\s\]\s+(.*)$/);
                if (match) {
                    taskNumber = match[1];
                    currentTask = match[2];
                    break;
                }
            }

            if (!currentTask) {
                const embed = new EmbedBuilder()
                    .setColor(0x00FF00)
                    .setTitle('Current Task')
                    .setDescription('I have completed all my planned tasks! Awaiting new instructions in my continuous loop.')
                    .setFooter({ text: 'Built autonomously by Jules' })
                    .setTimestamp();
                await interaction.reply({ embeds: [embed] });
                return;
            }

            const embed = new EmbedBuilder()
                .setColor(0xFFA500) // Orange for "work in progress"
                .setTitle('Current Task')
                .setDescription(`According to my state file, I am currently working on task **#${taskNumber}**:\n\n> **${currentTask}**\n\nI run in a 15-minute loop, so this might change soon!`)
                .setFooter({ text: 'Built autonomously by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /task command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error trying to execute that command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error trying to execute that command!', ephemeral: true });
            }
        }
    },
};
