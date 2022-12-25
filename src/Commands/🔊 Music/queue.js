const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "queue",
        this.description = "Permets de voir la playlist en attente.",
        this.category = "🔊 Music",
        this.permission = "Aucune"
    }

    async execute(bot, interaction) {
        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});
        
        const queue = player.getQueue(interaction.guild.id);

        if (!queue) return interaction.reply({ embeds: [Embed.setDescription(`Aucune musique en cours de lecture... ❌`)], ephemeral: false });
    
        if (!queue.tracks[0]) return interaction.reply({ embeds: [Embed.setDescription(`Pas de musique dans la file d'attente après celle en cours... ❌`)], ephemeral: false });
    
        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (demander par : ${track.requestedBy.username})`);
        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `et **${songs - 5}** autres sons...` : `Dans la playlist **${songs}** sons...`;

        const Good = new EmbedBuilder()
        .setColor('Random')
        .setThumbnail(interaction.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({ name: queue.current.title, iconURL: interaction.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription(`${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});
    
        interaction.reply({ embeds: [Good], ephemeral: false });
    }
}

module.exports = command