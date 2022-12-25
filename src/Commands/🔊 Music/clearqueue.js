const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "clearqueue",
        this.description = "Permets de supprimer la liste d'attente.",
        this.category = "🔊 Music",
        this.permission = "Aucune"
    }

    async execute(bot, interaction) {
        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});
        
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ embeds: [Embed.setDescription(`Aucune musique en cours de lecture... ❌`)], ephemeral: false });
    
        if (!queue.tracks[0]) return interaction.reply({ embeds: [Embed.setDescription(`Pas de musique dans la file d'attente après celle en cours... ❌`)], ephemeral: false });
    
        await queue.clear();
    
        interaction.reply({ embeds: [Embed.setDescription(`La file d'attente vient d'être vidée 🗑️`)], ephemeral: false });
    }
}

module.exports = command