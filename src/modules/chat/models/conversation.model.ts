import mongoose, { Schema } from "mongoose";

const ConversationSchema = new Schema(
    {
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
        ],
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Conversation", ConversationSchema)