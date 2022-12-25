const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "progress",
        this.description = "Permets de voir la progression de la musique.",
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
    
        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();
    
        if (timestamp.progress == 'Infini') return interaction.reply({ embeds: [Embed.setDescription(`Jouer un live, pas de données à afficher 🎧`)], ephemeral: false });
    
        interaction.reply({ embeds: [Embed.setDescription(`${progress} (**${timestamp.progress}**%)`)], ephemeral: false });
    }
}

module.exports = command