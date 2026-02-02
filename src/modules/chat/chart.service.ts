import Conversation from "./models/conversation.model.js"
import Message from "./models/messages.model.js"

export const createOrGetConversation = async (
    userId: string,
    otherUserId: string
) => {
    let convo = await Conversation.findOne({
        participants: { $all: [userId, otherUserId] }
    })

    if(!convo) {
        convo = await Conversation.create({
            participants: [userId, otherUserId]
        })
    }

    return convo
};

export const SendMessage = async (
    conversationId: string,
    senderId: string,
    content: string
) => {
    const message = await Message.create({
        conversation: conversationId,
        sender: senderId,
        content
    })

    return message
};

export const getMessages = async (conversationId: string) => {
    return Message.find({ conversation: conversationId })
    .populate("sender", "name role")
    .sort({ createdAt: 1 })
};