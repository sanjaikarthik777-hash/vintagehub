import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts, getHighlights } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ChevronRight, Flame, Sparkles, TrendingUp } from 'lucide-react';

const HERO_SLIDES = [
    {
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
        title: 'Summer\nCollection',
        subtitle: '2025',
        tag: 'UP TO 70% OFF',
        cta: 'Shop Women',
        link: '/shop/gender/women',
        align: 'left',
        accent: '#4f46e5',
    },
    {
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
        title: 'New\nArrivals',
        subtitle: 'Men\'s Edit',
        tag: 'FRESH DROPS',
        cta: 'Shop Men',
        link: '/shop/gender/men',
        align: 'right',
        accent: '#3b82f6',
    },
    {
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
        title: 'Festival\nSale',
        subtitle: 'Up to 80% Off',
        tag: 'ENDS SOON',
        cta: 'Shop Now',
        link: '/shop',
        align: 'left',
        accent: '#f59e0b',
    },
];

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setCurrent(i => (i + 1) % HERO_SLIDES.length), 5000);
        return () => clearInterval(interval);
    }, []);

    const slide = HERO_SLIDES[current];

    return (
        <div className="relative w-full h-[380px] md:h-[500px] overflow-hidden bg-gray-100 mb-12">
            {HERO_SLIDES.map((s, i) => (
                <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-${s.align === 'left' ? 'r' : 'l'} from-black/70 via-black/30 to-transparent`} />
                </div>
            ))}

            <div className={`absolute inset-0 flex items-center ${slide.align === 'left' ? 'justify-start pl-10 md:pl-20' : 'justify-end pr-10 md:pr-20'}`}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: slide.align === 'left' ? -40 : 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-white max-w-md"
                >
                    <span className="inline-block mb-3 text-xs font-black tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: slide.accent }}>
                        {slide.tag}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black leading-none mb-2 whitespace-pre-line tracking-tighter">
                        {slide.title}
                    </h1>
                    <p className="text-lg md:text-2xl font-light mb-6 text-white/80">{slide.subtitle}</p>
                    <Link to={slide.link} className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3.5 font-black text-sm rounded-full hover:bg-gray-100 transition-all hover:gap-3 hover:shadow-lg group">
                        {slide.cta} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5">
                {HERO_SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const SectionHeader = ({ icon, title, subtitle, link }) => (
    <div className="flex justify-between items-end mb-5 px-1">
        <div className="flex items-center gap-2">
            {icon}
            <div>
                <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider">{title}</h2>
                {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
        </div>
        {link && (
            <Link to={link} className="flex items-center gap-1 text-sm font-bold text-[#4f46e5] hover:gap-2 transition-all">
                View All <ChevronRight size={14} />
            </Link>
        )}
    </div>
);

const Home = () => {
    const [products, setProducts] = useState([]);
    const [trending, setTrending] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [resProducts, resHighlights] = await Promise.all([
                    getProducts({ limit: 30 }),
                    getHighlights()
                ]);
                setProducts(resProducts.data.data);
                setTrending(resHighlights.data.trending || []);
                setBestSellers(resHighlights.data.bestSellers || []);
                setNewArrivals(resHighlights.data.newArrivals || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const HorizontalScroll = ({ items }) => (
        <div className="flex overflow-x-auto gap-3 pb-4 hide-scrollbar snap-x px-1">
            {items.map(p => (
                <div key={p.id} className="min-w-[180px] md:min-w-[220px] snap-start shrink-0">
                    <ProductCard product={p} />
                </div>
            ))}
        </div>
    );

    const SkeletonRow = () => (
        <div className="flex gap-3 pb-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="min-w-[200px] aspect-[3/4] bg-gray-200 animate-pulse rounded shrink-0" />
            ))}
        </div>
    );

    const SkeletonGrid = () => (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse rounded" />
            ))}
        </div>
    );

    return (
        <div className="min-h-screen pb-24 md:pb-8">
            {/* Hero */}
            <HeroCarousel />

            <div className="max-w-[1600px] mx-auto px-4 lg:px-8">

                {/* Category Quick Links */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-12">
                    {[
                        { label: 'Men', img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200&q=80', link: '/shop/gender/men' },
                        { label: 'Women', img: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWVufGVufDB8fDB8fHww', link: '/shop/gender/women' },
                        { label: 'Shirts', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=80', link: '/shop/category/Shirts' },
                        { label: 'Shoes', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80', link: '/shop/category/Shoes' },
                        { label: 'Jackets', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80', link: '/shop/category/Jackets' },
                        { label: 'Kurtas', img: 'https://images.unsplash.com/photo-1760287363878-1a09af715b80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWVuJTIwa3VydGF8ZW58MHx8MHx8fDA%3D', link: '/shop/category/Kurtas' },
                    ].map(c => (
                        <Link key={c.label} to={c.link} className="flex flex-col items-center gap-2 group">
                            <div className="w-full aspect-square rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-[#4f46e5] transition-all">
                                <img src={c.img} alt={c.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <span className="text-xs font-bold text-gray-700 group-hover:text-[#4f46e5] transition">{c.label}</span>
                        </Link>
                    ))}
                </div>

                {/* Trending Now */}
                {(loading || trending.length > 0) && (
                    <section className="mb-12">
                        <SectionHeader
                            icon={<Flame size={22} className="text-orange-500" />}
                            title="Trending Now"
                            subtitle="Most loved this week"
                            link="/shop?tags=Trending"
                        />
                        {loading ? <SkeletonRow /> : <HorizontalScroll items={trending} />}
                    </section>
                )}

                {/* New Arrivals */}
                {(loading || newArrivals.length > 0) && (
                    <section className="mb-12">
                        <SectionHeader
                            icon={<Sparkles size={22} className="text-purple-500" />}
                            title="New Arrivals"
                            subtitle="Fresh off the runway"
                            link="/shop?tags=New+Arrival"
                        />
                        {loading ? <SkeletonRow /> : <HorizontalScroll items={newArrivals} />}
                    </section>
                )}

                {/* Best Sellers */}
                {(loading || bestSellers.length > 0) && (
                    <section className="mb-12">
                        <SectionHeader
                            icon={<TrendingUp size={22} className="text-green-500" />}
                            title="Best Sellers"
                            subtitle="Top rated by community"
                            link="/shop?sort=rating"
                        />
                        {loading ? <SkeletonRow /> : <HorizontalScroll items={bestSellers} />}
                    </section>
                )}

                {/* Divider Banner */}
                <div className="mb-12 rounded-2xl overflow-hidden relative h-40 md:h-52 bg-gray-900">
                    <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80" alt="Promo" className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                        <p className="text-xs font-black tracking-[0.3em] mb-2 text-[#4f46e5]">EXCLUSIVE DEAL</p>
                        <h3 className="text-3xl md:text-5xl font-black">FLAT 50% OFF</h3>
                        <p className="text-sm text-white/70 mt-1">On Selected Categories — Limited Time Only</p>
                    </div>
                </div>

                {/* All Products Grid */}
                <section>
                    <SectionHeader
                        icon={null}
                        title="Recommended For You"
                        subtitle="Curated based on latest trends"
                        link="/shop"
                    />
                    {loading ? <SkeletonGrid /> : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-8">
                            {products.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Home;
