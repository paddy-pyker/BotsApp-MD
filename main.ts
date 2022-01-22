import { Boom } from "@hapi/boom"
import makeWASocket, { DisconnectReason, delay, useSingleFileAuthState} from "@adiwajshing/baileys"
import { join } from 'path';
const fs = require('fs')
const chalk = require('chalk');
const wa = require('./core/helper')


const { state, saveState } = useSingleFileAuthState('./auth_info_multi.json')

// start a connection 
const startSock = () => {
    
    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state
    })

    var commandHandler = new Map()
    var moduleFiles = fs.readdirSync(join(__dirname, 'modules')).filter((file) => file.endsWith('.ts'))
    var moduleSuccess = true
    for (var file of moduleFiles) {
        try {
            const command = require(join(__dirname, 'modules', `${file}`));
            console.log(
                chalk.magentaBright("[INFO] Successfully imported module"),
                chalk.cyanBright.bold(`${file}`)
            )
            commandHandler.set(command.name, command);
        } catch (error) {
            moduleSuccess = false
            console.log(
                chalk.blueBright.bold("[INFO] Could not import module"),
                chalk.redBright.bold(`${file}`)
            )
            console.log(`[ERROR] `, error);
            process.exit(-1)
        }
    }

    if(moduleSuccess) console.log(chalk.green.bold("[INFO] All Plugins Installed Successfully. The bot is ready to use."))
       else console.log(chalk.red.bold("[ERROR] Some plugins weren't installed"))
     
       

    const sendMessageWTyping = async(msg, jid) => {
        await sock.presenceSubscribe(jid)
        await delay(500)

        await sock.sendPresenceUpdate('composing', jid)
        await delay(2000)

        await sock.sendPresenceUpdate('paused', jid)

        await sock.sendMessage(jid, msg)
    }
    
    sock.ev.on('messages.upsert', async m => {
           
        const chat = m.messages[0]
        const sender = chat.key.remoteJid
        const groupMetaData = sender.endsWith("@g.us") ? await sock.groupMetadata(sender) : ''

        if(chat.key.fromMe || m.type !== 'notify') return

        var BotsApp = wa.resolve(chat,sock, groupMetaData);   
        
        if(BotsApp.isCmd){

        console.log('replying to', chat.key.remoteJid)
        await sock.sendReadReceipt(chat.key.remoteJid, chat.key.participant, [chat.key.id])
        await sendMessageWTyping({ text: 'it worked' }, chat.key.remoteJid)
        
        }  
    })

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if(connection === 'close') {
            // reconnect if not logged out
            if((lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                startSock()
            } else {
                console.log('connection closed')
            }
        }
        
        console.log('connection update', update)
    })
    // listen for when the auth credentials is updated
    sock.ev.on('creds.update', saveState)

    return sock
}

startSock()