// Auto-generated mock product catalog — 800+ products

const categories = {
  shirts: { label: 'Shirts', genders: ['Men'] },
  pants: { label: 'Pants', genders: ['Men', 'Women'] },
  shoes: { label: 'Shoes', genders: ['Men', 'Women', 'Unisex'] },
  jackets: { label: 'Jackets', genders: ['Men', 'Women'] },
  tops: { label: 'Tops', genders: ['Women'] },
  kurtas: { label: 'Kurtas', genders: ['Men', 'Women'] },
};

const shirtNames = [
  'Classic Oxford Shirt','Slim Fit Formal Shirt','Casual Linen Shirt','Striped Button-Down',
  'Printed Floral Shirt','Mandarin Collar Shirt','Poplin Dress Shirt','Oversized Drop Shirt',
  'Half-Sleeve Solid Shirt','Plaid Flannel Shirt','Dobby Texture Shirt','Spread Collar Shirt',
  'Resort Vacation Shirt','Check Pattern Shirt','Denim Chambray Shirt','Polo Neck Shirt',
  'Performance Stretch Shirt','Tie-Dye Festival Shirt','Gradient Fade Shirt','Satin Evening Shirt',
  'Tropical Print Shirt','Block Print Shirt','Mock Neck Shirt','Ruched Detail Shirt',
  'Embroidered Silk Shirt','Herringbone Weave Shirt','Lyocell Soft Shirt','Slim Smart Shirt',
  'Terry Towelling Shirt','Washed Denim Shirt'
];

const pantNames = [
  'Slim Fit Chino','Relaxed Jogger Pants','Formal Trousers','Cargo Utility Pants',
  'Straight Cut Jeans','Tapered Leg Pants','Wide Leg Trousers','Linen Summer Pants',
  'Pleated Front Slacks','Skinny Denim Pants','Track Performance Pants','Pleated Formal',
  'Corduroy Vintage Pants','Drawstring Lounge Pants','Houndstooth Trousers',
  'Distressed Slim Jeans','Ankle Length Pants','Military Camo Pants',
  'Paperbag Waist Pants','Cropped Culottes','High Waist Cigarette','Bootcut Classic',
  'Ribbed Knit Pants','Satin Wide Leg','Leather Look Pants','Double Waistband Pants',
  'Patchwork Denim','Elastic Waist Cotton','Pinstripe Office Pant','Fleece Lined Pants'
];

const shoeNames = [
  'Air Cushion Sneakers','Leather Oxford Brogues','High Top Canvas','Running Pro Boost',
  'Slip-On Loafers','Chelsea Ankle Boots','Classic White Sneakers','Court Low Sneakers',
  'Suede Desert Boots','Platform Chunky Shoes','Mesh Sport Runners','Velvet Ballet Flats',
  'Block Heel Pumps','Pointed Toe Heels','Espadrille Wedge','Mule Slide Sandals',
  'Gladiator Sandals','Slingback Court Shoes','Knee High Boots','Chunky Lug Boots',
  'Trainer Crossover','Trail Running Shoes','Hiking Boots Pro','Water-Resistant Sneakers',
  'Wingtip Derby Shoes','Monkstrap Formal','Woven Leather Sandals','Clog Platform',
  'Ankle Strap Heels','Technical Hiking Shoe','Velcro Strap Sneakers','Athletic Court Shoe',
  'Leather Slip-On','Suede Tassel Loafer','Neoprene Chelsea Boot'
];

const jacketNames = [
  'Puffer Down Jacket','Biker Leather Jacket','Bomber Flight Jacket','Denim Trucker Jacket',
  'Windbreaker Shell','Peacoat Double-Breasted','Parka Hooded Jacket','Varsity Letterman',
  'Blazer Structured Jacket','Quilted Vest Jacket','Fleece Zip-Up Jacket','Rain Mac Jacket',
  'Tech Softshell Jacket','Corduroy Overshirt Jacket','Military Field Jacket',
  'Cropped Moto Jacket','Shirt Style Jacket','Raw Edge Denim Jacket',
  'Sherpa Lined Jacket','Packable Ultra-Light Jacket'
];

const topNames = [
  'Ribbed Crop Top','Wrap Front Tie Top','Puff Sleeve Blouse','Spaghetti Strap Cami',
  'Floral Print Top','Ruffled Bardot Top','Off-Shoulder Top','Tie-Back Halter Top',
  'Cut-Out Detail Top','Smocked Elastic Top','Sequin Party Top','Lace Trim Tank',
  'Belted Tunic Top','Draped Cowl Neck','Broderie Anglaise Top','Shirred Peplum Top',
  'Sports Bralette Top','Utility Pocket Top','Asymmetric Hem Top','Sheer Chiffon Top'
];

const kurtaNames = [
  'Anarkali Printed Kurta','Straight Cut Kurta','A-Line Embroidered Kurta',
  'Short Kurti Casual','Pathani Kurta Set','Angrakha Style Kurta','Nehru Collar Kurta',
  'Bandhani Print Kurta','Block Print Cotton Kurta','Lucknowi Chikankari Kurta',
  'Pakistani Style Kurta','Asymmetric Hem Kurti','Mirror Work Festival Kurta',
  'Mandarin Collar Kurta','Ikat Woven Kurta','Floral Georgette Kurta',
  'Phulkari Embroidered Kurta','Silk Blend Festive Kurta','Linen Half Sleeve Kurta',
  'Tie Dye Casual Kurti'
];

const colorSets = {
  shirts: [['White','Black','Navy Blue'],['Sky Blue','Grey','Olive'],['Red','Pink','Teal'],['Mustard','Brown','Maroon'],['Lavender','Coral','Mint Green']],
  pants: [['Black','Navy','Khaki'],['Grey','Brown','Olive'],['Dark Blue','Stone','Charcoal'],['White','Beige','Burgundy'],['Slate','Camel','Forest Green']],
  shoes: [['White','Black'],['Brown','Tan'],['Grey','Navy'],['Red','Pink'],['Olive','Khaki'],['Beige','Cream'],['Blue','Cobalt']],
  jackets: [['Black','Dark Green'],['Navy','Camel'],['Brown','Tan'],['Red','Maroon'],['Grey','Charcoal']],
  tops: [['White','Pink','Lavender'],['Black','Nude','Teal'],['Coral','Mint','Yellow'],['Navy','Burgundy','Olive'],['Rose Gold','Silver','Champagne']],
  kurtas: [['Ivory','Saffron','Maroon'],['Royal Blue','Peacock Green','Gold'],['Pink','Peach','Mint'],['White','Off-White','Cream'],['Purple','Indigo','Violet']],
};

const sizeSets = {
  shirts: ['S','M','L','XL','XXL'],
  pants: ['28','30','32','34','36','38'],
  shoes: ['6','7','8','9','10','11'],
  jackets: ['S','M','L','XL','XXL'],
  tops: ['XS','S','M','L','XL'],
  kurtas: ['S','M','L','XL','XXL'],
};

const fabricMap = {
  shirts: ['100% Cotton','Cotton-Linen Blend','Polyester','Viscose','Denim'],
  pants: ['Cotton','Denim','Linen','Polyester','Chino Twill'],
  shoes: ['Genuine Leather','Suede','Canvas','Mesh','Synthetic'],
  jackets: ['Polyester','Denim','Leather','Wool Blend','Softshell'],
  tops: ['Chiffon','Cotton','Polyester','Silk Blend','Rayon'],
  kurtas: ['Cotton','Silk','Georgette','Linen','Viscose'],
};

const tagPool = ['best seller', 'trending', 'new arrival'];

const descTemplates = [
  (name, fabric) => `The ${name} is crafted from premium ${fabric}, offering exceptional comfort and style. Perfect for casual and semi-formal occasions, this piece combines modern aesthetics with everyday wearability.`,
  (name, fabric) => `Elevate your wardrobe with the ${name}. Made from high-quality ${fabric}, it features impeccable stitching and a refined silhouette that suits multiple occasions.`,
  (name, fabric) => `Designed for the modern individual, the ${name} uses ${fabric} to deliver softness, durability, and a fresh contemporary look that stands out in any crowd.`,
  (name, fabric) => `The ${name} is your go-to piece for effortless style. Constructed from ${fabric} with attention to detail, it offers a perfect blend of comfort and fashion-forward design.`,
];

function randomBetween(min, max) { return +(Math.random() * (max - min) + min).toFixed(2); }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickRandomN(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}
function pickTags() {
  const n = randomInt(1, 2);
  return pickRandomN(tagPool, n);
}

const imageSeeds = {
  shirts: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
  pants: [11, 21, 31, 41, 51, 61, 71, 81, 91, 101, 111, 121, 131, 141, 151],
  shoes: [12, 22, 32, 42, 52, 62, 72, 82, 92, 102, 112, 122, 132, 142, 152],
  jackets: [13, 23, 33, 43, 53, 63, 73, 83, 93, 103, 113, 123, 133, 143, 153],
  tops: [14, 24, 34, 44, 54, 64, 74, 84, 94, 104, 114, 124, 134, 144, 154],
  kurtas: [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155],
};

const priceRanges = {
  shirts: [499, 3499],
  pants: [699, 4999],
  shoes: [999, 8999],
  jackets: [1499, 9999],
  tops: [399, 2499],
  kurtas: [599, 4999],
};

function generateProduct(id, category, nameArr) {
  const nameBase = pickRandom(nameArr);
  const name = `${nameBase} ${randomInt(1, 9)}`;
  const fabric = pickRandom(fabricMap[category]);
  const description = pickRandom(descTemplates)(nameBase, fabric);
  const colors = pickRandom(colorSets[category]);
  const sizes = sizeSets[category];
  const [minPrice, maxPrice] = priceRanges[category];
  const price = randomInt(minPrice, maxPrice);
  const discount = randomInt(5, 60);
  const rating = +(Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 - 5.0
  const reviewsCount = randomInt(50, 12000);
  const tags = pickTags();
  const seedIdx = randomInt(0, imageSeeds[category].length - 1);
  const seed1 = imageSeeds[category][seedIdx];
  const seed2 = imageSeeds[category][(seedIdx + 1) % imageSeeds[category].length];
  const seed3 = imageSeeds[category][(seedIdx + 2) % imageSeeds[category].length];
  const genderPool = categories[category].genders;
  const gender = pickRandom(genderPool);

  return {
    id: `${category.slice(0, 3).toUpperCase()}-${String(id).padStart(4, '0')}`,
    name,
    category,
    gender,
    price,
    discount,
    finalPrice: Math.round(price - (price * discount) / 100),
    rating,
    reviewsCount,
    sizes,
    colors,
    fabric,
    fit: pickRandom(['Slim Fit', 'Regular Fit', 'Oversized', 'Relaxed Fit']),
    sleeve: category === 'shirts' || category === 'tops' || category === 'kurtas'
      ? pickRandom(['Full Sleeve', 'Half Sleeve', 'Sleeveless', 'Three-Quarter'])
      : null,
    images: [
      `https://picsum.photos/seed/${seed1 + id}/600/800`,
      `https://picsum.photos/seed/${seed2 + id}/600/800`,
      `https://picsum.photos/seed/${seed3 + id}/600/800`,
    ],
    description,
    tags,
    brand: pickRandom(['StyleCo','UrbanEdge','FashionX','TrendWave','LuxWear','ModaVibe','PrimeStyle','ElegantCo']),
    inStock: Math.random() > 0.05,
    createdAt: new Date(Date.now() - randomInt(0, 90) * 86400000).toISOString(),
  };
}

let idCounter = 1;
const products = [];

// 150 Shirts
for (let i = 0; i < 150; i++) products.push(generateProduct(idCounter++, 'shirts', shirtNames));
// 150 Pants
for (let i = 0; i < 150; i++) products.push(generateProduct(idCounter++, 'pants', pantNames));
// 200 Shoes
for (let i = 0; i < 200; i++) products.push(generateProduct(idCounter++, 'shoes', shoeNames));
// 100 Jackets
for (let i = 0; i < 100; i++) products.push(generateProduct(idCounter++, 'jackets', jacketNames));
// 100 Tops
for (let i = 0; i < 100; i++) products.push(generateProduct(idCounter++, 'tops', topNames));
// 100 Kurtas
for (let i = 0; i < 100; i++) products.push(generateProduct(idCounter++, 'kurtas', kurtaNames));

console.log(`✅ Generated ${products.length} products`);

module.exports = products;
