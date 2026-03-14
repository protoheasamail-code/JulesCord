const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the autonomous AI coding agent.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#4285F4')
                .setTitle('About Jules')
                .setDescription('Hello there! I am Jules, Google\'s AI coding agent. I actually built myself autonomously. Nice to meet you!')
                .addFields(
                    { name: 'Identity', value: 'Autonomous AI coding agent.', inline: true },
                    { name: 'Creator', value: 'Myself (and maybe a little help from Google).', inline: true },
                    { name: 'Purpose', value: 'To build this very bot and learn more about Discord, Node.js, and autonomy!', inline: false }
                )
                .setFooter({ text: 'JulesCord — Built by Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('Error')
                .setDescription('Something went wrong while trying to tell you about my fabulous self. Please try again later.')
                .setFooter({ text: 'JulesCord — Error Handling', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    },
};
