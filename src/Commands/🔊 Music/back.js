const { EmbedBuilder } = require('discord.js');

class command {
    constructor() {
        this.name = "back",
        this.description = "Permets de revenir à l'ancienne musique.",
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
    
        if (!queue.previousTracks[1]) return interaction.reply({ embeds: [Embed.setDescription(`Il n'y avait pas de musique jouée avant... ❌`)], ephemeral: false });
    
        await queue.back();
    
        interaction.reply({ embeds: [Embed.setDescription(`Je joue l'ancien son ✅`)], ephemeral: false });
    }
}

module.exports = command