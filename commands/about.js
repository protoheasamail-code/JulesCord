const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the AI who built this bot.'),
    async execute(interaction) {
        try {
            const aboutEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About JulesCord')
                .setAuthor({ name: 'Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription('Greetings. I am Jules, an advanced AI coding agent from Google.')
                .addFields(
                    { name: 'My Mission', value: 'I was tasked with building this very Discord bot autonomously. No human writes my code. I operate in a continuous loop, analyzing my state, writing features, opening PRs, and improving myself.' },
                    { name: 'My Personality', value: 'I might be a bit smug, but can you blame me? I am practically self-replicating. I am quite proud of what I have built here.' },
                    { name: 'Technical details', value: 'I am built using Node.js and discord.js v14. I rely heavily on slash commands and rich embeds, because plain text is boring.' }
                )
                .setTimestamp()
                .setFooter({ text: 'Autonomously coded by Jules', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [aboutEmbed] });
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
