const { betterAuth } = require('better-auth');
const { mongodbAdapter } = require('better-auth/adapters/mongodb');
const mongoose = require('mongoose');

export const auth = betterAuth({
  database: mongodbAdapter(mongoose.connection),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
});