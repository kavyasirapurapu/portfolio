require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images) from the current directory
app.use(express.static(path.join(__dirname, '')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB successfully!'))
    .catch(err => console.error('❌ MongoDB connection error. Make sure MongoDB is running locally or check your connection string.\nError Details:', err.message));

// Define a Mongoose Schema and Model for Projects
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    liveLink: String,
    codeLink: String,
    video: String,
    icon: String,
    color1: String,
    color2: String
});
const Project = mongoose.model('Project', projectSchema);

// Define a Mongoose Schema and Model for Contact Messages
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// API endpoint to get all projects (and seed database if empty)
app.get('/api/projects', async (req, res) => {
    const defaultProjects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with modern UI, secure payment integration, and real-time inventory management.',
            tags: ['React', 'Node.js', 'MongoDB'],
            liveLink: 'https://example.com',
            codeLink: 'https://github.com',
            video: 'https://www.w3schools.com/html/mov_bbb.mp4',
            icon: 'shopping-bag',
            color1: '#8b5cf6',
            color2: '#3b82f6'
        },
        {
            title: 'Fitness Tracker',
            description: 'A dynamic web app for tracking daily workouts, visualizing progress with interactive charts, and goal setting.',
            tags: ['Vue.js', 'Firebase', 'Chart.js'],
            liveLink: 'https://example.com',
            codeLink: 'https://github.com',
            icon: 'activity',
            color1: '#10b981',
            color2: '#059669'
        },
        {
            title: 'Real-time Chat App',
            description: 'A fast and secure messaging application featuring private rooms, media sharing, and instant notifications.',
            tags: ['Socket.io', 'Express', 'React'],
            liveLink: 'https://example.com',
            codeLink: 'https://github.com',
            icon: 'message-square',
            color1: '#f59e0b',
            color2: '#d97706'
        }
    ];

    if (mongoose.connection.readyState !== 1) {
        console.log('MongoDB not connected, returning mock projects.');
        return res.status(200).json(defaultProjects);
    }

    try {
        let projects = await Project.find();
        
        // Seed database if empty
        if (projects.length === 0) {
            console.log('Seeding initial projects to database...');
            projects = await Project.insertMany(defaultProjects);
        }
        
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// API endpoint to handle contact form submissions
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Create and save the new message to the database
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        console.log(`📩 New message saved to database from ${name} (${email})`);
        res.status(200).json({ success: true, message: 'Message received and saved to database successfully!' });
    } catch (error) {
        console.error('Error saving message to database:', error);
        res.status(500).json({ error: 'Failed to save message on the server.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`Backend Server is running!`);
    console.log(`Access your portfolio at: http://localhost:${PORT}`);
    console.log(`========================================\n`);
});
