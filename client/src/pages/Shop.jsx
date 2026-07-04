import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const PRICE_RANGES = [
    { label: 'Under ₹500', min: 0, max: 500 },
    { label: '₹500 – ₹1,000', min: 500, max: 1000 },
    { label: '₹1,000 – ₹3,000', min: 1000, max: 3000 },
    { label: '₹3,000 – ₹5,000', min: 3000, max: 5000 },
    { label: 'Above ₹5,000', min: 5000, max: Infinity },
];

const SORT_OPTIONS = [
    { label: 'Recommended', value: '' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Customer Rating', value: 'rating' },
    { label: 'Newest First', value: 'new' },
];

const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-100 py-4">
            <button onClick={() => setOpen(o => !o)} className="flex items-center justify-between w-full">
                <span className="font-black text-sm text-gray-900 uppercase tracking-wider">{title}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-3 space-y-2">
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Shop = () => {
    const { category, gender: paramGender } = useParams();
    const [searchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Filter State
    const [sort, setSort] = useState('');
    const [selectedGenders, setSelectedGenders] = useState(paramGender ? [paramGender.charAt(0).toUpperCase() + paramGender.slice(1)] : []);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    
    useEffect(() => {
        if (paramGender) setSelectedGenders([paramGender.charAt(0).toUpperCase() + paramGender.slice(1)]);
    }, [paramGender]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = {
                    category: category || searchParams.get('category') || '',
                    gender: selectedGenders.length === 1 ? selectedGenders[0] : '',
                    search: searchParams.get('search') || '',
                    sort: sort,
                    limit: 60,
                };
                const res = await getProducts(params);
                let data = res.data.data;
                
                // Client-side price filter
                if (selectedPriceRange) {
                    data = data.filter(p => {
                        const inrPrice = p.price * 83;
                        return inrPrice >= selectedPriceRange.min && inrPrice <= selectedPriceRange.max;
                    });
                }
                
                setProducts(data);
                setTotal(res.data.total);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, paramGender, selectedGenders, sort, selectedPriceRange, searchParams]);

    const toggleGender = (g) => {
        setSelectedGenders(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
    };

    const clearFilters = () => {
        setSelectedGenders([]);
        setSelectedPriceRange(null);
        setSort('');
    };

    const hasFilters = selectedGenders.length > 0 || selectedPriceRange || sort;
    
    const pageTitle = category || (paramGender ? paramGender.charAt(0).toUpperCase() + paramGender.slice(1) : searchParams.get('search') ? `"${searchParams.get('search')}"` : 'All Products');

    const FiltersContent = () => (
        <div className="text-sm">
            {hasFilters && (
                <button onClick={clearFilters} className="text-[#4f46e5] font-bold text-xs uppercase tracking-wider mb-3 block">CLEAR ALL</button>
            )}

            <FilterSection title="Gender">
                {['Men', 'Women', 'Unisex'].map(g => (
                    <label key={g} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={selectedGenders.includes(g)}
                            onChange={() => toggleGender(g)}
                            className="w-4 h-4 accent-[#4f46e5] rounded"
                        />
                        <span className={`text-sm transition-colors ${selectedGenders.includes(g) ? 'font-bold text-gray-900' : 'text-gray-500 group-hover:text-gray-800'}`}>{g}</span>
                    </label>
                ))}
            </FilterSection>

            <FilterSection title="Price Range">
                {PRICE_RANGES.map(range => (
                    <label key={range.label} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                            type="radio"
                            name="price"
                            checked={selectedPriceRange?.label === range.label}
                            onChange={() => setSelectedPriceRange(range)}
                            className="w-4 h-4 accent-[#4f46e5]"
                        />
                        <span className={`text-sm transition-colors ${selectedPriceRange?.label === range.label ? 'font-bold text-gray-900' : 'text-gray-500 group-hover:text-gray-800'}`}>{range.label}</span>
                    </label>
                ))}
                {selectedPriceRange && (
                    <button onClick={() => setSelectedPriceRange(null)} className="text-xs text-[#4f46e5] font-bold mt-1">Clear</button>
                )}
            </FilterSection>

            <FilterSection title="Sort By" defaultOpen={false}>
                {SORT_OPTIONS.map(o => (
                    <label key={o.value} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                            type="radio"
                            name="sort"
                            checked={sort === o.value}
                            onChange={() => setSort(o.value)}
                            className="w-4 h-4 accent-[#4f46e5]"
                        />
                        <span className={`text-sm transition-colors ${sort === o.value ? 'font-bold text-gray-900' : 'text-gray-500 group-hover:text-gray-800'}`}>{o.label}</span>
                    </label>
                ))}
            </FilterSection>
        </div>
    );

    return (
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6 pb-24 md:pb-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-black capitalize text-gray-900">{pageTitle}</h1>
                    <p className="text-gray-400 text-sm mt-0.5">{loading ? '...' : `${products.length} Items`}</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setMobileSidebarOpen(true)}
                        className="lg:hidden flex items-center gap-1.5 text-sm font-bold border border-gray-200 px-3 py-2 rounded-lg hover:border-gray-400 transition"
                    >
                        <SlidersHorizontal size={16} /> Filters
                        {hasFilters && <span className="bg-[#4f46e5] text-white w-4 h-4 rounded-full text-[10px] font-black flex items-center justify-center">{(selectedGenders.length + (selectedPriceRange ? 1 : 0) + (sort ? 1 : 0))}</span>}
                    </button>

                    {/* Sort dropdown (desktop) */}
                    <div className="hidden lg:block relative group">
                        <button className="flex items-center gap-2 text-sm font-bold border border-gray-200 px-4 py-2 rounded-lg hover:border-gray-400 transition">
                            Sort: {SORT_OPTIONS.find(o => o.value === sort)?.label} <ChevronDown size={14} />
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            {SORT_OPTIONS.map(o => (
                                <button key={o.value} onClick={() => setSort(o.value)} className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition ${sort === o.value ? 'font-black text-[#4f46e5]' : 'font-medium text-gray-700'}`}>
                                    {o.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Sidebar - Desktop */}
                <aside className="hidden lg:block w-56 shrink-0">
                    <div className="sticky top-24">
                        <h2 className="font-black text-gray-900 text-lg mb-4 flex items-center gap-2">
                            <Filter size={18} /> Filters
                        </h2>
                        <FiltersContent />
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1 min-w-0">
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="animate-pulse bg-gray-200 aspect-[3/4] w-full rounded" />
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-28 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                <Filter size={36} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                            <p className="text-gray-400 mb-5">Try adjusting or clearing your filters.</p>
                            <button onClick={clearFilters} className="bg-[#4f46e5] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#4338ca] transition">
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8"
                        >
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {mobileSidebarOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[70]" onClick={() => setMobileSidebarOpen(false)} />
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }} className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white z-[80] overflow-y-auto">
                            <div className="flex justify-between items-center px-5 py-4 border-b sticky top-0 bg-white">
                                <span className="font-black text-gray-900 text-lg flex items-center gap-2"><Filter size={18}/> Filters</span>
                                <button onClick={() => setMobileSidebarOpen(false)}><X size={22} /></button>
                            </div>
                            <div className="p-5"><FiltersContent /></div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Shop;
