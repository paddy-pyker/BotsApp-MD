export
const { MessageType } = require("@adiwajshing/baileys");
const inputSanitization = require("../sidekick/input-sanitization");
const String = require("../lib/db");
const REPLY = String.promote;

module.exports = {
    name: "promote",
    description: REPLY.DESCRIPTION,
    extendedDescription: REPLY.EXTENDED_DESCRIPTION,
    async handle(client, chat, BotsApp, args) {
        try {
            if (!BotsApp.isGroup) {
                await client.sendMessage(
                    BotsApp.chatId,
                    REPLY.NOT_A_GROUP,
                    MessageType.text
                );
                return;
            }
            if (!BotsApp.isBotGroupAdmin) {
                await client.sendMessage(
                    BotsApp.chatId,
                    REPLY.BOT_NOT_ADMIN,
                    MessageType.text
                );
                return;
            }
            if (!BotsApp.isReply && typeof args[0] == "undefined") {
                await client.sendMessage(
                    BotsApp.chatId,
                    REPLY.MESSAGE_NOT_TAGGED,
                    MessageType.text
                );
                return;
            }
            const reply = chat.message.extendedTextMessage;

            var contact

            if (BotsApp.isReply) {
                 contact = reply.contextInfo.participant.split("@")[0];
            } else {
                 contact = await inputSanitization.getCleanedContact(
                    args,
                    client,
                    BotsApp
                );
            }

            var admin = false;
            var isMember = await inputSanitization.isMember(
                contact,
                BotsApp.groupMembers
            );
            for (const index in BotsApp.groupMembers) {
                if (contact == BotsApp.groupMembers[index].jid.split("@")[0]) {
                    if (BotsApp.groupMembers[index].isAdmin) {
                        admin = true;
                    }
                }
            }
            if (isMember) {
                if (!admin == true) {
                    const arr = [contact + "@s.whatsapp.net"];
                    client.groupMakeAdmin(BotsApp.chatId, arr);
                    await client.sendMessage(
                        BotsApp.chatId,
                        "*" + contact + " promoted to admin*",
                        MessageType.text
                    );
                } else {
                    client.sendMessage(
                        BotsApp.chatId,
                        "*" + contact + " is already an admin*",
                        MessageType.text
                    );
                }
            }
            if (!isMember) {
                if (contact === undefined) {
                    return;
                }

                await client.sendMessage(
                    BotsApp.chatId,
                    REPLY.PERSON_NOT_IN_GROUP,
                    MessageType.text
                );
                return;
            }
        } catch (err) {
            if (err === "NumberInvalid") {
                await inputSanitization.handleError(
                    err,
                    client,
                    BotsApp,
                    "```Invalid number ```" + args[0]
                );
            } else {
                await inputSanitization.handleError(err, client, BotsApp);
            }
        }
    },
};
