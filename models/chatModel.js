import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
    sender: { type: String, enum: ['User', 'Bot'], required: true },
    message: { type: String, required: true },
    sources: [String]
});

const ChatSchema = new Schema({
    chat_name: String,
    messages: [MessageSchema],
}, { timestamps: true });

export default model('Chat', ChatSchema);