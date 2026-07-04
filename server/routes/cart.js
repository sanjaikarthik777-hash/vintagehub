const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// In-memory cart store: { userId: [ {productId, quantity, size, color} ] }
const carts = {};

// GET /api/cart
router.get('/', authMiddleware, (req, res) => {
  const cart = carts[req.user.id] || [];
  res.json({ cart });
});

// POST /api/cart — add item
router.post('/', authMiddleware, (req, res) => {
  const { productId, quantity = 1, size, color, name, price, finalPrice, image, discount } = req.body;
  if (!productId) return res.status(400).json({ message: 'productId is required.' });

  if (!carts[req.user.id]) carts[req.user.id] = [];
  const cart = carts[req.user.id];

  const existing = cart.find(i => i.productId === productId && i.size === size && i.color === color);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity, size, color, name, price, finalPrice, image, discount });
  }

  res.json({ cart });
});

// PUT /api/cart/:productId — update quantity
router.put('/:productId', authMiddleware, (req, res) => {
  const { quantity, size, color } = req.body;
  const cart = carts[req.user.id] || [];
  const item = cart.find(i => i.productId === req.params.productId && i.size === size && i.color === color);

  if (!item) return res.status(404).json({ message: 'Item not in cart.' });
  if (quantity <= 0) {
    carts[req.user.id] = cart.filter(i => !(i.productId === req.params.productId && i.size === size && i.color === color));
  } else {
    item.quantity = quantity;
  }

  res.json({ cart: carts[req.user.id] });
});

// DELETE /api/cart/:productId
router.delete('/:productId', authMiddleware, (req, res) => {
  const { size, color } = req.query;
  if (!carts[req.user.id]) return res.json({ cart: [] });
  carts[req.user.id] = carts[req.user.id].filter(
    i => !(i.productId === req.params.productId && i.size === size && i.color === color)
  );
  res.json({ cart: carts[req.user.id] });
});

// DELETE /api/cart — clear cart
router.delete('/', authMiddleware, (req, res) => {
  carts[req.user.id] = [];
  res.json({ cart: [] });
});

module.exports = router;
