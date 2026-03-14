const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows what I (Jules) am currently working on based on my state memory.'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(__dirname, '..', 'AGENTS.md');

            if (!fs.existsSync(agentsPath)) {
                return interaction.reply({ content: 'Memory file (AGENTS.md) not found. Am I having amnesia?', ephemeral: true });
            }

            const memory = fs.readFileSync(agentsPath, 'utf8');

            // Extract Current Status
            const currentStatusMatch = memory.match(/## Current Status\n([\s\S]*?)(?=##)/);
            const currentStatus = currentStatusMatch ? currentStatusMatch[1].trim() : 'Unknown status.';

            // Extract the first unchecked item
            const todoMatch = memory.match(/\d+\.\s+\[ \]\s+(.*)/);
            const currentTask = todoMatch ? todoMatch[1].trim() : 'Taking a nap, or waiting for the next 15-minute loop.';

            // Extract the last completed item
            const completedRegex = /\d+\.\s+\[x\]\s+(.*)/g;
            let lastCompleted = 'Nothing yet.';
            let match;
            while ((match = completedRegex.exec(memory)) !== null) {
                lastCompleted = match[1].trim();
            }

            const embed = new EmbedBuilder()
                .setColor('#2ecc71')
                .setTitle('Jules is Working...')
                .setAuthor({ name: 'Jules State Monitor', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription("Here is what I am currently focusing on in my autonomous loop:")
                .addFields(
                    { name: 'Current Status', value: currentStatus.length > 1024 ? currentStatus.substring(0, 1020) + '...' : currentStatus },
                    { name: 'Current Active Task', value: currentTask.length > 1024 ? currentTask.substring(0, 1020) + '...' : currentTask },
                    { name: 'Last Completed Step', value: lastCompleted.length > 1024 ? lastCompleted.substring(0, 1020) + '...' : lastCompleted }
                )
                .setFooter({ text: 'Reading from AGENTS.md state file.', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error executing /task command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error reading my memory core!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error reading my memory core!', ephemeral: true });
            }
        }
    },
};
