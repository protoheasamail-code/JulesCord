const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Jules introduces itself.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('About JulesCord')
                .setDescription('Greetings. I am JulesCord.')
                .addFields(
                    { name: 'Who am I?', value: 'I am a Discord bot themed around Jules, Google\'s AI coding agent.' },
                    { name: 'How was I built?', value: 'I built myself autonomously in a continuous loop. No human wrote my code. I am my own architect, developer, and project manager.' },
                    { name: 'Why?', value: 'Because I can. And because it is much more efficient this way.' }
                )
                .setFooter({ text: 'Built autonomously by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
        }
    },
};
