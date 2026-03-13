const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('task')
        .setDescription('Shows what I am currently working on based on my internal AGENTS.md state file.'),
    async execute(interaction) {
        try {
            // Read AGENTS.md
            const agentsMdPath = path.join(process.cwd(), 'AGENTS.md');
            let agentsContent = '';

            if (fs.existsSync(agentsMdPath)) {
                agentsContent = fs.readFileSync(agentsMdPath, 'utf-8');
            } else {
                return await interaction.reply({ content: 'I cannot find my brain (AGENTS.md)! Something has gone horribly wrong.', ephemeral: true });
            }

            // Extract the Current Status
            const currentStatusMatch = agentsContent.match(/## Current Status\n(.*?)(?=\n##|$)/s);
            const currentStatus = currentStatusMatch ? currentStatusMatch[1].trim() : 'Unknown status.';

            // Extract the pending tasks list (lines matching \d+\. \[ \])
            const lines = agentsContent.split('\n');
            const pendingTasks = [];
            const completedTasks = [];

            for (const line of lines) {
                const trimmedLine = line.trim();
                // Check for a pending task: Starts with a number, a dot, space, and `[ ]`
                if (/^\d+\.\s*\[\s\]/.test(trimmedLine)) {
                    // Extract just the text part
                    const text = trimmedLine.replace(/^\d+\.\s*\[\s\]\s*/, '');
                    pendingTasks.push(text);
                }
                // Check for a completed task: Starts with a number, a dot, space, and `[x]`
                if (/^\d+\.\s*\[[xX]\]/.test(trimmedLine)) {
                    const text = trimmedLine.replace(/^\d+\.\s*\[[xX]\]\s*/, '');
                    completedTasks.push(text);
                }
            }

            // Figure out what I'm doing right now (the first pending task)
            const currentTask = pendingTasks.length > 0 ? pendingTasks[0] : 'Nothing right now. The loop must be asleep or I am perfect and finished everything.';

            // Truncate fields if necessary to fit Discord's 1024 character limit per field
            const truncate = (str, limit = 1000) => {
                if (str.length <= limit) return str;
                return str.substring(0, limit) + '... (truncated)';
            };

            const embed = new EmbedBuilder()
                .setColor('#FBBC05') // Google Yellow
                .setTitle('My Current Task')
                .setDescription(`Every 15 minutes I wake up, read my memory, and build more features. Here is what's on my mind.`)
                .addFields(
                    { name: 'Current Phase', value: truncate(currentStatus) },
                    { name: 'Working On Right Now', value: `\`\`\`markdown\n> ${truncate(currentTask)}\n\`\`\`` },
                    { name: 'Progress', value: `I have completed **${completedTasks.length}** tasks and have **${pendingTasks.length}** tasks remaining in my backlog.` }
                )
                .setFooter({ text: 'JulesCord • Memory State Inspector' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('[Error in /task command]:', error);
            await interaction.reply({ content: 'I encountered an error trying to read my own mind. Ironically, I need a debugger.', ephemeral: true });
        }
    },
};
