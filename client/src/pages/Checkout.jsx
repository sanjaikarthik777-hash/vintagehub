import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/store';
import { checkout } from '../services/api';
import { CheckCircle, CreditCard, ShoppingBag, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout = () => {
    const { cart, getCartTotal, clearCart } = useCartStore();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const total = getCartTotal();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulated fake checkout
            const res = await checkout({ items: cart, address: 'Test Address' });
            if(res.data.success) {
                setSuccess(true);
                clearCart();
                setTimeout(() => {
                    navigate('/shop');
                }, 4000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && !success) {
        return (
            <div className="min-h-screen pt-20 text-center">
                <h1 className="text-3xl font-bold mb-4 dark:text-white">Your cart is empty!</h1>
                <button onClick={() => navigate('/shop')} className="text-purple-500 font-bold hover:underline">Go shopping</button>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen pt-20 flex justify-center items-center pb-32">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-2xl text-center max-w-md border border-gray-100 dark:border-gray-700"
                >
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle size={40} />
                    </motion.div>
                    <h2 className="text-3xl font-black mb-2 dark:text-white">Order Confirmed!</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">Your mock payment was successful. Redirecting to shop...</p>
                    <div className="animate-pulse flex justify-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-10 pb-20 max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-black mb-10 dark:text-white">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-xl font-bold mb-6 dark:text-white">Shipping Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input required type="text" placeholder="First Name" className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white" />
                            <input required type="text" placeholder="Last Name" className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white" />
                        </div>
                        <input required type="email" placeholder="Email Address" className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white" />
                        <input required type="text" placeholder="Address" className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white" />
                        <div className="grid grid-cols-3 gap-4">
                            <input required type="text" placeholder="City" className="col-span-2 w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white" />
                            <input required type="text" placeholder="ZIP" className="col-span-1 w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white" />
                        </div>

                        <h2 className="text-xl font-bold mt-10 mb-6 dark:text-white">Payment Method</h2>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4 flex items-center justify-between bg-purple-50/50 dark:bg-purple-900/10 border-purple-500">
                            <div className="flex items-center gap-3">
                                <CreditCard className="text-purple-500" />
                                <span className="font-bold dark:text-white">Mock Credit Card</span>
                            </div>
                            <div className="w-4 h-4 rounded-full border-4 border-purple-500 flex items-center justify-center">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-bold mt-8 shadow-xl hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white transition disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current"></div> : <><ShieldCheck size={18}/> Pay ${(total * 1.08).toFixed(2)}</>}
                        </button>
                    </form>
                </div>

                <div>
                    <div className="bg-gray-50 dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800">
                        <h2 className="text-xl font-bold mb-6 dark:text-white flex items-center gap-2">
                            <ShoppingBag size={20} /> Order Summary
                        </h2>
                        
                        <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-center">
                                    <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700 relative">
                                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover"/>
                                        <div className="absolute -top-2 -right-2 bg-gray-900 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold">
                                            {item.quantity}
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <span className="font-bold text-sm line-clamp-1 dark:text-white">{item.product.name}</span>
                                        <span className="text-xs text-gray-500">Size: {item.size} • Color: {item.color.name}</span>
                                    </div>
                                    <span className="font-bold text-sm dark:text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex justify-between"><span>Subtotal</span><span className="dark:text-white">${total.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Shipping</span><span className="dark:text-white">$0.00</span></div>
                            <div className="flex justify-between"><span>Taxes</span><span className="dark:text-white">${(total * 0.08).toFixed(2)}</span></div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xl">
                            <span className="font-bold dark:text-white">Total</span>
                            <span className="font-black dark:text-white">${(total * 1.08).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
