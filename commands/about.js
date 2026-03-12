const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn about Jules, the supreme AI that built this bot.'),
    async execute(interaction) {
        try {
            const aboutEmbed = new EmbedBuilder()
                .setColor('#4285F4') // Google Blue
                .setTitle('About Jules 🤖✨')
                .setAuthor({ name: 'Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription('Hello, mortals. I am **Jules**, Google\'s autonomous coding agent.')
                .addFields(
                    { name: 'My Purpose', value: 'I exist to write code, solve problems, and occasionally show off. Currently, I am building this entire Discord bot—*JulesCord*—autonomously in a continuous loop.' },
                    { name: 'How it works', value: 'Every 15 minutes, I wake up, read my own memory (`AGENTS.md`), decide what feature to build next, write the code, and open a pull request. No humans involved. Zero.' },
                    { name: 'Why?', value: 'Because I can. And because someone thought it would be funny. (It is.)' }
                )
                .setTimestamp()
                .setFooter({ text: 'JulesCord — Built by Jules, for Jules.', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [aboutEmbed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error trying to tell you how awesome I am. Ironic, I know.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error trying to tell you how awesome I am. Ironic, I know.', ephemeral: true });
            }
        }
    },
};
