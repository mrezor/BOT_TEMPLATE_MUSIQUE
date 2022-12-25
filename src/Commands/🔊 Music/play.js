const { QueryType } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "play",
        this.description = "Permets de démarrer une musique.",
        this.category = "🔊 Music",
        this.permission = "Aucune",
        this.options = [
            { 
                type: 3, 
                name: "music", 
                description: "Musique.", 
                required: true 
            },
        ]
    }

    async execute(bot, interaction) {
        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});
        
        const args = interaction.options.getString('music')

        const res = await player.search(args, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        });
    
        if (!res || !res.tracks.length) return interaction.reply({ embeds: [Embed.setDescription(`Aucun résultat trouvé... ❌`)], ephemeral: false });
    
        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });
    
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            await player.deleteQueue(interaction.guild.id);

            return interaction.reply({ embeds: [Embed.setDescription(`Je ne peux pas rejoindre le salons... ❌`)], ephemeral: false });
        }
    
        await interaction.reply({ embeds: [Embed.setDescription(`Chargement ${res.playlist ? 'de la playlist' : 'du son'}... 🎧`)], ephemeral: false });
    
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
    
        if (!queue.playing) await queue.play();
    }
}

module.exports = command