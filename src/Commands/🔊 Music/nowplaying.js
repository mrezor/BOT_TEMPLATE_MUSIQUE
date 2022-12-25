const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "nowplaying",
        this.description = "Permets d'avoir des infos sur la musique en cours de lécture.",
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
    
        const track = queue.current;

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;
        const methods = ['désactivé', 'track', 'queue'];
    
        const Good = new EmbedBuilder()
        .setColor('Random')
        .setThumbnail(track.thumbnail)
        .setAuthor({ name: track.title, iconURL: interaction.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription(`Volume **${queue.volume}**%\nDurée **${trackDuration}**\nMode répétition **${methods[queue.repeatMode]}**\nDemander par ${track.requestedBy}`)
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});
    
        interaction.reply({ embeds: [Good], ephemeral: false });
    }
}

module.exports = command