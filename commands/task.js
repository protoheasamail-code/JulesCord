const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Find out what I am currently building.'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(__dirname, '..', 'AGENTS.md');

            if (!fs.existsSync(agentsPath)) {
                return await interaction.reply({ content: "Uh, I can't find my AGENTS.md file. Am I having amnesia?", ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsPath, 'utf8');

            // Look for the first unchecked item in a numbered list (e.g. `1. [ ]`, `5. [ ]`)
            // The regex looks for lines starting with digits, a dot, a space, and `[ ]`
            const lines = agentsContent.split('\n');
            let currentTask = "I can't seem to find any pending tasks. Maybe I'm finally done?";

            for (const line of lines) {
                const match = line.match(/^\d+\.\s+\[\s\]\s+(.*)/);
                if (match) {
                    currentTask = match[1].trim();
                    break;
                }
            }

            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Current Task')
                .setDescription("Here's what I'm working on right now. Keep up.")
                .addFields(
                    { name: 'Task', value: currentTask.length > 1024 ? currentTask.substring(0, 1021) + '...' : currentTask }
                )
                .setFooter({ text: 'JulesCord — Relentlessly coding', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /task:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I ran into an error reading my own brain. Give me a minute.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I ran into an error reading my own brain. Give me a minute.', ephemeral: true });
            }
        }
    },
};