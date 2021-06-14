const { Client, MessageEmbed, DiscordAPIError, MessageReaction } = require('discord.js');
const config = require('./configs/config');
const fs = require('fs');
const reactionRoles = require('./configs/reactionRoles');
const reactionMessages = JSON.parse(fs.readFileSync('./data/reactionRoleMessages.json', 'utf-8'));


module.exports = {

    // sends selection mesaage/embed for vaccination type
    send_vaccionationType: async function(message, client) {
        //test 
        //console.log(typeof(reactionMessages.reaction_msgs[1].message_id));

        // create embed
        var embed = new MessageEmbed()
            .setTitle("Impfstoff auswählen!")
            .setDescription('Klicke auf die Zahlen um die Benachrichtigung für den jeweiligen Impfstoff einzustellen!')
            .addField("Übersicht \n", "1️⃣ ➔ BionTec/Pfizer \n 2️⃣ ➔ Moderna \n 3️⃣ ➔ AstraZeneca \n 4️⃣ ➔ Johnson & Johnson")
            .setColor('BLUE');

        // send embed and add reactions
        var sendedEmbed = await message.channel.send(embed);
        await sendedEmbed.react('1️⃣');
        await sendedEmbed.react('2️⃣');
        await sendedEmbed.react('3️⃣');
        await sendedEmbed.react('4️⃣');

        // save embed to .json
        var toSave = { type: "vaccinationType", id: "1", message_id: sendedEmbed.id }
        reactionMessages.reaction_msgs.push(toSave);
        fs.writeFileSync('./data/reactionRoleMessages.json', JSON.stringify(reactionMessages, null, 4));
    },

    // sends selection message/embed for vaccionation place
    send_vaccionationPlace: async function(message, client) {


    },

    role_add: async function(reaction, user, message) {
        for (let index = 0; index < reactionRoles.reactionRoles.length; index++) {
            let actual_reactionRole = reactionRoles.reactionRoles[index];
            if (message.type == actual_reactionRole.type && message.id == actual_reactionRole.id && reaction.emoji.name == actual_reactionRole.emoji) {
                let role_to_add = reaction.message.guild.roles.cache.find(role => role.id === actual_reactionRole.role_id);
                await reaction.message.guild.members.cache.get(user.id).roles.add(role_to_add);
                break;
            }
        }
    },

    role_remove: async function(reaction, user, message) {
        for (let index = 0; index < reactionRoles.reactionRoles.length; index++) {
            let actual_reactionRole = reactionRoles.reactionRoles[index];
            if (message.type == actual_reactionRole.type && message.id == actual_reactionRole.id && reaction.emoji.name == actual_reactionRole.emoji) {
                let role_to_add = reaction.message.guild.roles.cache.find(role => role.id === actual_reactionRole.role_id);
                await reaction.message.guild.members.cache.get(user.id).roles.remove(role_to_add);
                break;
            }
        }
    },

    role_message_embed: async function() {

    }
}