const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "skip",
        this.description = "Permets de passer la musique actuelle.",
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
    
        const success = queue.skip();
    
        return interaction.reply({ embeds: [Embed.setDescription(success ? `Musique actuelle ${queue.current.title} passer ✅` : `Quelque chose s'est mal passé... ❌`)], ephemeral: false });
    }
}

module.exports = command