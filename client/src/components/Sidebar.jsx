import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Home, Flame, ChevronDown, ChevronRight, Box } from 'lucide-react';
import { useCartStore, useAuthStore } from '../store/store';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
    const { cart } = useCartStore();
    const { user, logout } = useAuthStore();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const advancedCategories = {
        'Men': ['Shirts', 'Pants', 'Shoes', 'Jackets', 'Kurtas'],
        'Women': ['Tops', 'Pants', 'Shoes', 'Jackets', 'Kurtas']
    };

    const toggleMenu = (menu) => {
        setExpandedMenu(expandedMenu === menu ? '' : menu);
    };

    const NavContent = () => (
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <Link to="/" className="text-2xl font-black text-gray-900 tracking-tighter">
                    VANTAGE
                </Link>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-2 px-4">
                    <NavLink to="/" onClick={() => setMobileOpen(false)} className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                        <Home size={20} /> Home
                    </NavLink>
                    
                    <NavLink to="/shop?tags=Trending" onClick={() => setMobileOpen(false)} className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${location.search.includes('Trending') ? 'bg-orange-50 text-orange-600' : 'text-orange-500 hover:bg-orange-50'}`}>
                        <Flame size={20} /> Trending Now
                    </NavLink>
                    
                    {Object.keys(advancedCategories).map((gender) => (
                        <div key={gender} className="flex flex-col">
                            <div 
                                onClick={() => toggleMenu(gender)} 
                                className={`flex items-center justify-between px-4 py-3 rounded-lg font-bold transition-colors cursor-pointer text-gray-700 hover:bg-gray-100`}
                            >
                                <span className="flex items-center gap-3">
                                    <Box size={20} /> {gender}
                                </span>
                                {expandedMenu === gender ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                            </div>
                            
                            <AnimatePresence>
                                {expandedMenu === gender && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden ml-9 border-l border-gray-200 mt-1 space-y-1"
                                    >
                                        <NavLink to={`/shop/gender/${gender.toLowerCase()}`} onClick={() => setMobileOpen(false)} className={({isActive}) => `block px-4 py-2 text-sm font-bold rounded-r-lg ${isActive && location.pathname.includes('gender') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                                            View All {gender}
                                        </NavLink>
                                        {advancedCategories[gender].map(cat => (
                                            <NavLink key={cat} to={`/shop/category/${cat}?gender=${gender}`} onClick={() => setMobileOpen(false)} className={({isActive}) => `block px-4 py-2 text-sm font-medium rounded-r-lg ${isActive && location.pathname.includes(cat) ? 'text-indigo-600 font-bold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}>
                                                {cat}
                                            </NavLink>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}

                    <NavLink to="/shop" onClick={() => setMobileOpen(false)} className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors ${isActive && location.pathname === '/shop' && !location.search ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                        <Search size={20} /> Browse All
                    </NavLink>
                </nav>
            </div>

            <div className="p-4 border-t border-gray-200 space-y-2 pb-8">
                <div className="flex bg-gray-100 rounded-lg overflow-hidden mb-4 p-2 items-center text-gray-400">
                    <Search size={20} className="mx-2"/>
                    <input type="text" placeholder="Search..." className="bg-transparent w-full focus:outline-none text-sm text-gray-900 font-medium"/>
                </div>

                <Link onClick={() => setMobileOpen(false)} to="/cart" className="flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-100 transition-colors relative">
                    <ShoppingBag size={20} />
                    Cart
                    {cartCount > 0 && (
                        <span className="ml-auto bg-indigo-600 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>

                <div className="group relative">
                    {user ? (
                        <>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-100 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
                                <User size={20} /> {user.name}
                            </div>
                            <div className="hidden group-hover:block absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50">
                                {user.role === 'admin' && (
                                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="block px-4 py-2 hover:bg-gray-50 rounded-lg text-sm font-bold">Dashboard</Link>
                                )}
                                <button onClick={() => { logout(); navigate('/'); }} className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm font-bold">Logout</button>
                            </div>
                        </>
                    ) : (
                        <Link onClick={() => setMobileOpen(false)} to="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-gray-700 hover:bg-gray-100 transition-colors">
                            <User size={20} /> Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-72 h-screen sticky top-0 shrink-0 z-40 bg-white">
                <NavContent />
            </aside>

            {/* Mobile Header Toggle */}
            <header className="md:hidden fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-md border-b border-gray-200 z-50 px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-black text-gray-900 tracking-tighter">VANTAGE</Link>
                <div className="flex gap-4">
                    <Link to="/cart" className="relative text-gray-900">
                        <ShoppingBag size={24} />
                        {cartCount > 0 && <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{cartCount}</span>}
                    </Link>
                    <button onClick={() => setMobileOpen(true)} className="text-gray-900">
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-50 md:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div 
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween' }}
                            className="fixed top-0 left-0 h-full w-4/5 max-w-sm z-50 md:hidden"
                        >
                            <button onClick={() => setMobileOpen(false)} className="absolute top-4 -right-12 text-white p-2">
                                <X size={28} />
                            </button>
                            <NavContent />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
