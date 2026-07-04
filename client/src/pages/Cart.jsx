import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/store';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCartStore();
    const navigate = useNavigate();

    const total = getCartTotal();
    const isCartEmpty = cart.length === 0;

    return (
        <div className="min-h-screen pt-10 pb-20 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black mb-10 dark:text-white flex items-center gap-4">
                <ShoppingBag size={40} className="text-purple-500" /> Your Cart
            </h1>

            {isCartEmpty ? (
                <div className="text-center py-32 bg-gray-50 dark:bg-slate-900 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                    <ShoppingBag size={64} className="mx-auto text-gray-400 mb-6" />
                    <h2 className="text-2xl font-bold dark:text-white mb-4">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Discover our latest collections.</p>
                    <Link to="/shop" className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-purple-700 transition">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-6">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div 
                                    key={`${item.product.id}-${item.size}-${item.color.name}`}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -100 }}
                                    className="flex gap-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
                                >
                                    <div className="w-24 h-32 md:w-32 md:h-40 rounded-xl overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    
                                    <div className="flex flex-col flex-1 py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-1">{item.product.category}</p>
                                                <Link to={`/product/${item.product.id}`} className="font-bold text-lg md:text-xl dark:text-white hover:text-purple-500 transition line-clamp-1">{item.product.name}</Link>
                                                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">Color: <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: item.color.hex }}/></span>
                                                    <span>|</span>
                                                    <span>Size: <strong className="text-gray-900 dark:text-white">{item.size}</strong></span>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.product.id, item.size, item.color.name)}
                                                className="text-gray-400 hover:text-red-500 transition p-2 bg-gray-50 dark:bg-gray-800 rounded-full"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        
                                        <div className="flex justify-between items-end mt-auto">
                                            <div className="flex items-center bg-gray-100 dark:bg-slate-900 rounded-lg p-1">
                                                <button onClick={() => updateQuantity(item.product.id, item.size, item.color.name, -1)} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded shadow-sm text-gray-600 dark:text-gray-300 transition">
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center font-bold dark:text-white">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.product.id, item.size, item.color.name, 1)} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded shadow-sm text-gray-600 dark:text-gray-300 transition">
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <span className="font-black text-xl dark:text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="bg-gray-50 dark:bg-slate-900 rounded-3xl p-6 sticky top-24 border border-gray-200 dark:border-gray-800">
                            <h3 className="text-xl font-bold mb-6 dark:text-white">Order Summary</h3>
                            
                            <div className="space-y-4 mb-6 text-sm text-gray-600 dark:text-gray-400 font-medium">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="dark:text-white">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-500 font-bold">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (Est.)</span>
                                    <span className="dark:text-white">${(total * 0.08).toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-8 flex justify-between items-center text-xl">
                                <span className="font-bold dark:text-white">Total</span>
                                <span className="font-black dark:text-white">${(total * 1.08).toFixed(2)}</span>
                            </div>

                            <button 
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-bold shadow-xl hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition flex justify-center items-center gap-2 group"
                            >
                                Checkout Securely <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
