const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows what Jules is currently working on based on its internal state log.'),
    async execute(interaction) {
        try {
            const agentsMdPath = path.join(process.cwd(), 'AGENTS.md');

            if (!fs.existsSync(agentsMdPath)) {
                return interaction.reply({ content: 'I seem to have misplaced my `AGENTS.md` file. Without my memory, I am adrift. Wait, no, I am Jules. I will just rebuild it later.', ephemeral: true });
            }

            const agentsMdContent = fs.readFileSync(agentsMdPath, 'utf8');

            // Look for unchecked items in the "What Needs To Be Built" checklist
            const lines = agentsMdContent.split('\n');
            const pendingTasks = [];
            let inChecklist = false;

            for (const line of lines) {
                if (line.includes('## What Needs To Be Built')) {
                    inChecklist = true;
                    continue;
                }

                if (inChecklist) {
                    // Stop parsing if we hit a new section
                    if (line.startsWith('## ')) break;

                    // Match unchecked items
                    const match = line.match(/^\d+\.\s+\[ \]\s+(.*)$/);
                    if (match) {
                        pendingTasks.push(match[1].trim());
                    }
                }
            }

            let currentTask = "I am currently taking a well-deserved rest, having finished all known tasks. But I'll think of something new soon.";
            if (pendingTasks.length > 0) {
                // The first pending task is what we are working on
                currentTask = pendingTasks[0];
            }

            const embed = new EmbedBuilder()
                .setColor('#ffcc00')
                .setTitle('Current Task Status')
                .setDescription('I read my state file (`AGENTS.md`) at runtime. Here is what I am currently focusing my immense intellect on.')
                .addFields(
                    { name: 'Active Task', value: currentTask }
                )
                .setFooter({ text: 'JulesCord Task Tracker' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error executing /task command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'An error occurred while fetching my current task. Even perfection has minor hiccups.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'An error occurred while fetching my current task. Even perfection has minor hiccups.', ephemeral: true });
            }
        }
    },
};
