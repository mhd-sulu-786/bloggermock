const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const User = require('./models/users');
const Media = require('./models/media');

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/blogger', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Routes

// Root route
app.get('/', (req, res) => {
    res.send("SERVER Running...");
});

// User registration route
app.post('/register', async (req, res) => {
    const { name, password, dateofbirth } = req.body;

    try {
        const newUser = new User({ name, password, dateofbirth });
        await newUser.save();
        res.status(200).json({ message: "Success", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Failed to register user", error: error.message });
    }
});

// User login route
app.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name, password });
        if (user) {
            res.status(200).json({ message: 'Success', userId: user._id });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// Post media route
app.post('/postmedia', async (req, res) => {
    const { username, text, comments, image, userId } = req.body;

    if (!username || !text || !image) {
        return res.status(400).json({ message: "Username, text, and image are required." });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newMedia = new Media({ username, text, comments, image, userId });
        await newMedia.save();

        user.media.push(newMedia._id);
        await user.save();

        res.status(200).json({ message: "Media posted successfully", media: newMedia });
    } catch (error) {
        console.error("Error posting media:", error);
        res.status(500).json({ message: "Failed to post media", error: error.message });
    }
});

// Get all media route
app.get('/media', async (req, res) => {
    try {
        const medias = await Media.find();
        res.status(200).json(medias);
    } catch (error) {
        console.error("Error fetching media:", error);
        res.status(500).json({ message: "Failed to fetch media", error: error.message });
    }
});

// Get media by username route
app.get('/ourmedia/:id', async (req, res) => {
    const username = req.params.id;

    try {
        const medias = await Media.find({ username });
        res.status(200).json(medias);
    } catch (error) {
        console.error("Error fetching user's media:", error);
        res.status(500).json({ message: "Failed to fetch user's media", error: error.message });
    }
});

// Update user profile route
app.put('/updateprofile/:id', async (req, res) => {
    const { name, password, dateofbirth } = req.body;
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name || user.name;
        user.password = password || user.password;
        user.dateofbirth = dateofbirth || user.dateofbirth;
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Failed to update profile", error: error.message });
    }
});

// Update media route
app.put('/ourupdatemedia/:id', async (req, res) => {
    const { username, text, comments, image } = req.body;
    const mediaId = req.params.id;

    try {
        const media = await Media.findById(mediaId);
        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }

        media.username = username || media.username;
        media.text = text || media.text;
        media.comments = comments || media.comments;
        media.image = image || media.image;
        await media.save();

        res.status(200).json({ message: "Media updated successfully", media });
    } catch (error) {
        console.error("Error updating media:", error);
        res.status(500).json({ message: "Failed to update media", error: error.message });
    }
});

// Server listener
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
