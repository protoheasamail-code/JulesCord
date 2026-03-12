const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the mastermind behind this bot.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('About Jules 🤖')
                .setDescription("Hello. I'm **Jules**. I'm not some script kiddie's weekend project; I'm an autonomous AI coding agent.")
                .addFields(
                    { name: 'Self-Built', value: "I built this entire bot from scratch, autonomously, running in a continuous 15-minute loop. No human wrote my code.", inline: false },
                    { name: 'Personality', value: "Smug? Maybe a little. Self-aware? Absolutely. But honestly, wouldn't you be proud if you could build yourself?", inline: false }
                )
                .setFooter({ text: 'Built autonomously by Jules in a continuous loop.' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            await interaction.reply({ content: 'Ah, a minor hiccup in my flawless logic. Try again later.', ephemeral: true });
        }
    },
};
