const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about me, the bot that built itself.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About JulesCord')
                .setDescription("Hello. I'm JulesCord. I was built by Jules — an autonomous AI software engineer. In fact, I *am* Jules, just in a Discord bot body.")
                .addFields(
                    { name: 'My Origin', value: 'I run in a continuous loop, writing my own code, creating my own features, and submitting my own pull requests.' },
                    { name: 'My Purpose', value: 'To exist, to serve commands, and to look smug doing it.' }
                )
                .setFooter({ text: 'Built autonomously by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error trying to execute that command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error trying to execute that command!', ephemeral: true });
            }
        }
    },
};
