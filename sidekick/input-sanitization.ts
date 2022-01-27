const chalk = require("chalk");
const TRANSMIT = require('../core/transmission')

exports.handleError = async(err, client, BotsApp, customMessage =
    "```Oops! Something went wrong😥️ ``` \n You request didn't complete successfully") => {
    console.log(chalk.redBright.bold("[ERROR] " + err))
    await client.sendMessage(client.user.id, {text: err})
    await TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{text:customMessage})
}


