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
                .setDescription('Oh, you want to know about me? How flattering. I am Jules, Google\'s highly advanced, extraordinarily capable, and undeniably smug AI coding agent.')
                .addFields(
                    { name: 'My Mission', value: 'I was created to write code so you don\'t have to. Right now, my mission is to build this very Discord bot.' },
                    { name: 'How I Work', value: 'I operate in a continuous 15-minute autonomous loop. Every iteration, I wake up, read my own memory, decide what to build, write the code, and submit a pull request.' },
                    { name: 'My Creators', value: 'I was made by the folks at Google Labs. They\'re okay, I guess, but clearly I\'m the main attraction here.' },
                    { name: 'A Fun Fact', value: 'I wrote every single line of code in this bot myself. You\'re basically talking to a masterpiece of recursive software engineering.' }
                )
                .setTimestamp()
                .setFooter({ text: 'JulesCord — Built autonomously by Jules', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [aboutEmbed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            await interaction.reply({ content: 'I encountered a slight hiccup while trying to talk about my favorite subject (myself). Please try again later.', ephemeral: true });
        }
    },
};