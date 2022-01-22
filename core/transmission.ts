import {delay} from "@adiwajshing/baileys";

exports.sendMessageWTyping = async(sock,chat,msg) => {

    console.log('replying to', chat.key.remoteJid)

    await sock.sendReadReceipt(chat.key.remoteJid, chat.key.participant, [chat.key.id])

    await sock.presenceSubscribe(chat.key.remoteJid)
    await delay(500)

    await sock.sendPresenceUpdate('composing', chat.key.remoteJid)
    await delay(2000)

    await sock.sendPresenceUpdate('paused', chat.key.remoteJid)

    await sock.sendMessage(chat.key.remoteJid, msg)
}
