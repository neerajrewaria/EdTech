const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { cloudinaryConnect } = require("./config/cloudinary");
const cors =require('cors');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();
cloudinaryConnect();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Enable CORS for all origins (development only)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Import routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const courseRoutes = require('./routes/courseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const profileRoutes = require('./routes/profileRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const subSectionRoutes = require('./routes/subSectionRoutes');
const progressRoutes= require('./routes/courseProgress');
const resetpasswordRoutes=require('./routes/resetPassword');
// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/section', sectionRoutes);
app.use('/api/v1/subSection', subSectionRoutes);
app.use('/api/v1/progress', progressRoutes);
app.use('/api/v1/reset',resetpasswordRoutes);

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is up and listening on port ${PORT}`);
});