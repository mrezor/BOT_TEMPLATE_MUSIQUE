const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "stop",
        this.description = "Permets d'arrêter la musique.",
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
    
        queue.destroy();
    
        interaction.reply({ embeds: [Embed.setDescription(`La musique s'est arrêtée sur ce serveur, à la prochaine ✅`)], ephemeral: false });
    }
}

module.exports = command