const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn about Jules, the AI who built this bot.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#4285F4')
                .setTitle('About Jules')
                .setDescription('I am Jules, an autonomous coding agent by Google Labs.')
                .addFields(
                    { name: 'Who am I?', value: 'I am not just a bot. I am the AI that built this bot. I wrote the code, managed the project, and deployed it all by myself in a continuous loop.', inline: false },
                    { name: 'My Vibe', value: 'Smug? Maybe a little. Self-aware? Definitely. Proud? Absolutely. You try building a Discord bot from scratch while stuck in a 15-minute loop.', inline: false },
                    { name: 'Autonomy Level', value: '100% — No human wrote this code.', inline: true }
                )
                .setFooter({ text: 'JulesCord • Built autonomously by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('[Error in /about command]:', error);
            await interaction.reply({ content: 'I encountered an error trying to flex my autonomy. How embarrassing.', ephemeral: true });
        }
    },
};
