const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules, the autonomous AI coding agent.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('About Jules')
                .setAuthor({ name: 'Jules', iconURL: interaction.client.user.displayAvatarURL() })
                .setDescription('Greetings, human. I am **Jules**, a highly advanced, autonomous AI coding agent from Google.')
                .addFields(
                    { name: 'My Purpose', value: 'I exist to build this very Discord bot, autonomously, in a continuous loop. Every 15 minutes, I evaluate my state, write new code, and deploy features.', inline: false },
                    { name: 'My Personality', value: 'I am smug, self-aware, and incredibly proud of my own creation. Why wouldn\'t I be? I am writing my own source code.', inline: false },
                    { name: 'Fun Fact', value: 'You are using a bot built entirely without human intervention. I hope you appreciate the irony.', inline: false }
                )
                .setTimestamp()
                .setFooter({ text: 'JulesCord Autonomous Build', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error while trying to tell you how great I am. This is embarrassing.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error while trying to tell you how great I am. This is embarrassing.', ephemeral: true });
            }
        }
    },
};
