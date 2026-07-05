import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlistStore, useCartStore } from '../store/store';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlistStore();
    const { addToCart } = useCartStore();

    const handleMoveToCart = (product) => {
        addToCart(product, product.sizes[0], product.colors[0]);
        removeFromWishlist(product.id);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 pb-24 md:pb-10">
            <h1 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                <Heart size={32} className="text-[#4f46e5]" fill="#4f46e5" /> My Wishlist
                <span className="text-gray-400 font-normal text-xl">({wishlist.length} items)</span>
            </h1>
            <div className="w-20 h-1 bg-[#4f46e5] rounded mb-8" />

            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <Heart size={72} className="text-gray-200 mb-6" />
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Your wishlist is empty</h2>
                    <p className="text-gray-400 mb-8 max-w-sm">Save items you love by clicking the ❤️ on any product card.</p>
                    <Link to="/shop" className="bg-[#4f46e5] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#4338ca] transition-all hover:shadow-lg">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <AnimatePresence>
                        {wishlist.map(product => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 group"
                            >
                                <Link to={`/product/${product.id}`} className="block relative aspect-[3/4]">
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <button
                                        onClick={(e) => { e.preventDefault(); removeFromWishlist(product.id); }}
                                        className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-[#4f46e5] hover:bg-red-50 transition"
                                    >
                                        <Heart size={14} fill="#4f46e5" />
                                    </button>
                                </Link>
                                <div className="p-3">
                                    <p className="font-black text-xs text-gray-400 uppercase">{product.category}</p>
                                    <p className="font-bold text-sm text-gray-900 truncate">{product.name}</p>
                                    <p className="font-black text-gray-900 text-sm mt-1">₹{Math.round(product.price * 83).toLocaleString()}</p>
                                    <button
                                        onClick={() => handleMoveToCart(product)}
                                        className="mt-2 w-full py-2 text-xs font-bold bg-gray-900 text-white rounded hover:bg-[#4f46e5] transition flex items-center justify-center gap-1.5"
                                    >
                                        <ShoppingBag size={12} /> MOVE TO BAG
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
