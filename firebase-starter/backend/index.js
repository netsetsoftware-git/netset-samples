const express = require('express');
const cors = require('cors');
const admin = require('./firebase-admin');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/auth/google', async (req, res) => {
    const authData = req.body;
  
    console.log(authData, "authDataauthDataauthData")
    const idToken = authData._tokenResponse.idToken
    console.log(idToken)
    try {
      // Verify the ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log('Decoded Token:', decodedToken);
  
      // Access user details
      const uid = decodedToken.uid;
      const email = decodedToken.email;
  
      res.status(200).json({ message: 'User authenticated', uid, email });
    } catch (error) {
      console.error('Error verifying ID token:', error.message);
      res.status(401).json({ error: 'Unauthorized' });
    }
  });

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
