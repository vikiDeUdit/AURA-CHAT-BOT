import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const __dirname = import.meta.dirname;
const app = express();
app.use(json());
app.use(cors({
    origin: ['*'],
    credentials: true
}));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

const PORT = process.env.PORT || 5007;
// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) {
//     console.error("Error: MONGO_URI is not defined in the environment variables.");
//     process.exit(1);
// }

// mongoose.connect(MONGO_URI)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.error("MongoDB connection error:", err));

// const authenticate = (req, res, next) => {
//     if (!req.cookies.token) return res.status(401).json({ message: 'Unauthorized' });

//     try {
//         const token = req.cookies.token;
//         req.user = jwt.verify(token, process.env.JWT_SECRET);
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({ message: 'Invalid token' });
//     }
// }

// app.get('/api/auth', authenticate, (req, res) => {
//     res.status(200).json({ message: 'Authenticated', user: req.user });
// })

// app.get('/api/auth/user', authenticate, async (req, res) => { 
//     const userId = req.user.id;

//     try {
//         const user = await User.findById(userId).select('-password').populate({
//             path: 'chats',
//             select: '_id',
//         });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.status(200).json({ user });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// })

// app.post('/api/auth/register', async (req, res) => {
//     try {
//         const exists = await User.exists({ email: req.body.email })
//         if (exists) {
//             return res.status(409).json({ message: 'User already exists' });
//         }

//         const user = new User(req.body);
//         await user.save();

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 1000 * 3600 });
//         return res.status(201).json({ message: 'User created successfully', user });
//     } catch (error) {
//         console.error(error);
//         if (err.code === 11000) {
//             return res.status(409).json({ message: 'User already exists' });
//         }
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

// app.post('/api/auth/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user || !(await user.comparePassword(password))) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 1000 * 3600 });

//         return res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// })

// app.post('/api/auth/logout', (_, res) => {
//     res.clearCookie('token');
//     return res.status(200).json({ message: 'Logout successful' });
// })

// app.post('/api/chat', authenticate, async (req, res) => {
//     const userId = req.user.id;

//     try {
//         const { messages } = req.body;
//         const newChat = await Chat.create({ messages });
//         await User.findByIdAndUpdate(userId, { $push: { chats: newChat._id } }, { new: true });
//         return res.status(201).json({ message: 'Chat saved successfully', chat: newChat });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// })

// app.get('/api/chat/:chatId', authenticate, async (req, res) => {
//     const chatId = req.params.chatId;
//     const userId = req.user.id;

//     try {
//         if (!mongoose.Types.ObjectId.isValid(chatId)) {
//             return res.status(400).json({ message: 'Invalid chat ID' });
//         }

//         const user = await User.findById(userId);
//         if (!user || !user.chats.includes(chatId)) {
//             return res.status(404).json({ message: 'Chat not found for this user' });
//         }

//         const chat = await Chat.findById(chatId)
//             .select('messages')
//             .lean();
//         if (!chat) {
//             return res.status(404).json({ message: 'Chat not found' });
//         }

//         return res.status(200).json({ chat });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// })

// app.post('/api/chat/:chatId', authenticate, async (req, res) => { })

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});