const chalk = require("chalk");
const fs = require("fs");
const TRANSMIT = require('../core/transmission')

exports.handleError = async(err, client, BotsApp, customMessage =
    "```Oops! Something went wrong```\n You request didn't complete successfully") => {
    console.log(chalk.redBright.bold("[ERROR] " + err))
    await client.sendMessage(client.user.id, {text: err})
    await TRANSMIT.sendMessageWTyping(client,BotsApp.chat,{text:customMessage})
}

exports.pass_clearance = (chatID) => {
    const blacklist_numbers = JSON.parse(fs.readFileSync("blacklist.json", { encoding: 'utf-8' }))
    const no_of_blacklist = blacklist_numbers.length
    for (let i = 0;i< no_of_blacklist;i++){
        if(blacklist_numbers[i] === chatID) return false
    }
    return true
}

exports.deleteFiles = async (...locations) => {
    for (location of locations) {
        fs.unlink(location, (err) => {
            if (err) console.log(err);
            else {
                 console.log("\nDeleted file at: " + location);
            }
        });
    }
};

