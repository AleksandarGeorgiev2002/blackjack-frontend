const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User');
const router = express.Router();

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a unique token
        const token = crypto.randomBytes(32).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'myEmail@gmail.com', 
                pass: 'myEmailPassword', 
            },
        });

        // Send the email
        const resetLink = `http://localhost:3000/reset-password?token=${token}`;
        await transporter.sendMail({
            to: email,
            from: 'your-email@gmail.com',
            subject: 'Password Reset',
            html: `<p>You requested a password reset</p>
                   <p>Click this <a href="${resetLink}">link</a> to reset your password.</p>`,
        });

        res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
});

module.exports = router;
