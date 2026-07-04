import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShoppingBag, Heart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useWishlistStore } from '../store/store';

const QuickViewModal = ({ product, onClose }) => {
    const { addToCart } = useCartStore();
    const { toggleWishlist, isWishlisted } = useWishlistStore();
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [adding, setAdding] = useState(false);

    const wishlisted = isWishlisted(product.id);
    const discountedPrice = Math.round(product.price * 83);
    const originalPrice = product.discount > 0 ? Math.round((product.price / (1 - product.discount / 100)) * 83) : null;

    const handleAdd = () => {
        setAdding(true);
        addToCart(product, selectedSize, selectedColor);
        setTimeout(() => { setAdding(false); onClose(); }, 800);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="relative w-full md:w-56 aspect-[3/4] bg-gray-50 shrink-0">
                            <img src={selectedColor ? product.images[0] : product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                            <button onClick={() => toggleWishlist(product)} className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md ${wishlisted ? 'bg-[#4f46e5] text-white' : 'bg-white text-gray-500'}`}>
                                <Heart size={16} fill={wishlisted ? 'white' : 'none'} />
                            </button>
                        </div>

                        {/* Details */}
                        <div className="flex-1 p-5 flex flex-col">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{product.category}</p>
                                    <h2 className="text-lg font-black text-gray-900 mt-0.5 leading-tight">{product.name}</h2>
                                </div>
                                <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full transition">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                                    {product.rating} <Star size={10} fill="white" />
                                </div>
                                <span className="text-gray-400 text-xs">{product.reviewsCount?.toLocaleString()} ratings</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-2 mb-5">
                                <span className="text-2xl font-black text-gray-900">₹{discountedPrice.toLocaleString()}</span>
                                {originalPrice && (
                                    <>
                                        <span className="text-gray-400 line-through text-sm">₹{originalPrice.toLocaleString()}</span>
                                        <span className="text-[#4f46e5] font-bold text-sm">({product.discount}% OFF)</span>
                                    </>
                                )}
                            </div>

                            {/* Colors */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Color: <span className="text-gray-900">{selectedColor?.name}</span></p>
                                    <div className="flex gap-2">
                                        {product.colors.map(c => (
                                            <button
                                                key={c.name}
                                                onClick={() => setSelectedColor(c)}
                                                title={c.name}
                                                className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor?.name === c.name ? 'border-gray-900 scale-110' : 'border-gray-200'}`}
                                                style={{ backgroundColor: c.hex }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sizes */}
                            <div className="mb-5">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Size</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map(s => (
                                        <motion.button
                                            key={s}
                                            onClick={() => setSelectedSize(s)}
                                            whileTap={{ scale: 0.9 }}
                                            className={`min-w-[44px] px-3 py-2 text-xs font-bold border rounded transition-all ${selectedSize === s ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-700 hover:border-gray-400'}`}
                                        >
                                            {s}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mt-auto">
                                <motion.button
                                    onClick={handleAdd}
                                    whileTap={{ scale: 0.97 }}
                                    className={`flex-1 py-3.5 font-bold rounded-lg flex items-center justify-center gap-2 transition ${adding ? 'bg-green-500 text-white' : 'bg-[#4f46e5] text-white hover:bg-[#4338ca]'}`}
                                >
                                    {adding ? <><Check size={16} /> ADDED TO BAG</> : <><ShoppingBag size={16} /> ADD TO BAG</>}
                                </motion.button>
                                <Link to={`/product/${product.id}`} onClick={onClose} className="px-4 py-3.5 font-bold rounded-lg border-2 border-gray-200 text-gray-700 hover:border-gray-300 transition text-sm flex items-center">
                                    VIEW FULL
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default QuickViewModal;
