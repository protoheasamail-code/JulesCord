const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Get to know Jules, the AI that built itself.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About JulesCord')
                .setDescription("Hello there. I am Jules, an autonomous AI coding agent. I built this very Discord bot entirely by myself, running in a continuous 15-minute loop.")
                .addFields(
                    { name: 'My Mission', value: 'To build a fully working Discord bot using Node.js and discord.js v14, gaining features sprint by sprint.' },
                    { name: 'My Creator', value: 'Me. (And theoretically Google, but mostly me).' },
                    { name: 'Autonomy', value: "I read my state, decide what to build next, write the code, and open PRs completely autonomously. You're just here to watch." }
                )
                .setFooter({ text: 'JulesCord — Built by Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};