class BotsApp {
    mimeType: any;
    type: any;
    body: any;
    chatId: any;
    fromMe: any;
    owner: any;
    sender: any;
    isReply: any;
    replyMessageId: any;
    replyParticipant: any;
    replyMessage: any;
    isGroup: any;
    isPm: any;
    isImage: any;
    isReplyImage: any;
    imageCaption: any;
    isBotGroupAdmin: any;
    isGIF: any;
    isReplyGIF: any;
    isSticker: any;
    isReplySticker: any;
    isReplyAnimatedSticker: any;
    isVideo: any;
    isReplyVideo: any;
    isAudio: any;
    isReplyAudio: any;
    isSenderGroupAdmin: any;
    isSenderSUDO: any;
    isCmd: any;
    commandName: any;
    logGroup: any;
    groupName: any;
    groupMembers: any;
    groupAdmins: any;
    groupId: any;
    constructor(
        mimeType, type, isReply, body, isCmd, commandName, chatId, fromMe, owner, logGroup,
        isGroup, isPm, sender, groupName, groupMembers, groupAdmins, groupId, isBotGroupAdmin, isSenderGroupAdmin, isSenderSUDO, replyMessageId, replyMessage, 
        replyParticipant, isImage, isReplyImage, imageCaption, isGIF, isReplyGIF, isSticker, isReplySticker, isReplyVideo, isReplyAudio,
        isVideo, isAudio, isReplyAnimatedSticker) {
        this.mimeType = mimeType;
        this.type = type;
        this.body = body;
        this.chatId = chatId; // If PM, then the person's JID. If group, then the group's JID.
        this.fromMe = fromMe;
        this.owner = owner;
        this.sender = sender; // The person who sent the message in the group.
        this.isReply = isReply;
        this.replyMessageId = replyMessageId;
        this.replyParticipant = replyParticipant;
        this.replyMessage = replyMessage;
        this.isGroup = isGroup;
        this.isPm = isPm;
        this.isImage = isImage;
        this.isReplyImage = isReplyImage;
        this.imageCaption = imageCaption;
        this.isBotGroupAdmin = isBotGroupAdmin;
        this.isGIF = isGIF;
        this.isReplyGIF = isReplyGIF;
        this.isSticker = isSticker;
        this.isReplySticker = isReplySticker;
        this.isReplyAnimatedSticker = isReplyAnimatedSticker;
        this.isVideo = isVideo;
        this.isReplyVideo = isReplyVideo;
        this.isAudio = isAudio;
        this.isReplyAudio = isReplyAudio;
        this.isSenderGroupAdmin = isSenderGroupAdmin;
        this.isSenderSUDO = isSenderSUDO;
        this.isCmd = isCmd;
        this.commandName = commandName;
        this.logGroup = logGroup;
        this.groupName = groupName;
        this.groupMembers = groupMembers;
        this.groupAdmins = groupAdmins;
        this.groupId = groupId;
    }
}

module.exports = BotsApp;