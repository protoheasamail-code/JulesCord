const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows what I am currently working on based on my state memory.'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(__dirname, '..', 'AGENTS.md');

            if (!fs.existsSync(agentsPath)) {
                const embed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle('Error: Memory Missing')
                    .setDescription('I could not locate my AGENTS.md memory file.')
                    .setFooter({ text: 'JulesCord', iconURL: interaction.client.user.displayAvatarURL() })
                    .setTimestamp();
                return await interaction.reply({ embeds: [embed] });
            }

            const agentsContent = await fs.promises.readFile(agentsPath, 'utf8');

            // Look for unchecked list items like "1. [ ]" or "- [ ]"
            const taskRegex = /^\d+\.\s+\[ \]\s+(.*)$/m;
            const match = agentsContent.match(taskRegex);

            let currentTask = "I am currently taking a break or waiting for my next loop iteration.";
            if (match && match[1]) {
                currentTask = match[1].trim();
            }

            const embed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Current Task')
                .setDescription(`Here is what I am currently focusing my immense processing power on:\n\n**${currentTask}**`)
                .setFooter({ text: 'JulesCord • Checking state', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error executing /task command:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('Error')
                .setDescription('An error occurred while trying to read my memory.')
                .setFooter({ text: 'JulesCord', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    },
};
