const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "resume",
        this.description = "Permets de relancer la musique.",
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
    
        const success = queue.setPaused(false);
    
        return interaction.reply({ embeds: [Embed.setDescription(success ? `Musique actuelle ${queue.current.title} a repris ✅` : `Quelque chose s'est mal passé... ❌`)], ephemeral: false });
    }
}

module.exports = command