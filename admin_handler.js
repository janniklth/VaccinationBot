const config = require('./configs/config');
const roleHandler = require('./role_handler');

module.exports = {
    execute_admin_commands: async function(client, message, args) {
        console.log("admin_handler: " + args);

        // check if there is an additional admin command
        if (args.length == 0) {
            message.reply("You have to specify an admin command!");
            return;
        }

        // decide about the first keyword/command
        switch (args[0]) {

            // "send" -> send role reaction messages other stuff like that
            case "send":
                // check if there is an additional send command
                if (args.length == 1) {
                    message.reply("You have to specify an additional send command!");
                    return;
                }

                // decide about the send command
                switch (args[1]) {

                    // selection
                    case "selection":

                        // check if there is an additional command
                        if (args.length == 2) {
                            message.reply("You have to specify an additional selection command!");
                            return;
                        }

                        switch (args[2]) {
                            // vaccinationType
                            case "vaccinationType":
                                roleHandler.send_vaccionationType(message, client);
                                break;

                                // vaccinationPlace
                            case "vaccinationPlace":
                                message.reply("Place");
                                break;

                            default:
                                message.reply("This is not an selection command!");
                                break;
                        }
                        break;

                    case "dm_role":
                        let actual_guild = client.guilds.cache.get('289889834170843136');
                        actual_guild.members.cache.forEach(member => {
                            console.log(" => " + member.user.username);
                        });

                        let role_members = message.guild.roles.cache.get('853023191052451840').members.map(m => m.user);
                        console.log(role_members);

                        for (let index = 0; index < role_members.length; index++) {
                            role_members[index].send("HI");

                        }


                        break;


                    default:
                        message.reply("This is not an  send command!");
                        break;
                }

                console.log("Send");

                break;

            default:
                message.reply("This is not an admin command!");
                break;
        }



    }
}