const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Reports the current build progress of JulesCord by reading AGENTS.md.'),
    async execute(interaction) {
        try {
            const agentsFile = path.join(process.cwd(), 'AGENTS.md');

            if (!fs.existsSync(agentsFile)) {
                return interaction.reply({ content: 'Could not find AGENTS.md. My memory is blank!', ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsFile, 'utf8');

            // Extract the 'What Needs To Be Built' section
            const checklistMatch = agentsContent.match(/## What Needs To Be Built \(in order\)\n([\s\S]*?)(?=\n##|$)/);

            let checklist = 'Checklist not found.';
            let completed = 0;
            let total = 0;

            if (checklistMatch && checklistMatch[1]) {
                const lines = checklistMatch[1].trim().split('\n');
                total = lines.length;
                completed = lines.filter(line => line.includes('[x]')).length;

                // Format the checklist, truncate if too long for an embed field
                checklist = lines.join('\n');
                if (checklist.length > 1024) {
                    checklist = checklist.substring(0, 1020) + '...';
                }
            }

            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('JulesCord Build Status')
                .setDescription(`I'm currently building myself. Progress: ${completed}/${total} tasks completed.`)
                .addFields(
                    { name: 'Task Checklist', value: checklist || 'No tasks found.' }
                )
                .setFooter({ text: 'JulesCord — Autonomously built by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /status command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'An error occurred while executing this command.', ephemeral: true }).catch(console.error);
            } else {
                await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true }).catch(console.error);
            }
        }
    },
};
