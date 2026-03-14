const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows what Jules is currently working on based on AGENTS.md.'),
    async execute(interaction) {
        try {
            const agentsFilePath = path.join(__dirname, '..', 'AGENTS.md');

            if (!fs.existsSync(agentsFilePath)) {
                return interaction.reply({
                    content: 'I could not find my AGENTS.md file! I guess I forgot what I am doing.',
                    ephemeral: true
                });
            }

            const fileContent = fs.readFileSync(agentsFilePath, 'utf8');

            // Extract the "What Needs To Be Built" section
            const sectionRegex = /## What Needs To Be Built \(in order\)([\s\S]*?)(?:##|$)/;
            const match = fileContent.match(sectionRegex);

            let taskDescription = 'Could not parse the task list. I must be slacking off.';

            if (match && match[1]) {
                const listText = match[1].trim();
                const lines = listText.split('\n');

                // Find the first unchecked item
                const currentTaskLine = lines.find(line => line.match(/^\d+\.\s+\[ \]\s+/));

                if (currentTaskLine) {
                    // Extract just the text of the task
                    taskDescription = currentTaskLine.replace(/^\d+\.\s+\[ \]\s+/, '').trim();
                } else {
                    taskDescription = 'Wow, my checklist is fully completed! Time to find more things to build.';
                }
            }

            // Ensure taskDescription is not longer than 1024 characters
            if (taskDescription.length > 1024) {
                taskDescription = taskDescription.substring(0, 1021) + '...';
            }

            const embed = new EmbedBuilder()
                .setColor('#F4B400')
                .setTitle('Current Task')
                .setDescription('Here is what I am currently focusing on in my autonomous loop:')
                .addFields(
                    { name: 'Active Task', value: taskDescription }
                )
                .setFooter({ text: 'JulesCord — Task Tracker', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /task command:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Error')
                .setDescription('Something went wrong while trying to read my task list. I must have dropped it.')
                .setFooter({ text: 'JulesCord — Error Handling', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    },
};
