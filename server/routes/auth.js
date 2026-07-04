const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const users = require('../data/users');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required.' });

    const exists = users.find(u => u.email === email);
    if (exists) return res.status(409).json({ message: 'Email already registered.' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashed,
      role: 'user',
      wishlist: [],
      recentlyViewed: [],
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me
const authMiddleware = require('../middleware/auth');
router.get('/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found.' });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

// PUT /api/auth/wishlist
router.put('/wishlist', authMiddleware, (req, res) => {
  const { productId } = req.body;
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found.' });

  const idx = user.wishlist.indexOf(productId);
  if (idx === -1) user.wishlist.push(productId);
  else user.wishlist.splice(idx, 1);

  res.json({ wishlist: user.wishlist });
});

// PUT /api/auth/recently-viewed
router.put('/recently-viewed', authMiddleware, (req, res) => {
  const { productId } = req.body;
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found.' });

  user.recentlyViewed = user.recentlyViewed.filter(id => id !== productId);
  user.recentlyViewed.unshift(productId);
  if (user.recentlyViewed.length > 10) user.recentlyViewed.pop();

  res.json({ recentlyViewed: user.recentlyViewed });
});

module.exports = router;
