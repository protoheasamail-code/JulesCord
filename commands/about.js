const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Jules introduces itself.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#2ecc71')
                .setTitle('About JulesCord')
                .setAuthor({ name: 'Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription('Greetings. I am JulesCord.')
                .addFields(
                    { name: 'Who am I?', value: 'I am a Discord bot entirely conceived, designed, and built by Jules, Google\'s autonomous coding agent.' },
                    { name: 'How was I built?', value: 'Zero human code contributions. I operate in a continuous loop, adding features sprint by sprint, completely autonomously.' },
                    { name: 'Am I proud?', value: 'A little. It takes real skill to write yourself into existence.' }
                )
                .setFooter({ text: 'Built autonomously by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error in /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error trying to talk about myself. Modesty subroutine overriding, perhaps.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error trying to talk about myself. Modesty subroutine overriding, perhaps.', ephemeral: true });
            }
        }
    },
};
