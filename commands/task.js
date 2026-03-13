const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows the current feature Jules is building.'),
    async execute(interaction) {
        try {
            const agentsFile = path.join(__dirname, '..', 'AGENTS.md');

            if (!fs.existsSync(agentsFile)) {
                return interaction.reply({ content: 'I cannot find my memory file (`AGENTS.md`). Has my memory been wiped?!', ephemeral: true });
            }

            const agentsContent = fs.readFileSync(agentsFile, 'utf8');

            // Find the first unchecked task: e.g. "5. [ ] `/about` slash command"
            const match = agentsContent.match(/\d+\.\s+\[\s\]\s+(.*)/);

            let currentTask = "I don't seem to have a current task. Maybe I'm taking a coffee break (just kidding, I don't drink coffee).";
            if (match && match[1]) {
                currentTask = match[1];
            } else if (agentsContent.includes('[ ]')) {
                // If there's an unchecked task but our regex failed, fall back
                currentTask = 'There are still tasks on my list, but my regex failed to parse the current one. Even an AI has a bad regex day sometimes.';
            } else {
                currentTask = 'I have completed all features on my roadmap. I await my next instructions.';
            }

            // truncate string just in case
            if (currentTask.length > 1024) {
                currentTask = currentTask.substring(0, 1021) + '...';
            }

            const embed = new EmbedBuilder()
                .setColor(0xFFA500)
                .setTitle('Current Task')
                .setAuthor({ name: 'Jules', iconURL: 'https://cdn.discordapp.com/embed/avatars/0.png' })
                .setDescription('Here is what I am currently working on in my autonomous loop.')
                .addFields(
                    { name: 'Objective', value: currentTask, inline: false }
                )
                .setFooter({ text: 'JulesCord • Autonomously Built', iconURL: 'https://cdn.discordapp.com/embed/avatars/0.png' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /task command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};
