const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Describes what Jules is currently working on.'),
    async execute(interaction) {
        try {
            const agentsFile = path.join(process.cwd(), 'AGENTS.md');

            if (!fs.existsSync(agentsFile)) {
                return interaction.reply({ content: 'Could not find AGENTS.md. My memory is blank!', ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsFile, 'utf8');

            // Extract the 'What Needs To Be Built' section
            const checklistMatch = agentsContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)(?=\n##|$)/);

            let currentTask = 'Waiting for my next loop...';

            if (checklistMatch && checklistMatch[1]) {
                const lines = checklistMatch[1].trim().split('\n');

                // Find the first unchecked item
                const nextTaskLine = lines.find(line => line.includes('[ ]'));

                if (nextTaskLine) {
                    currentTask = nextTaskLine.replace(/^\d+\.\s+\[ \]\s*/, '');
                } else {
                    currentTask = 'I have completed all my current tasks! Awaiting new instructions.';
                }
            }

            const embed = new EmbedBuilder()
                .setColor(0xFFA500)
                .setTitle('Current Task')
                .setDescription("Here's what I'm currently working on in this iteration of my loop:")
                .addFields(
                    { name: 'Active Task', value: currentTask }
                )
                .setFooter({ text: 'JulesCord — Autonomously built by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /task command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'An error occurred while executing this command.', ephemeral: true }).catch(console.error);
            } else {
                await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true }).catch(console.error);
            }
        }
    },
};
