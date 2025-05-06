import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10

const UserSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    chats: [{ type: Schema.Types.ObjectId, ref: 'Chat' }]
}, { timestamps: true });

UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export default model('User', UserSchema);
