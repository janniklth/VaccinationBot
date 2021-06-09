module.exports = {
    'help': {
        description: 'Shows the list of commands or help on specified command.',
        format: 'help [command-name]'
    },
    'ping': {
        description: 'Checks connectivity with discord\'s servers.',
        format: 'ping'
    },
    'say': {
        aliases: ['repeat'],
        description: 'Repeats whatever is said.',
        format: 'say <message>'
    },
    'web': {
        description: 'Testing webscraping and output to the console.',
        format: 'web'
    },
    'dm': {
        description: 'Sends a private Message to you',
        format: 'dm'
    },
    'admin': {
        description: 'Just for admins.',
        format: 'admin <more admin commands>'
    }
}