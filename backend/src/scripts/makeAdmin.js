require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const emailToPromote = process.argv[2] || 'bt25cse159@iiitn.ac.in';

async function makeAdmin() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGO_URI is not set in .env');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const user = await User.findOneAndUpdate(
      { email: emailToPromote.toLowerCase().trim() },
      { $set: { role: 'admin' } },
      { returnDocument: 'after', upsert: false }
    );

    if (user) {
      console.log(`Successfully updated ${user.email} role to: ${user.role}`);
    } else {
      console.log(`No existing user record found for ${emailToPromote}. The user will automatically be granted the admin role upon first login.`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error updating user role:', error);
    process.exit(1);
  }
}

makeAdmin();
