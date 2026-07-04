import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore, useWishlistStore } from '../store/store';
import QuickViewModal from './QuickViewModal';

const ProductCard = ({ product }) => {
    const { addToCart } = useCartStore();
    const { toggleWishlist, isWishlisted } = useWishlistStore();
    const [hovering, setIsHovered] = useState(false);
    const [quickView, setQuickView] = useState(false);
    const [addedFlash, setAddedFlash] = useState(false);

    const wishlisted = isWishlisted(product.id);
    const discountedPrice = Math.round(product.price * 83);
    const originalPrice = product.discount > 0 ? Math.round((product.price / (1 - product.discount / 100)) * 83) : null;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, product.sizes[0], product.colors[0]);
        setAddedFlash(true);
        setTimeout(() => setAddedFlash(false), 1500);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    const handleQuickView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setQuickView(true);
    };

    return (
        <>
            <motion.div
                className="group relative bg-white cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ boxShadow: hovering ? '0 12px 40px rgba(0,0,0,0.12)' : 'none' }}
            >
                <Link to={`/product/${product.id}`}>
                    {/* Image Container */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50">
                        {/* Main image */}
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${hovering && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
                        />
                        {/* Hover image */}
                        {product.images[1] && (
                            <img
                                src={product.images[1]}
                                alt={`${product.name} alt`}
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${hovering ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                            />
                        )}

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                            {product.discount > 0 && (
                                <span className="bg-[#4f46e5] text-white text-[10px] font-black px-2 py-0.5 rounded">
                                    {product.discount}% OFF
                                </span>
                            )}
                            {product.tags?.includes('New Arrival') && (
                                <span className="bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded">NEW</span>
                            )}
                        </div>

                        {/* Wishlist button */}
                        <motion.button
                            onClick={handleWishlist}
                            whileTap={{ scale: 0.8 }}
                            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${wishlisted ? 'bg-[#4f46e5] text-white' : 'bg-white text-gray-500 hover:text-[#4f46e5]'}`}
                        >
                            <Heart size={14} fill={wishlisted ? 'white' : 'none'} />
                        </motion.button>

                        {/* Hover Overlay Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: hovering ? 1 : 0, y: hovering ? 0 : 20 }}
                            className="absolute bottom-0 left-0 right-0 flex"
                        >
                            <motion.button
                                onClick={handleQuickView}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 bg-white/95 text-gray-800 py-3 text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 hover:bg-gray-50 transition border-r border-gray-100"
                            >
                                <Eye size={13} /> QUICK VIEW
                            </motion.button>
                            <motion.button
                                onClick={handleAddToCart}
                                whileTap={{ scale: 0.95 }}
                                className={`flex-1 py-3 text-xs font-bold tracking-wider flex items-center justify-center gap-1.5 transition ${addedFlash ? 'bg-green-500 text-white' : 'bg-[#4f46e5] text-white hover:bg-[#4338ca]'}`}
                            >
                                {addedFlash ? <><Zap size={13} /> ADDED!</> : <><ShoppingBag size={13} /> ADD</>}
                            </motion.button>
                        </motion.div>

                        {/* Rating Badge */}
                        <div className="absolute bottom-11 left-2">
                            <div className="bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-700 flex items-center gap-0.5 shadow-sm">
                                {product.rating}
                                <Star size={9} className="fill-amber-400 text-amber-400" />
                                <span className="text-gray-400 font-normal">| {product.reviewsCount >= 1000 ? (product.reviewsCount / 1000).toFixed(1) + 'k' : product.reviewsCount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="p-2 pt-2.5">
                        <h3 className="font-black text-gray-900 text-sm truncate">{product.category}</h3>
                        <p className="text-xs text-gray-500 truncate font-light mb-1.5">{product.name}</p>
                        <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-black text-gray-900 text-sm">₹{discountedPrice.toLocaleString()}</span>
                            {originalPrice && (
                                <>
                                    <span className="text-gray-400 line-through text-xs">₹{originalPrice.toLocaleString()}</span>
                                    <span className="text-[#4f46e5] font-bold text-xs">({product.discount}% OFF)</span>
                                </>
                            )}
                        </div>
                        {/* Color dots */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="flex gap-1 mt-1.5">
                                {product.colors.slice(0, 4).map(c => (
                                    <div
                                        key={c.name}
                                        title={c.name}
                                        className="w-3 h-3 rounded-full border border-gray-200 shadow-sm"
                                        style={{ backgroundColor: c.hex }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </Link>
            </motion.div>

            {/* Quick View Modal */}
            {quickView && (
                <QuickViewModal product={product} onClose={() => setQuickView(false)} />
            )}
        </>
    );
};

export default ProductCard;
