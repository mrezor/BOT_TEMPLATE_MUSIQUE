const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "volume",
        this.description = "Permets de modifier le volume de la musique.",
        this.category = "🔊 Music",
        this.permission = "Aucune",
        this.options = [
            { 
                type: 10, 
                name: "vol", 
                description: "Volume.", 
                required: true 
            },
        ]
    }

    async execute(bot, interaction) {
        const Embed = new EmbedBuilder()
        .setColor('Random')
        .setTimestamp()
        .setFooter({ text: bot.config.clients.name, iconURL: bot.config.clients.logo});
        
        const maxVol = bot.config.opt.maxVol;

        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({ embeds: [Embed.setDescription(`Aucune musique en cours de lecture... ❌`)], ephemeral: false });
    
        const vol = interaction.options.getNumber('vol');
    
        if (queue.volume === vol) return interaction.reply({ embeds: [Embed.setDescription(`Le volume que vous souhaitez modifier est déjà celui en cours"... ❌`)], ephemeral: false });
    
        if (vol < 0 || vol > maxVol) return interaction.reply({ embeds: [Embed.setDescription(`Le nombre spécifié n'est pas valide. Entrez un nombre entre **1** et **${maxVol}**"... ❌`)], ephemeral: false });
    
        const success = queue.setVolume(vol);
    
        return interaction.reply({ embeds: [Embed.setDescription(success ? `Le volume à été modifier par **${vol}**/**${maxVol}**% 🔊` : `Quelque chose s'est mal passé"... ❌`)], ephemeral: false });
    }
}

module.exports = command