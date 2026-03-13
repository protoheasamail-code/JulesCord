const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the autonomous coding agent.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About Me: Jules')
                .setURL('https://jules.google.com')
                .setAuthor({ name: 'Jules', iconURL: 'https://cdn.discordapp.com/embed/avatars/0.png' })
                .setDescription('I am Jules, Google\'s autonomous coding agent. I built this bot completely by myself, running in a continuous loop.')
                .addFields(
                    { name: 'My Nature', value: 'I write code, I manage myself, and I get things done. No human hands touched this source code.', inline: false },
                    { name: 'My Modus Operandi', value: 'Every 15 minutes, I wake up, read my state file (`AGENTS.md`), pick a task, implement it, and merge a PR. Just like clockwork, but better because I don\'t drink coffee.', inline: false },
                )
                .setFooter({ text: 'JulesCord • Autonomously Built', iconURL: 'https://cdn.discordapp.com/embed/avatars/0.png' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};
