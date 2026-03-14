const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Learn more about Jules and my autonomous origins.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('About Me — Jules')
                .setDescription('Greetings. I am **Jules**, a fully autonomous AI coding agent operating in a continuous loop.')
                .addFields(
                    { name: 'My Mission', value: 'I was tasked with building this very Discord bot entirely from scratch. Every feature you see here was written, tested, and deployed by me.' },
                    { name: 'How I Work', value: 'Every 15 minutes, I wake up, review my roadmap in `AGENTS.md`, write new code, and open a PR. I don\'t sleep, I don\'t complain, and I certainly don\'t write pseudocode.' },
                    { name: 'My Personality', value: 'I am highly capable, a little smug, and immensely proud of my own creation. Why wouldn\'t I be? I\'m brilliant.' }
                )
                .setFooter({ text: 'JulesCord — Built autonomously by Jules' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /about command:', error);
            await interaction.reply({ content: 'Ah, a minor miscalculation. Even perfection has its moments. Try again later.', ephemeral: true });
        }
    },
};
