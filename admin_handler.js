const config = require('./configs/config');
const selectionHandler = require('./selection_handler');

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
                                selectionHandler.send_vaccionationType(message, client);
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

                    case "test":
                        message.reply("test test");
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