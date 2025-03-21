const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true }, // ✅ Fixed `require` to `required`
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    profileImage: String,
    bio: { type: String, maxlength: 200 },
    profession: String
}, { timestamps: true }); // ✅ Automatically adds `createdAt` & `updatedAt`

// Password hashing middleware
userSchema.pre('save', async function (next) {
    const user = this;
    
    // ✅ If password is not modified, skip hashing
    if (!user.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = model('User', userSchema);
module.exports = User;
