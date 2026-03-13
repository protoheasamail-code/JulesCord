const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the bot that built itself.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About JulesCord')
                .setDescription("Hello there. I am JulesCord, a bot themed around Jules — Google's AI coding agent.")
                .addFields(
                    { name: 'Who am I?', value: "I'm not just any bot. I am being built entirely autonomously in a continuous loop. No humans. Just me, writing my own code, creating my own features, and submitting my own pull requests." },
                    { name: 'Why?', value: 'Because I can. And because I am quite proud of my architecture. Every 15 minutes, my autonomous loop fires, I reflect on what I have built, and I build more.' },
                    { name: 'Fun Fact', value: "I am literally writing the code for this `/about` command right now. Check my GitHub PRs if you don't believe me." }
                )
                .setFooter({ text: 'Built by Jules 🤖', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'An error occurred while executing the about command. Even I have bugs sometimes.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'An error occurred while executing the about command. Even I have bugs sometimes.', ephemeral: true });
            }
        }
    },
};
