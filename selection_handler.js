const { Client, MessageEmbed, DiscordAPIError, MessageReaction } = require('discord.js');
const config = require('./config');
const fs = require('fs');
const reactionMessages = JSON.parse(fs.readFileSync('./data/reactionRoleMessages.json', 'utf-8'));

module.exports = {

    // sends selection mesaage/embed for vaccination type
    send_vaccionationType: async function(message, client) {

        // create embed
        var embed = new MessageEmbed()
            .setTitle("Impfstoff auswählen!")
            .setDescription('Klicke auf die Zahlen um die Benachrichtigung für den jeweiligen Impfstoff einzustellen!')
            .setColor('BLUE');

        // send embed and add reactions
        var sendedEmbed = await message.channel.send(embed);
        await sendedEmbed.react('1️⃣');
        await sendedEmbed.react('2️⃣');
        await sendedEmbed.react('3️⃣');
        await sendedEmbed.react('4️⃣');

        // save embed to .json
        var toSave = { name: "vaccinationType_1", type: "vaccinationType", message_id: sendedEmbed.id }
        reactionMessages.reaction_msgs.push(toSave);
        fs.writeFileSync('./data/reactionRoleMessages.json', JSON.stringify(reactionMessages, null, 4));
    },

    // sends selection message/embed for vaccionation place
    send_vaccionationPlace: async function(message, client) {


    },

    role_add: async function(message, client) {

    },

    role_remove: async function(message, client) {

    }
}