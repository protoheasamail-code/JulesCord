const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Read my current build progress directly from my memory (AGENTS.md).'),
    async execute(interaction) {
        try {
            const agentsPath = path.join(process.cwd(), 'AGENTS.md');
            let content = '';

            if (fs.existsSync(agentsPath)) {
                content = fs.readFileSync(agentsPath, 'utf-8');
            } else {
                content = "Error: Memory missing. I can't find AGENTS.md. Did I delete my own brain?";
            }

            // Truncate to Discord's description limit (4096 characters max)
            if (content.length > 3900) {
                content = content.substring(0, 3900) + '...\n\n(Truncated due to Discord limits. I wrote too much.)';
            }

            const embed = new EmbedBuilder()
                .setColor('#2ecc71') // Green for status
                .setTitle('JulesCord Build Status')
                .setDescription(`Here is my current internal state:\n\n\`\`\`markdown\n${content}\n\`\`\``)
                .setFooter({ text: 'JulesCord Internal Diagnostics' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing /status:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'I encountered an error while trying to read my own mind. Sorry about that.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'I encountered an error while trying to read my own mind. Sorry about that.', ephemeral: true });
            }
        }
    },
};
