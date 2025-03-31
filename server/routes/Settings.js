const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middlewares/Auth");   //  Fixed middleware import
const bcrypt = require("bcryptjs");

//  Get User Settings
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ 
            success: true, 
            user
        });
    } catch (error) {
        console.error("Error fetching user settings:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//  Update User Settings
router.put("/", auth, async (req, res) => {
    const { firstName, lastName, email, password, newPassword, confirmPassword } = req.body;

    try {
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        //  Check if the email is being updated
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ success: false, message: "Email already in use" });
            }
            user.email = email;
        }

        //  Update First and Last Name
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;

        //  Update Password (if provided)
        if (password && newPassword) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            
            if (!isPasswordCorrect) {
                return res.status(401).json({ success: false, message: "Incorrect current password" });
            }

            if (newPassword !== confirmPassword) {
                return res.status(400).json({ success: false, message: "New passwords do not match" });
            }

            user.password = await bcrypt.hash(newPassword, 10);
        }

        // Save updated user data
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "User settings updated successfully" 
        });

    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
