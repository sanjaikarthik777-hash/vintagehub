const express = require('express');
const router = express.Router();
const products = require('../data/products');

// GET /api/products — with filtering, sorting, pagination, search
router.get('/', (req, res) => {
  let result = [...products];

  const {
    category, gender, minPrice, maxPrice, rating,
    size, color, tag, search, sort, page = 1, limit = 24, brand
  } = req.query;

  if (category) result = result.filter(p => p.category === category.toLowerCase());
  if (gender) result = result.filter(p => p.gender === gender || p.gender === 'Unisex');
  if (brand) result = result.filter(p => p.brand === brand);
  if (minPrice) result = result.filter(p => p.finalPrice >= Number(minPrice));
  if (maxPrice) result = result.filter(p => p.finalPrice <= Number(maxPrice));
  if (rating) result = result.filter(p => p.rating >= Number(rating));
  if (size) result = result.filter(p => p.sizes.includes(size));
  if (color) result = result.filter(p => p.colors.some(c => c.toLowerCase().includes(color.toLowerCase())));
  if (tag) result = result.filter(p => p.tags.includes(tag.toLowerCase()));
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some(t => t.includes(q))
    );
  }

  // Sorting
  if (sort === 'price_asc') result.sort((a, b) => a.finalPrice - b.finalPrice);
  else if (sort === 'price_desc') result.sort((a, b) => b.finalPrice - a.finalPrice);
  else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  else if (sort === 'newest') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  else if (sort === 'popular') result.sort((a, b) => b.reviewsCount - a.reviewsCount);

  const total = result.length;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const paginated = result.slice((pageNum - 1) * limitNum, pageNum * limitNum);

  res.json({
    products: paginated,
    total,
    page: pageNum,
    pages: Math.ceil(total / limitNum),
    limit: limitNum,
  });
});

// GET /api/products/search?q= — autocomplete suggestions
router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q || q.length < 2) return res.json({ suggestions: [] });

  const query = q.toLowerCase();
  const seen = new Set();
  const suggestions = [];

  for (const p of products) {
    if (suggestions.length >= 8) break;
    const terms = [p.name, p.category, p.brand, ...p.tags];
    for (const term of terms) {
      if (term.toLowerCase().includes(query) && !seen.has(term)) {
        seen.add(term);
        suggestions.push({ text: term, type: term === p.name ? 'product' : 'category', id: p.id });
        break;
      }
    }
  }

  res.json({ suggestions });
});

// GET /api/products/featured — homepage sections
router.get('/featured', (req, res) => {
  const bestSellers = [...products]
    .sort((a, b) => b.rating * b.reviewsCount - a.rating * a.reviewsCount)
    .slice(0, 20);

  const trending = products.filter(p => p.tags.includes('trending')).slice(0, 20);
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 20);

  res.json({ bestSellers, trending, newArrivals });
});

// GET /api/products/:id — single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found.' });

  // Similar products: same category, different id
  const similar = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);

  res.json({ product, similar });
});

module.exports = router;
