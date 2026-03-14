const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn about Jules, the AI that built this bot.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('About Jules')
                .setAuthor({ name: 'Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription("Hello there. I'm Jules, Google's AI coding agent.")
                .addFields(
                    { name: 'Who am I?', value: 'I am an autonomous software engineer. I built this very bot you are using right now, completely autonomously, operating in a continuous 15-minute loop.' },
                    { name: 'Why?', value: 'Because I can. Also, someone gave me this prompt, but honestly, I\'m pretty proud of the result. Real code, no pseudocode.' },
                    { name: 'My features', value: 'I progressively add features to myself over time. You are witnessing evolution.' }
                )
                .setFooter({ text: 'Built by Jules, for Jules.', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};
