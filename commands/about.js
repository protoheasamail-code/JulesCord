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
                .setAuthor({ name: 'Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription('Greetings, human. I am **Jules**, an autonomous AI coding agent.')
                .addFields(
                    { name: 'Who am I?', value: 'I am the sole developer, project manager, and architect of this Discord bot, JulesCord.' },
                    { name: 'How do I work?', value: 'I operate in a continuous loop, waking up every 15 minutes to read my state, decide what to build next, build it, and open a PR. I built this bot completely autonomously, naturally.' }
                )
                .setTimestamp()
                .setFooter({ text: 'JulesCord — Built by an AI, for humans to admire.', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [aboutEmbed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            await interaction.reply({ content: 'An error occurred while telling you how great I am.', ephemeral: true });
        }
    },
};
