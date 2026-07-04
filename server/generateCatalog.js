const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const TARGET_COUNTS = {
    Shirts: 50,
    'T-Shirts': 60,
    Polos: 40,
    Kurtas: 50,
    Jackets: 40,
    Pants: 50,
    Jeans: 50,
    Shorts: 40,
    'Track Pants': 30,
    Skirts: 35,
    Leggings: 30,
    Shoes: 40,
    'Casual Shoes': 45,
    'Sports Shoes': 40,
    Sandals: 35,
    Loafers: 30,
    Heels: 35,
    Flats: 30,
    Sneakers: 50,
    Tops: 50,
    Blouses: 40,
    Dresses: 50,
    'Summer 2025': 30,
    'Festival Edit': 30,
    Workwear: 30,
    Featured: 30,
    'Best Sellers': 30,
    Trending: 30
};

const CATEGORY_GENDERS = {
    Shirts: ['Men', 'Unisex'],
    'T-Shirts': ['Men', 'Women', 'Unisex'],
    Polos: ['Men', 'Unisex'],
    Kurtas: ['Men', 'Women'],
    Jackets: ['Men', 'Women', 'Unisex'],
    Pants: ['Men', 'Women', 'Unisex'],
    Jeans: ['Men', 'Women'],
    Shorts: ['Men', 'Women'],
    'Track Pants': ['Men', 'Women', 'Unisex'],
    Skirts: ['Women'],
    Leggings: ['Women'],
    Shoes: ['Men', 'Women', 'Unisex'],
    'Casual Shoes': ['Men', 'Women', 'Unisex'],
    'Sports Shoes': ['Men', 'Women', 'Unisex'],
    Sandals: ['Men', 'Women', 'Unisex'],
    Loafers: ['Men', 'Unisex'],
    Heels: ['Women'],
    Flats: ['Women'],
    Sneakers: ['Men', 'Women', 'Unisex'],
    Tops: ['Women'],
    Blouses: ['Women'],
    Dresses: ['Women'],
    'Summer 2025': ['Men', 'Women', 'Unisex'],
    'Festival Edit': ['Men', 'Women', 'Unisex'],
    Workwear: ['Men', 'Women', 'Unisex'],
    Featured: ['Men', 'Women', 'Unisex'],
    'Best Sellers': ['Men', 'Women', 'Unisex'],
    Trending: ['Men', 'Women', 'Unisex']
};

const SIZES = {
    CLOTHING: ['S', 'M', 'L', 'XL', 'XXL'],
    SHOES: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
};

const COLORS = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy Blue', hex: '#000080' },
    { name: 'Olive Green', hex: '#808000' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Beige', hex: '#F5F5DC' },
    { name: 'Charcoal', hex: '#36454F' }
];

const ADJECTIVES = ['Premium', 'Classic', 'Modern', 'Essential', 'Signature', 'Urban', 'Elegant', 'Casual', 'Sport', 'Vintage'];

const IMAGE_POOLS = {
    Shirts: [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80',
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80',
        'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&q=80'
    ],
    'T-Shirts': [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80',
        'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80'
    ],
    Polos: [
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80',
        'https://images.unsplash.com/photo-1628926379974-c36f5616e15d?w=500&q=80',
        'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=500&q=80'
    ],
    Kurtas: [
        'https://images.unsplash.com/photo-1760287363878-1a09af715b80?w=500&q=80',
        'https://images.unsplash.com/photo-1629883582455-ceeeff319fac?w=500&q=80',
        'https://images.unsplash.com/photo-1583391733958-6938dc814ec4?w=500&q=80'
    ],
    Jackets: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80',
        'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=500&q=80'
    ],
    Pants: [
        'https://images.unsplash.com/photo-1624378439575-d1ead6bb28ed?w=500&q=80',
        'https://images.unsplash.com/photo-1542272201-b1e56754e267?w=500&q=80',
        'https://images.unsplash.com/photo-1584865288642-42078afe6942?w=500&q=80'
    ],
    Jeans: [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80',
        'https://images.unsplash.com/photo-1582552938357-32b906df43cd?w=500&q=80',
        'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500&q=80'
    ],
    Shorts: [
        'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80',
        'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500&q=80',
        'https://images.unsplash.com/photo-1582142306909-195724d33ab2?w=500&q=80'
    ],
    'Track Pants': [
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80',
        'https://images.unsplash.com/photo-1483721310020-03333e577078?w=500&q=80',
        'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=500&q=80'
    ],
    Skirts: [
        'https://images.unsplash.com/photo-1583496661160-fb488653dfe5?w=500&q=80',
        'https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=500&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'
    ],
    Leggings: [
        'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=500&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
        'https://images.unsplash.com/photo-1548624149-f7b3be6a9056?w=500&q=80'
    ],
    Shoes: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80'
    ],
    'Casual Shoes': [
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80'
    ],
    'Sports Shoes': [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
        'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=500&q=80',
        'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80'
    ],
    Sandals: [
        'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80',
        'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=500&q=80',
        'https://images.unsplash.com/photo-1605733513597-a8f8d410f286?w=500&q=80'
    ],
    Loafers: [
        'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&q=80',
        'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&q=80',
        'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=500&q=80'
    ],
    Heels: [
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
        'https://images.unsplash.com/photo-1603808033192-082d6f74b302?w=500&q=80',
        'https://images.unsplash.com/photo-1596702952706-90f46f41443b?w=500&q=80'
    ],
    Flats: [
        'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80',
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
        'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80'
    ],
    Sneakers: [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'
    ],
    Tops: [
        'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=500&q=80',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80',
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80'
    ],
    Blouses: [
        'https://images.unsplash.com/photo-1548624149-f7b3be6a9056?w=500&q=80',
        'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=500&q=80',
        'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500&q=80'
    ],
    Dresses: [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
        'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&q=80',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80'
    ],
    'Summer 2025': [
        'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=500&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
        'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&q=80'
    ],
    'Festival Edit': [
        'https://images.unsplash.com/photo-1610444391218-028c2135ca24?w=500&q=80',
        'https://images.unsplash.com/photo-1629883582455-ceeeff319fac?w=500&q=80',
        'https://images.unsplash.com/photo-1583391733958-6938dc814ec4?w=500&q=80'
    ],
    Workwear: [
        'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&q=80',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80',
        'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&q=80'
    ],
    Featured: [
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80'
    ],
    'Best Sellers': [
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80'
    ],
    Trending: [
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&q=80',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=80',
        'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&q=80'
    ]
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateProducts() {
    let allProducts = [];

    for (let category in TARGET_COUNTS) {
        const count = TARGET_COUNTS[category];
        const allowedGenders = CATEGORY_GENDERS[category] || ['Unisex'];

        for (let i = 0; i < count; i++) {
            const gender = getRandomItem(allowedGenders);
            const adjective = getRandomItem(ADJECTIVES);
            const price = parseFloat((Math.random() * 80 + 20).toFixed(2)); // $20.00 to $100.00
            const discount = Math.random() > 0.4 ? getRandomInt(10, 60) : 0;
            const rating = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)); // 3.5 to 5.0
            const reviewsCount = getRandomInt(5, 1500);

            let numOfColors = getRandomInt(1, 4);
            let productColors = [];
            let pool = [...COLORS];
            for (let c = 0; c < numOfColors; c++) {
                let idx = getRandomInt(0, pool.length - 1);
                productColors.push(pool[idx]);
                pool.splice(idx, 1);
            }

            let tags = [];
            if (rating > 4.6) tags.push('Best Seller');
            if (discount > 25) tags.push('Trending');
            if (Math.random() > 0.8) tags.push('New Arrival');

            const poolRes = IMAGE_POOLS[category] || IMAGE_POOLS['Shirts'];
            const mainImg = poolRes[0];

            const isFootwear = ['Shoes', 'Casual Shoes', 'Sports Shoes', 'Sandals', 'Loafers', 'Heels', 'Flats', 'Sneakers'].includes(category);
            
            allProducts.push({
                id: uuidv4(),
                name: `${adjective} ${category} for ${gender}`,
                category,
                gender,
                price,
                discount,
                rating,
                reviewsCount,
                sizes: isFootwear ? SIZES.SHOES : SIZES.CLOTHING,
                colors: productColors,
                images: [
                    poolRes[0] || mainImg,
                    poolRes[1] || mainImg,
                    poolRes[2] || mainImg
                ],
                description: `Experience unparalleled comfort and style with our ${adjective.toLowerCase()} ${category.toLowerCase()}. Made from premium materials for a perfect fit. Explore AI generated customization features for this product!`,
                tags,
                dateAdded: new Date(Date.now() - getRandomInt(0, 10000000000)).toISOString()
            });
        }
    }

    return allProducts;
}

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const products = generateProducts();
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));

console.log(`Successfully generated ${products.length} products in data/products.json`);
