import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingBag, ZoomIn, ChevronLeft, ChevronRight, RotateCcw, Truck, Shield, Award, Check, Zap } from 'lucide-react';
import { getProductById } from '../services/api';
import { useCartStore, useWishlistStore, useRecentlyViewedStore } from '../store/store';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCartStore();
    const { toggleWishlist, isWishlisted } = useWishlistStore();
    const { addItem: addToRecent } = useRecentlyViewedStore();

    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [sizeError, setSizeError] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [zooming, setZooming] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(true);
            setActiveImage(0);
            setSelectedSize(null);
        }, 0);
        window.scrollTo(0, 0);
        getProductById(id).then(res => {
            setProduct(res.data.product);
            setSimilar(res.data.similar || []);
            addToRecent(res.data.product);
            setSelectedColor(res.data.product.colors[0]);
        }).catch(console.error).finally(() => {
            setTimeout(() => setLoading(false), 0);
        });
        return () => clearTimeout(timer);
    }, [id, addToRecent]);

    const handleImageMouseMove = (e) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPos({ x, y });
    };

    const handleAddToCart = () => {
        if (!selectedSize) { setSizeError(true); setTimeout(() => setSizeError(false), 1200); return; }
        addToCart(product, selectedSize, selectedColor);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const wishlisted = product ? isWishlisted(product.id) : false;

    if (loading) return (
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-[3/4] bg-gray-200 rounded-xl" />
            <div className="space-y-4">
                {[...Array(6)].map((_, i) => <div key={i} className="h-6 bg-gray-200 rounded w-full" />)}
            </div>
        </div>
    );

    if (!product) return (
        <div className="text-center py-32">
            <p className="text-gray-400 text-xl">Product not found.</p>
            <Link to="/shop" className="mt-4 inline-block text-[#4f46e5] font-bold">← Back to Shop</Link>
        </div>
    );

    const discountedPrice = Math.round(product.price * 83);
    const originalPrice = product.discount > 0 ? Math.round((product.price / (1 - product.discount / 100)) * 83) : null;

    return (
        <div className="bg-white min-h-screen pb-24 md:pb-8">
            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-gray-400 flex items-center gap-1.5">
                <Link to="/" className="hover:text-[#4f46e5] transition">Home</Link>
                <span>/</span>
                <Link to="/shop" className="hover:text-[#4f46e5] transition">Shop</Link>
                <span>/</span>
                <Link to={`/shop/category/${product.category}`} className="hover:text-[#4f46e5] transition">{product.category}</Link>
                <span>/</span>
                <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-14">
                    {/* Left: Image Gallery */}
                    <div className="w-full md:w-[45%] shrink-0">
                        {/* Thumbnails row for mobile, column for desktop */}
                        <div className="flex gap-3 md:flex-col md:gap-0">
                            {/* Thumbnails (desktop: left col, mobile: top row) */}
                            <div className="hidden md:flex flex-col gap-2 mr-4 shrink-0">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? 'border-gray-900 shadow-md' : 'border-gray-100 opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt={`View ${i+1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>

                            {/* Main image */}
                            <div
                                ref={imageRef}
                                className="flex-1 relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-50 cursor-zoom-in"
                                onMouseMove={handleImageMouseMove}
                                onMouseEnter={() => setZooming(true)}
                                onMouseLeave={() => setZooming(false)}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={`${activeImage}-${selectedColor?.name}`}
                                        initial={{ opacity: 0, scale: 1.02 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        src={product.images[activeImage]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        style={zooming ? {
                                            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                            transform: 'scale(1.5)',
                                        } : {}}
                                    />
                                </AnimatePresence>

                                {/* Arrows */}
                                {product.images.length > 1 && (
                                    <>
                                        <button onClick={() => setActiveImage(i => (i - 1 + product.images.length) % product.images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition">
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button onClick={() => setActiveImage(i => (i + 1) % product.images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition">
                                            <ChevronRight size={18} />
                                        </button>
                                    </>
                                )}

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.discount > 0 && (
                                        <span className="bg-[#4f46e5] text-white text-xs font-black px-2.5 py-1 rounded-full shadow">{product.discount}% OFF</span>
                                    )}
                                    {product.tags?.includes('Best Seller') && (
                                        <span className="bg-amber-400 text-white text-xs font-black px-2.5 py-1 rounded-full shadow">BEST SELLER</span>
                                    )}
                                </div>

                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <motion.button
                                        onClick={() => toggleWishlist(product)}
                                        whileTap={{ scale: 0.8 }}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${wishlisted ? 'bg-[#4f46e5] text-white' : 'bg-white text-gray-600 hover:text-[#4f46e5]'}`}
                                    >
                                        <Heart size={18} fill={wishlisted ? 'white' : 'none'} />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile thumbnails */}
                        <div className="md:hidden flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(i)}
                                    className={`shrink-0 w-14 h-18 rounded-lg overflow-hidden border-2 transition-all ${activeImage === i ? 'border-gray-900' : 'border-gray-100 opacity-60'}`}
                                >
                                    <img src={img} alt={`View ${i+1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Details - Sticky */}
                    <div className="flex-1">
                        <div className="md:sticky md:top-24">
                            {/* Brand + Name */}
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{product.category} · {product.gender}</p>
                            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-3">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="bg-green-600 text-white px-2.5 py-1 rounded text-sm font-bold flex items-center gap-1">
                                    {product.rating} <Star size={12} fill="white" />
                                </div>
                                <span className="text-gray-400 text-sm">{product.reviewsCount?.toLocaleString()} ratings</span>
                                {product.tags?.map(tag => (
                                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">{tag}</span>
                                ))}
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3 mb-6 pb-5 border-b border-gray-100">
                                <span className="text-3xl font-black text-gray-900">₹{discountedPrice.toLocaleString()}</span>
                                {originalPrice && (
                                    <span className="text-gray-400 line-through text-lg">₹{originalPrice.toLocaleString()}</span>
                                )}
                                {product.discount > 0 && (
                                    <span className="text-[#4f46e5] font-black text-lg">({product.discount}% OFF)</span>
                                )}
                                {product.discount > 0 && (
                                    <span className="text-xs text-gray-400">incl. of taxes</span>
                                )}
                            </div>

                            {/* Color Selection */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="mb-6">
                                    <p className="text-sm font-bold text-gray-700 mb-3">
                                        Color: <span className="font-black text-gray-900">{selectedColor?.name}</span>
                                    </p>
                                    <div className="flex gap-3 flex-wrap">
                                        {product.colors.map(color => (
                                            <motion.button
                                                key={color.name}
                                                onClick={() => { setSelectedColor(color); setActiveImage(0); }}
                                                whileTap={{ scale: 0.85 }}
                                                title={color.name}
                                                className={`w-9 h-9 rounded-full transition-all ${selectedColor?.name === color.name ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : 'ring-1 ring-gray-200 hover:scale-105'}`}
                                                style={{ backgroundColor: color.hex }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selection */}
                            <div className="mb-7">
                                <div className="flex justify-between items-center mb-3">
                                    <p className={`text-sm font-bold ${sizeError ? 'text-red-500 animate-bounce' : 'text-gray-700'}`}>
                                        Select Size {sizeError && '— Required!'}
                                    </p>
                                    <button className="text-xs font-bold text-gray-400 hover:text-gray-600 transition underline">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {product.sizes.map(size => (
                                        <motion.button
                                            key={size}
                                            onClick={() => { setSelectedSize(size); setSizeError(false); }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`min-w-[52px] px-4 py-2.5 text-sm font-bold border rounded-lg transition-all duration-200 ${
                                                selectedSize === size
                                                    ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                                                    : 'border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                                            }`}
                                        >
                                            {size}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex gap-3 mb-7">
                                <motion.button
                                    onClick={handleAddToCart}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-1 py-4 font-black text-base rounded-xl flex items-center justify-center gap-2.5 transition-all ${
                                        addedToCart
                                            ? 'bg-green-500 text-white'
                                            : !selectedSize
                                            ? 'bg-[#4f46e5] text-white hover:bg-[#4338ca]'
                                            : 'bg-[#4f46e5] text-white hover:bg-[#4338ca] hover:shadow-lg hover:shadow-indigo-200'
                                    }`}
                                >
                                    {addedToCart ? (
                                        <><Check size={20} /> ADDED TO BAG</>
                                    ) : (
                                        <><ShoppingBag size={20} /> ADD TO BAG</>
                                    )}
                                </motion.button>

                                <motion.button
                                    onClick={() => toggleWishlist(product)}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-14 py-4 rounded-xl border-2 flex items-center justify-center transition-all ${
                                        wishlisted ? 'border-[#4f46e5] bg-indigo-50 text-[#4f46e5]' : 'border-gray-200 text-gray-600 hover:border-[#4f46e5] hover:text-[#4f46e5]'
                                    }`}
                                >
                                    <Heart size={22} fill={wishlisted ? '#4f46e5' : 'none'} />
                                </motion.button>
                            </div>

                            {/* Delivery Info */}
                            <div className="grid grid-cols-3 gap-3 mb-7">
                                {[
                                    { icon: <Truck size={18} />, label: 'Free Delivery', sub: 'On orders ₹499+' },
                                    { icon: <RotateCcw size={18} />, label: '14 Day Returns', sub: 'Easy & free' },
                                    { icon: <Shield size={18} />, label: '100% Genuine', sub: 'Verified brand' },
                                ].map(item => (
                                    <div key={item.label} className="flex flex-col items-center text-center gap-2 bg-gray-50 rounded-xl p-3">
                                        <div className="text-gray-600">{item.icon}</div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-800">{item.label}</p>
                                            <p className="text-[10px] text-gray-400">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-5">
                                <p className="font-bold text-gray-900 mb-2">Product Details</p>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                {similar.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider mb-6">Similar Products</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {similar.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
