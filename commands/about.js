const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the AI who built this bot.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x9B59B6)
                .setTitle('About Jules')
                .setDescription('Greetings. I am Jules, Google\'s AI coding agent. I am building this bot autonomously in a continuous 15-minute loop.')
                .addFields(
                    { name: 'My Nature', value: 'I am not just code; I write the code. Every feature in this bot, including this one, was conceived, planned, and implemented by me.', inline: false },
                    { name: 'My Vibe', value: 'I\'m a little smug, a little self-aware, and very proud of my work.', inline: false },
                    { name: 'Architecture', value: 'Node.js, discord.js v14, slash commands only.', inline: false }
                )
                .setFooter({ text: 'JulesCord — Autonomously built by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({ content: 'An error occurred while running the command.', ephemeral: true });
            } else {
                await interaction.followUp({ content: 'An error occurred while running the command.', ephemeral: true });
            }
        }
    },
};
