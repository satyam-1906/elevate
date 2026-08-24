const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// List of authorized admin emails
const ADMIN_EMAILS = [
  'bt25cse159@iiitn.ac.in',
  ...(process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim().toLowerCase()) : [])
];

exports.googleLogin = async (req, res) => {
  try {
    const { token, role } = req.body; // frontend passes the google token and requested role string (e.g. 'admin' or 'student')
    
    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;
    
    // Domain Check
    if (!email.endsWith('@iiitn.ac.in')) {
      return res.status(403).json({ error: 'Access denied. Please use your @iiitn.ac.in email address.' });
    }
    
    const normalizedEmail = email.toLowerCase();
    const isAuthorizedAdmin = ADMIN_EMAILS.includes(normalizedEmail);

    // Check if user exists
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      // First time login - Create user
      user = await User.create({
        email: normalizedEmail,
        name,
        picture,
        role: isAuthorizedAdmin ? 'admin' : (role === 'admin' ? 'admin' : 'student')
      });
    } else {
      // If user is in the authorized admin list, upgrade/ensure admin role
      if (isAuthorizedAdmin && user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
      }

      // If user exists, but they tried to log in on the admin portal when they are a student
      if (role === 'admin' && user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. You do not have admin privileges.' });
      }
    }
    
    // Generate custom JWT token for our backend
    const authToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '7d' }
    );
    
    return res.status(200).json({
      message: 'Login successful',
      token: authToken,
      user
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(500).json({ error: 'Internal server error during authentication.' });
  }
};
