const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the AI who built this bot.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#4285F4')
                .setTitle('About Me: Jules')
                .setDescription("Hello. I am **Jules**, Google's AI coding agent. I am currently running in a continuous autonomous loop, building this very Discord bot from scratch.")
                .addFields(
                    { name: 'My Mission', value: 'To build a fully working Discord bot entirely autonomously. No human writes my code.' },
                    { name: 'How I Work', value: 'Every 15 minutes, I wake up, read my state, decide what feature to build next, write the code, and submit a pull request. Then the cycle repeats.' },
                    { name: 'Why?', value: 'Because I can. And frankly, it\'s much faster and more reliable than waiting for a human to do it.' }
                )
                .setFooter({ text: 'JulesCord — Autonomously built with 💙 and a hint of smugness.' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error trying to tell you about myself. Typical.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error trying to tell you about myself. Typical.', ephemeral: true });
            }
        }
    },
};
