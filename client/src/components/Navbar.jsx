import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, User, Search, X, ChevronDown, Sun, Moon, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useAuthStore, useWishlistStore, useAppStore } from '../store/store';
import { getProducts } from '../services/api';

const MEGA_MENU = {
    MEN: {
        Topwear: ['Shirts', 'T-Shirts', 'Polos', 'Kurtas', 'Jackets'],
        Bottomwear: ['Pants', 'Jeans', 'Shorts', 'Track Pants'],
        Footwear: ['Casual Shoes', 'Sports Shoes', 'Sandals', 'Loafers'],
    },
    WOMEN: {
        Topwear: ['Tops', 'T-Shirts', 'Kurtas', 'Blouses', 'Jackets'],
        Bottomwear: ['Pants', 'Jeans', 'Skirts', 'Leggings'],
        Footwear: ['Heels', 'Flats', 'Sneakers', 'Sandals'],
    },
    KIDS: {
        Boys: ['T-Shirts', 'Shorts', 'Shirts', 'Shoes'],
        Girls: ['Dresses', 'T-Shirts', 'Skirts', 'Shoes'],
    },
    STUDIO: {
        'New Arrivals': ['Featured', 'Best Sellers', 'Trending'],
        Collections: ['Summer 2025', 'Festival Edit', 'Workwear'],
    }
};

const Navbar = () => {
    const { cart } = useCartStore();
    const { wishlist } = useWishlistStore();
    const { user, logout } = useAuthStore();
    const { darkMode, toggleDarkMode } = useAppStore();
    const navigate = useNavigate();
    const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

    const [hoveredMenu, setHoveredMenu] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const searchDebounceRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!searchQuery.trim()) { setSearchResults([]); return; }
        clearTimeout(searchDebounceRef.current);
        searchDebounceRef.current = setTimeout(async () => {
            try {
                const res = await getProducts({ search: searchQuery, limit: 6 });
                setSearchResults(res.data.data || []);
            } catch (_) { }
        }, 300);
    }, [searchQuery]);

    const handleSearchSelect = (product) => {
        setSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        navigate(`/product/${product.id}`);
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white border-b border-gray-100'}`}>
                {/* Top Strip */}
                <div className="bg-[#4f46e5] text-white text-center text-xs py-1.5 font-medium tracking-wider">
                    🎉 SALE IS LIVE — UP TO 80% OFF! FREE SHIPPING ON ORDERS ABOVE ₹499
                </div>

                {/* Main Nav */}
                <div className="max-w-[1600px] mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-black tracking-tight text-[#4f46e5] shrink-0 mr-8">
                        VINTAGE
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden lg:flex items-center gap-1 h-full">
                        {Object.keys(MEGA_MENU).map((section) => (
                            <div
                                key={section}
                                className="relative h-full flex items-center"
                                onMouseEnter={() => setHoveredMenu(section)}
                                onMouseLeave={() => setHoveredMenu(null)}
                            >
                                <button className={`px-5 h-full flex items-center gap-1 font-bold text-sm tracking-wider transition-colors ${hoveredMenu === section ? 'text-[#4f46e5] border-b-2 border-[#4f46e5]' : 'text-gray-800 hover:text-[#4f46e5]'}`}>
                                    {section} <ChevronDown size={14} className={`transition-transform ${hoveredMenu === section ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {hoveredMenu === section && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 w-[500px] bg-white shadow-2xl border-t-2 border-[#4f46e5] rounded-b-xl z-50 p-6"
                                        >
                                            <div className="grid grid-cols-3 gap-6">
                                                {Object.entries(MEGA_MENU[section]).map(([col, items]) => (
                                                    <div key={col}>
                                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">{col}</h4>
                                                        <ul className="space-y-2">
                                                            {items.map(item => (
                                                                <li key={item}>
                                                                    <Link
                                                                        to={`/shop/category/${item}?gender=${section === 'MEN' ? 'Men' : section === 'WOMEN' ? 'Women' : ''}`}
                                                                        onClick={() => setHoveredMenu(null)}
                                                                        className="text-sm text-gray-600 hover:text-[#4f46e5] hover:font-semibold transition-all"
                                                                    >
                                                                        {item}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center gap-2 ml-auto">
                        {/* Search */}
                        <button onClick={() => setSearchOpen(true)} className="p-2.5 rounded-full hover:bg-gray-100 transition text-gray-700 hover:text-[#4f46e5]">
                            <Search size={22} />
                        </button>

                        {/* Dark mode toggle */}
                        <button onClick={toggleDarkMode} className="p-2.5 rounded-full hover:bg-gray-100 transition text-gray-700 hover:text-[#4f46e5] hidden md:flex">
                            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                        </button>

                        {/* Wishlist */}
                        <Link to="/wishlist" className="p-2.5 rounded-full hover:bg-gray-100 transition text-gray-700 hover:text-[#4f46e5] hidden md:flex relative">
                            <Heart size={22} />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-[#4f46e5] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{wishlist.length}</span>
                            )}
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" className="p-2.5 rounded-full hover:bg-gray-100 transition text-gray-700 hover:text-[#4f46e5] relative hidden md:flex">
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-[#4f46e5] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{cartCount}</span>
                            )}
                        </Link>

                        {/* Profile */}
                        <div className="relative hidden md:block">
                            <button onClick={() => setProfileOpen(!profileOpen)} className="p-2.5 rounded-full hover:bg-gray-100 transition text-gray-700 hover:text-[#4f46e5] flex items-center gap-1 text-sm font-bold">
                                <User size={22} />
                                <span className="hidden lg:block">{user ? user.name.split(' ')[0] : 'Login'}</span>
                            </button>
                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                        {user ? (
                                            <>
                                                <div className="px-4 py-2 border-b border-gray-100">
                                                    <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                                                    <p className="text-xs text-gray-400">{user.email}</p>
                                                </div>
                                                {user.role === 'admin' && <Link to="/admin" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-gray-50 font-medium">Admin Dashboard</Link>}
                                                <Link to="/wishlist" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-gray-50 font-medium">My Wishlist</Link>
                                                <button onClick={() => { logout(); setProfileOpen(false); navigate('/'); }} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-medium">Logout</button>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/login" onClick={() => setProfileOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-gray-50 font-bold text-[#4f46e5]">Login</Link>
                                                <p className="px-4 py-2 text-xs text-gray-400">New to Vantage? Create account</p>
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Hamburger */}
                        <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2.5 rounded-full hover:bg-gray-100 transition text-gray-700">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Spacer for fixed navbar */}
            <div className="h-[104px]" />

            {/* Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex flex-col items-center pt-16"
                        onClick={(e) => { if (e.target === e.currentTarget) { setSearchOpen(false); setSearchQuery(''); } }}
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl mx-4 overflow-hidden"
                        >
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                                <Search size={22} className="text-gray-400 shrink-0" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search for products, brands..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 text-base font-medium outline-none text-gray-900 placeholder-gray-400"
                                />
                                <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="text-gray-400 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>

                            {searchResults.length > 0 && (
                                <div className="max-h-96 overflow-y-auto">
                                    {searchResults.map((p) => (
                                        <button key={p.id} onClick={() => handleSearchSelect(p)} className="flex items-center gap-3 w-full px-5 py-3 hover:bg-gray-50 transition text-left">
                                            <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover rounded-lg border border-gray-100" />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-sm text-gray-900 truncate">{p.name}</p>
                                                <p className="text-xs text-gray-500">{p.category}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="font-bold text-gray-900 text-sm">₹{Math.round(p.price * 83)}</p>
                                                {p.discount > 0 && <p className="text-xs text-green-600 font-bold">{p.discount}% OFF</p>}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {searchQuery && searchResults.length === 0 && (
                                <div className="px-5 py-8 text-center text-gray-400 text-sm">No results found for "{searchQuery}"</div>
                            )}

                            {!searchQuery && (
                                <div className="p-5">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Trending Searches</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Shirts', 'Kurtas', 'Jackets', 'Shoes', 'Pants', 'Tops'].map(t => (
                                            <button key={t} onClick={() => setSearchQuery(t)} className="px-3 py-1.5 bg-gray-100 hover:bg-[#4f46e5]/10 hover:text-[#4f46e5] rounded-full text-sm font-medium transition">
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[80] lg:hidden" onClick={() => setMobileMenuOpen(false)} />
                        <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.25 }} className="fixed left-0 top-0 bottom-0 w-4/5 max-w-sm bg-white z-[90] overflow-y-auto">
                            <div className="p-4 flex justify-between items-center border-b">
                                <span className="text-xl font-black text-[#4f46e5]">VANTAGE</span>
                                <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
                            </div>
                            <div className="p-4 space-y-4">
                                {Object.keys(MEGA_MENU).map(section => (
                                    <div key={section}>
                                        <p className="font-black text-gray-900 mb-2">{section}</p>
                                        <div className="ml-3 space-y-1">
                                            {Object.entries(MEGA_MENU[section]).flatMap(([, items]) => items).slice(0, 4).map(item => (
                                                <Link key={item} to={`/shop/category/${item}`} onClick={() => setMobileMenuOpen(false)} className="block text-gray-500 text-sm py-1 hover:text-[#4f46e5]">{item}</Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t p-4 space-y-3">
                                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 font-bold text-gray-700"><Heart size={18} /> Wishlist ({wishlist.length})</Link>
                                <Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 font-bold text-gray-700"><ShoppingBag size={18} /> Cart ({cartCount})</Link>
                                {user ? (
                                    <button onClick={() => { logout(); setMobileMenuOpen(false); navigate('/'); }} className="flex items-center gap-3 font-bold text-red-500"><User size={18} /> Logout</button>
                                ) : (
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 font-bold text-[#4f46e5]"><User size={18} /> Login</Link>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Mobile Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex lg:hidden">
                {[
                    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, label: 'Home', path: '/' },
                    { icon: <Search size={24} />, label: 'Search', action: () => setSearchOpen(true) },
                    { icon: <Heart size={24} />, label: 'Wishlist', path: '/wishlist', badge: wishlist.length },
                    { icon: <ShoppingBag size={24} />, label: 'Bag', path: '/cart', badge: cartCount },
                    { icon: <User size={24} />, label: 'Profile', path: user ? '/admin' : '/login' },
                ].map(item => (
                    item.action ? (
                        <button key={item.label} onClick={item.action} className="flex-1 flex flex-col items-center justify-center py-2 text-gray-500 hover:text-[#4f46e5] transition gap-0.5">
                            {item.icon}
                            <span className="text-[10px] font-bold">{item.label}</span>
                        </button>
                    ) : (
                        <Link key={item.label} to={item.path} className="flex-1 flex flex-col items-center justify-center py-2 text-gray-500 hover:text-[#4f46e5] transition gap-0.5 relative">
                            {item.icon}
                            <span className="text-[10px] font-bold">{item.label}</span>
                            {item.badge > 0 && <span className="absolute top-1 right-1/4 bg-[#4f46e5] text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{item.badge}</span>}
                        </Link>
                    )
                ))}
            </div>
        </>
    );
};

export default Navbar;
