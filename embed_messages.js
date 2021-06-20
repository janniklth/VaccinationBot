const { Client, MessageEmbed, DiscordAPIError, MessageReaction } = require('discord.js');
const config = require('./configs/config');
const fs = require('fs');


// create embed
var test_embed = new MessageEmbed()
    .setTitle("Impfstoff auswählen!")
    .setDescription('Klicke auf die Zahlen um die Benachrichtigung für den jeweiligen Impfstoff einzustellen!')
    .addField("Übersicht \n", "1️⃣ ➔ BionTec/Pfizer \n 2️⃣ ➔ Moderna \n 3️⃣ ➔ AstraZeneca \n 4️⃣ ➔ Johnson & Johnson")
    .setColor('BLUE');



// export all embeds
exports.lol = test_embed;