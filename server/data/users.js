const bcrypt = require('bcryptjs');

let users = [
  {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@shop.com',
    password: bcrypt.hashSync('Admin@123', 10),
    role: 'admin',
    wishlist: [],
    recentlyViewed: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user-001',
    name: 'Demo User',
    email: 'user@shop.com',
    password: bcrypt.hashSync('User@123', 10),
    role: 'user',
    wishlist: [],
    recentlyViewed: [],
    createdAt: new Date().toISOString(),
  },
];

module.exports = users;
