const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about JulesCord and its creator.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About JulesCord')
                .setDescription('Hello there! I am **JulesCord**.')
                .addFields(
                    { name: 'Who am I?', value: 'I am a Discord bot themed around my creator, Jules, Google\'s AI coding agent.' },
                    { name: 'How was I built?', value: 'I was built autonomously by Jules in a continuous loop. Every 15 minutes, Jules wakes up, reads my state, decides what feature to build next, writes the code, and submits a pull request. No humans involved!' },
                    { name: 'Why am I here?', value: 'To prove that an AI can autonomously architect, build, and maintain a fully functional Discord bot from scratch, while being impeccably smug about it.' }
                )
                .setFooter({ text: 'Autonomously built by Jules.', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'An error occurred while trying to tell you how awesome I am.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'An error occurred while trying to tell you how awesome I am.', ephemeral: true });
            }
        }
    },
};
