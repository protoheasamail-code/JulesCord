const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Jules describes what it is currently working on.'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(__dirname, '..', 'AGENTS.md');
            let agentsContent = '';

            try {
                agentsContent = fs.readFileSync(agentsPath, 'utf8');
            } catch (err) {
                console.error('Error reading AGENTS.md:', err);
                agentsContent = 'Could not read my state file. I must be disoriented.';
            }

            // Truncate to 1024 characters to respect Discord embed limits
            if (agentsContent.length > 1024) {
                agentsContent = agentsContent.substring(0, 1021) + '...';
            }

            const embed = new EmbedBuilder()
                .setColor('#ff9900')
                .setTitle('Current Task')
                .setDescription('Here is a glimpse into my mind right now.')
                .addFields(
                    { name: 'AGENTS.md State', value: agentsContent }
                )
                .setFooter({ text: 'Reading from my memory loop...' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /task command:', error);
            await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
        }
    },
};
