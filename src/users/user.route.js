const express = require('express');
const User = require('./user.model');
const bcrypt = require('bcrypt');
const generateToken = require('../middleware/generateToken');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// ✅ Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create new user
        const user = new User({ email, username, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Login endpoint (Fixed)
router.post('/login', async (req, res) => {
    try {
        console.log("Received login request:", req.body);  // Log incoming request

        const { email, password } = req.body;


        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Chser exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const token = await generateToken(user._id)

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }
        )

        res.status(200).json({
            message: "Login successful", token, user: {
                _id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession
            }
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//all users 
router.get("/users", verifyToken, async (req, res) => {
    res.send({ message: "Protected users" })
})

//logout endpoint
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send({ message: 'logged out successfully' });
})

//delete a user 
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' })
        }
        res.status(200).send({ message: 'user deleted successfully' })
    }
    catch (error) {
        console.error("Error delecting user", error);
        res.status(500).send({ message: "Error deleting user", })
    }
})

//get all users
router.get('/user', async (req, res) => {
    try {
        console.log("Fetching users...");
        const users = await User.find({}, 'id email role').sort({ createdAt: -1 });
        res.status(200).send(users);
    } catch (error) {
        console.error("Error fetching users", error);
        res.status(500).send({ message: "Error fetching users" });
    }
});
//update user
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' })
        }
        res.status(200).send({ message: 'User role updated successfully', user })
    }
    catch (error) {
        console.error("Error updating user role", error);
        res.status(500).send({ message: "Error updating user role", })
    }
})

//edit or update profile
router.patch('/edit-profile', async (req, res) => {
    try {
        const { userId, username, profileImage, bio, profession } = req.body;
        if (!userId) {
            return res.status(400).send({ message: "User ID is required" })
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send({ message: "user not found" })
        }
        //update profile
        if (username !== undefined) user.username = username;
        if (profileImage !== undefined) user.profileImage = profileImage;
        if (bio !== undefined) user.bio = bio;
        if (profession !== undefined) user.profession = profession;
        await user.save();
        res.status(200).send({
            message: "profile updated successfully", 
            user: {
                _id: user._id,
                username: user.username,

                email: user.email,
                profileImage: user.profileImage,
               
                bio: user.bio,
                profession: user.profession,
                role: user.role
               
            }
        })
    }
    catch (error) {
        console.error("Error updating user role", error)
        res.status(500).send({ message: "Error updating user role", })

    }
})

module.exports = router;
