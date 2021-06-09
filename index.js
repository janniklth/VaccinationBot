const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const token_config = require('./token')
const { web } = require('./help');
const commands = require('./help');
const webscraper = require('./webscraper');
const adminHandler = require('./admin_handler');
const token = require('./token');

let bot = new Client({
    fetchAllMembers: false, // Remove this if the bot is in large guilds or set it to false.
    presence: {
        status: 'online',
        activity: {
            name: `${config.prefix}help and impfsuche.de`,
            type: 'LISTENING'
        }
    }
});


bot.on('ready', () => {

    console.log(`Logged in as ${bot.user.tag}.`)
    bot.channels.cache.get(`851054960753508393`).send(`Hey, i'm online!`)

    setInterval(async testfunction => {
        var vaccinations = await webscraper.test_func();
        bot.channels.cache.get(`851054960753508393`).send(vaccinations)
    }, 60000)

});

bot.on('message', async message => {
            // Check for command
            console.log("Message received!")
            if (message.content.startsWith(config.prefix)) {
                let args = message.content.slice(config.prefix.length).split(' ');
                let command = args.shift().toLowerCase();

                switch (command) {

                    case 'ping':
                        let msg = await message.reply('Pinging...');
                        await msg.edit(`PONG! Message round-trip took ${Date.now() - msg.createdTimestamp}ms.`)
                        break;

                    case 'say':
                    case 'repeat':
                        if (args.length > 0)
                            message.channel.send(args.join(' '));
                        else
                            message.reply('You did not send a message to repeat, cancelling command.')
                        break

                    case 'web':
                        var testtext = await webscraper.test_func();
                        bot.channels.cache.get(`851054960753508393`).send(testtext);
                        break;

                    case 'dm':
                        message.author.send("Hi there! This is a direct message to u :)");
                        break;

                        /* Unless you know what you're doing, don't change this command. */
                    case 'help':
                        let embed = new MessageEmbed()
                            .setTitle('HELP MENU')
                            .setColor('GREEN')
                            .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
                            .setThumbnail(bot.user.displayAvatarURL());
                        if (!args[0])
                            embed
                            .setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
                        else {
                            if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
                                let command = Object.keys(commands).includes(args[0].toLowerCase()) ? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
                                embed
                                    .setTitle(`COMMAND - ${command}`)

                                if (commands[command].aliases)
                                    embed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
            embed
              .addField('DESCRIPTION', commands[command].description)
              .addField('FORMAT', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
          } else {
            embed
              .setColor('RED')
              .setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(embed);
        break;
    }

    
    // admin commands
    if (command.startsWith('admin')) {
      console.log("admin wants")
      if (message.member.roles.cache.some(role => role.name === config.admin_role)) {
        console.log("admin rights granted");
        adminHandler.execute_admin_commands(bot, message, args);
      }
      else {
        console.log("admin rights denied");
        message.reply("Permission denied! You're not an admin :(");
      }
    }
  }
});

require('./server')();
//bot.login(config.token);
bot.login(token.token);