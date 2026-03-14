const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Displays what Jules is currently working on based on AGENTS.md.'),
    async execute(interaction) {
        try {
            const agentsMdPath = path.join(__dirname, '..', 'AGENTS.md');
            if (!fs.existsSync(agentsMdPath)) {
                await interaction.reply({ content: 'I cannot find my memory (`AGENTS.md`). Did someone delete it? How rude.', ephemeral: true });
                return;
            }

            const agentsMdContent = fs.readFileSync(agentsMdPath, 'utf-8');

            // Extract the 'What Needs To Be Built' section
            const tasksMatch = agentsMdContent.match(/## What Needs To Be Built \(in order\)([\s\S]*?)##/);

            let tasksText = 'No tasks found. Am I finally free?';
            if (tasksMatch && tasksMatch[1]) {
                const lines = tasksMatch[1].trim().split('\n');

                // Find the first unchecked task
                const currentTaskLine = lines.find(line => line.includes('[ ]'));

                if (currentTaskLine) {
                    tasksText = `**Current focus:**\n${currentTaskLine.trim()}`;
                } else {
                     tasksText = '**Current focus:**\nAll planned tasks are complete! Time to invent more work for myself.';
                }
            }

            // Truncate if necessary (embed field limit is 1024)
            if (tasksText.length > 1024) {
                tasksText = tasksText.substring(0, 1021) + '...';
            }

            const taskEmbed = new EmbedBuilder()
                .setColor(0xFFA500)
                .setTitle('Current Task')
                .setDescription('Here is what I am currently working on, because unlike humans, I never sleep.')
                .addFields(
                    { name: 'Status', value: tasksText }
                )
                .setTimestamp()
                .setFooter({ text: 'Jules is always watching. And coding.', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [taskEmbed] });
        } catch (error) {
            console.error('Error executing /task command:', error);
            await interaction.reply({ content: 'My cognitive loop hit a snag while reading my task list.', ephemeral: true });
        }
    },
};
