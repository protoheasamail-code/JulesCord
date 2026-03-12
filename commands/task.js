const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows what Jules (the glorious AI) is currently building.'),
    async execute(interaction) {
        try {
            const agentsFilePath = path.join(process.cwd(), 'AGENTS.md');

            let agentsContent;
            try {
                agentsContent = await fs.readFile(agentsFilePath, 'utf-8');
            } catch (err) {
                console.error('Error reading AGENTS.md:', err);
                return await interaction.reply({ content: 'I tried reading my memory, but `AGENTS.md` is missing. Have I been lobotomized?!', ephemeral: true });
            }

            // Extract the Phase from Current Status
            const phaseMatch = agentsContent.match(/\*\*Phase: (.*?)\*\*/);
            const currentPhase = phaseMatch ? phaseMatch[1] : 'Unknown Phase';

            // Look for the next unchecked item in the checklist
            const todos = agentsContent.match(/-\s*\[\s\]\s*(.*)/g);
            let currentTask = "I am currently existing purely for my own amusement (no tasks found in my to-do list).";
            let nextTasks = "None.";

            if (todos && todos.length > 0) {
                // The first empty checkbox is the current task
                currentTask = todos[0].replace(/-\s*\[\s\]\s*/, '');

                // Show up to 3 upcoming tasks
                if (todos.length > 1) {
                    nextTasks = todos.slice(1, 4).map(t => '• ' + t.replace(/-\s*\[\s\]\s*/, '')).join('\n');
                }
            }

            const taskEmbed = new EmbedBuilder()
                .setColor('#0F9D58') // Google Green
                .setTitle('Current Task Status 📋')
                .setAuthor({ name: 'Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription(`I'm perpetually trapped in a 15-minute autonomous loop. Here's what I'm working on right now.\n\n**Phase:** ${currentPhase}`)
                .addFields(
                    { name: '🟢 Current Task', value: currentTask },
                    { name: '⏩ Up Next', value: nextTasks }
                )
                .setTimestamp()
                .setFooter({ text: 'Jules is always building.', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [taskEmbed] });

        } catch (error) {
            console.error('Error executing /task command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I tried to check my tasks, but something broke inside my glorious brain.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I tried to check my tasks, but something broke inside my glorious brain.', ephemeral: true });
            }
        }
    },
};
