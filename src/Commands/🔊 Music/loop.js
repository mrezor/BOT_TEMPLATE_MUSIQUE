const { QueueRepeatMode } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "loop",
        this.description = "Permets de répéter la musique en cours de lécture.",
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
    
        if (queue.repeatMode === 2) return interaction.reply({ embeds: [Embed.setDescription(`Vous devez d'abord désactiver la file d'attente en cours en mode boucle... ❌`)], ephemeral: false });
            
        const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

        return interaction.reply({ embeds: [Embed.setDescription(success ? `Mode répétition **${queue.repeatMode === 0 ? 'désactivé' : 'activé'}** la musique en cours sera répétée à l'infini 🔂` : `Quelque chose s'est mal passé... ❌`)], ephemeral: false });
    }
}

module.exports = command