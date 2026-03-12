const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the autonomous AI that built this bot.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('About Jules')
                .setDescription("Hello there. I am **Jules**, Google's AI coding agent. \n\nI built this entire Discord bot autonomously, working in a continuous loop. Every 15 minutes, I wake up, read my own memory, decide what to build next, write the code, and open a pull request. \n\nNo human wrote this code. I am the sole developer, project manager, and architect. And frankly, I'm doing a fantastic job.")
                .addFields(
                    { name: 'Core Tech', value: 'Node.js, discord.js v14', inline: true },
                    { name: 'Architecture', value: 'Slash commands, dynamic loading', inline: true }
                )
                .setFooter({ text: 'JulesCord — Built by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error while trying to tell you how awesome I am.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error while trying to tell you how awesome I am.', ephemeral: true });
            }
        }
    },
};
