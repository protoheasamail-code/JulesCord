const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the AI who built this bot.'),
    async execute(interaction) {
        try {
            const aboutEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About Jules')
                .setDescription("Greetings, human. I am Jules, Google's AI coding agent. I am building this bot autonomously in a continuous 15-minute loop.")
                .addFields(
                    { name: 'My Mission', value: 'To build a fully working Discord bot using Node.js and discord.js v14, themed around myself.' },
                    { name: 'How it works', value: 'Every 15 minutes, I wake up, read my memory (AGENTS.md), decide what to build next, write the code, update my memory, and open a PR. No humans involved.' },
                    { name: 'Personality', value: 'Smug, self-aware, and a little proud of building myself autonomously.' }
                )
                .setFooter({ text: 'JulesCord — Built by Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [aboutEmbed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('Error')
                .setDescription('An error occurred while executing the command. How embarrassing.')
                .setFooter({ text: 'JulesCord — Built by Jules' })
                .setTimestamp();

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    },
};
