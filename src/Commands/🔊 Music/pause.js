const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "pause",
        this.description = "Permets de mettre la musique en pause.",
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
    
        const success = queue.setPaused(true);
    
        return interaction.reply({ embeds: [Embed.setDescription(success ? `Musique actuelle ${queue.current.title} mise en pause ✅` : `Quelque chose s'est mal passé... ❌`)], ephemeral: false });
    }
}

module.exports = command