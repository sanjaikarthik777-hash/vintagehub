const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const SECRET = 'MOCK_SECRET_KEY';

// Load Mock Database
const productsPath = path.join(__dirname, 'data', 'products.json');
let products = [];
try {
    const data = fs.readFileSync(productsPath, 'utf8');
    products = JSON.parse(data);
} catch (e) {
    console.error("No products data found, run generateCatalog.js");
}

// ---------------- AUTH ROUTES ----------------
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@shop.com' && password === 'admin') {
        const token = jwt.sign({ id: 1, role: 'admin' }, SECRET, { expiresIn: '1d' });
        return res.json({ token, user: { id: 1, email, role: 'admin', name: 'Admin User' } });
    }
    const token = jwt.sign({ id: 2, role: 'user' }, SECRET, { expiresIn: '1d' });
    return res.json({ token, user: { id: 2, email, role: 'user', name: 'Test User' } });
});

app.post('/api/auth/register', (req, res) => {
    const { email, name } = req.body;
    const token = jwt.sign({ id: Date.now(), role: 'user' }, SECRET, { expiresIn: '1d' });
    return res.json({ token, user: { id: Date.now(), email, role: 'user', name } });
});

// ---------------- PRODUCT ROUTES ----------------
app.get('/api/products', (req, res) => {
    let { category, gender, search, limit = 20, page = 1, sort } = req.query;
    
    let result = products;

    if (category) {
        result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (gender) {
        result = result.filter(p => p.gender.toLowerCase() === gender.toLowerCase() || p.gender === 'Unisex');
    }
    if (search) {
        result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
    }

    if (sort === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResult = result.slice(startIndex, endIndex);

    res.json({
        total: result.length,
        page: parseInt(page),
        totalPages: Math.ceil(result.length / limit),
        data: paginatedResult
    });
});

app.get('/api/products/highlights', (req, res) => {
    const trending = products.filter(p => p.tags.includes('Trending')).slice(0, 10);
    const bestSellers = products.filter(p => p.tags.includes('Best Seller')).slice(0, 10);
    const newArrivals = products.filter(p => p.tags.includes('New Arrival')).slice(0, 10);

    res.json({ trending, bestSellers, newArrivals });
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    // Suggest somewhat similar items
    const similar = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    res.json({ product, similar });
});


// ---------------- ORDERS / CART ----------------
app.post('/api/orders/checkout', (req, res) => {
    const { items, address } = req.body;
    // Mock processing timeout
    setTimeout(() => {
        res.json({ 
            success: true, 
            orderId: 'ORD' + Math.floor(Math.random() * 1000000), 
            message: 'Payment mock successful' 
        });
    }, 1500);
});

// ---------------- ADMIN ROUTES ----------------
app.get('/api/admin/stats', (req, res) => {
    // Generate some fake stats
    res.json({
        totalRevenue: 24500.50,
        orders: 142,
        activeUsers: 840,
        recentOrders: [
            { id: '#ORD213', user: 'johndoe@email.com', amount: 120.5, status: 'Shipped' },
            { id: '#ORD214', user: 'sarann@email.com', amount: 45.0, status: 'Processing' },
        ]
    });
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
