export
const { MessageType } = require("@adiwajshing/baileys");
const Strings = require("../lib/db");
const inputSanitization = require("../sidekick/input-sanitization");
const config = require("../config");
const TRANSMIT = require('../core/transmission')
const HELP = Strings.help;
const format = require("python-format-js");


module.exports = {
    name: "help",
    description: HELP.DESCRIPTION,
    extendedDescription: HELP.EXTENDED_DESCRIPTION,
    demo: {isEnabled: false},
    async handle(client, chat, BotsApp, args, commandHandler) {
        var helpMessage = ""
        try {
            var prefixRegex = new RegExp(config.PREFIX, "g");
            // @ts-ignore
            var prefixes = /\/\^\[(.*)+\]\/g/g.exec(prefixRegex)[1];
            if(!args[0]){
                 helpMessage = HELP.HEAD;
                commandHandler.forEach(element => {
                    helpMessage += HELP.TEMPLATE.format(prefixes[0] + element.name, element.description);
                });
                await TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{text:helpMessage}).catch(err => inputSanitization.handleError(err, client, BotsApp));
                return;
            }
             helpMessage = HELP.COMMAND_INTERFACE;
            var command = commandHandler.get(args[0]);
            if(command){
                var triggers = " | "
                prefixes.split("").forEach(prefix => {
                    triggers += prefix + command.name + " | "
                });

                if(command.demo.isEnabled) {
                    var buttons = [];
                    helpMessage += HELP.COMMAND_INTERFACE_TEMPLATE.format(triggers, command.extendedDescription) + HELP.FOOTER;
                    if(command.demo.text instanceof Array){
                        for (var i in command.demo.text){
                            var button = {
                                buttonId: 'id' + i,
                                buttonText: {displayText: command.demo.text[i]},
                                type: 1
                            }
                            buttons.push(button);
                        }
                    }else{
                        buttons.push({buttonId: 'id1', buttonText: {displayText: command.demo.text}, type: 1});
                    }
                    const buttonMessage = {
                        contentText: helpMessage,
                        buttons: buttons,
                        headerType: 1
                    }
                    return await TRANSMIT.sendMessageWTyping(client,BotsApp.chat,buttonMessage).catch(err => inputSanitization.handleError(err, client, BotsApp));

                }

                helpMessage += HELP.COMMAND_INTERFACE_TEMPLATE.format(triggers, command.extendedDescription);
                return await TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{text:helpMessage}).catch(err => inputSanitization.handleError(err, client, BotsApp));

            }
            await TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{text:HELP.COMMAND_INTERFACE + "```Invalid Command. Check the correct name from```  *.help*  ```command list.```"}).catch(err => inputSanitization.handleError(err, client, BotsApp));
            client.sendMessage(BotsApp.chatId, HELP.COMMAND_INTERFACE + "```Invalid Command. Check the correct name from```  *.help*  ```command list.```", MessageType.text).catch(err => inputSanitization.handleError(err, client, BotsApp));
        } catch (err) {
            await inputSanitization.handleError(err, client, BotsApp);
        }
    },
};
