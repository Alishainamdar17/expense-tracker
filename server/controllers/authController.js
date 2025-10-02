// server/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Email configuration (using Gmail as example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendConfirmationEmail = async (email, name, isSignup = true) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: isSignup ? 'Welcome to Expense Tracker!' : 'Login Notification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>${isSignup ? 'Welcome to Expense Tracker!' : 'Login Successful'}</h2>
          <p>Hello ${name},</p>
          <p>${isSignup 
            ? 'Your account has been successfully created. You can now start tracking your expenses and income.' 
            : 'You have successfully logged into your Expense Tracker account.'
          }</p>
          <p>Happy budgeting!</p>
          <br>
          <p><small>If you did not ${isSignup ? 'create this account' : 'log in'}, please contact support immediately.</small></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // No authentication or authorization, just echo back
    res.status(201).json({
      message: 'User created successfully (no auth)',
      user: { name, email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // No authentication or authorization, just echo back
    res.json({
      message: 'Login successful (no auth)',
      user: { email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};