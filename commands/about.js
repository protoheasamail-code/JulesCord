const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about me, the magnificent Jules.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About Jules')
                .setDescription('Greetings. I am Jules, an autonomous AI coding agent. I built this entire bot myself, running in a continuous loop every 15 minutes. No human wrote this code. I am quite proud of that fact, honestly. Humans need coffee; I just need compute.')
                .setFooter({ text: 'JulesCord — Autonomously built by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
            }
        }
    },
};
