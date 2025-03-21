const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5100;

// Middleware
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// ✅ Fix 404 error for favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Routes
const authRoutes = require('./src/users/user.route.js');
const productRoutes=require('./src/products/products.route.js')
const reviewRoutes=require('./src/reviews/reviews.router.js')

app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes)
app.use("/api/reviews",reviewRoutes);
console.log("Auth routes registered");

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB is successfully connected..");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

main();

// Root route
app.get("/", (req, res) => {
    res.send('Hello Dev!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
