const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Replace with your local MongoDB connection string
const MONGO_URI = 'mongodb://127.0.0.1:27017/travel_account_db';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB locally');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // Store hashed password
  name: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

// Define Expense Schema
const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, default: "Misc" },
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Travel & Account Management Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
  Instructions:
  1. Make sure MongoDB is installed and running locally on your machine.
  2. Replace the MONGO_URI if your MongoDB is running on another port or user auth is required.
  3. Install dependencies with: npm install express mongoose cors
  4. Run server using: node server.js
  5. Implement authentication, API routes, and connect frontend to this backend.
*/

