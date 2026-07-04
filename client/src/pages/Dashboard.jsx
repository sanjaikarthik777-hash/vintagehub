import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { getAdminStats } from '../services/api';
import { DollarSign, Package, Users, Activity, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        } else {
            getAdminStats().then(res => setStats(res.data)).catch(console.error);
        }
    }, [user, navigate]);

    if (!stats) return <div className="min-h-screen pt-20 text-center">Loading Dashboard...</div>;

    const cards = [
        { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: <DollarSign size={24} className="text-purple-500"/> },
        { title: 'Total Orders', value: stats.orders, icon: <Package size={24} className="text-indigo-500"/> },
        { title: 'Active Users', value: stats.activeUsers, icon: <Users size={24} className="text-blue-500"/> },
        { title: 'Site Sessions', value: '1,420', icon: <Activity size={24} className="text-emerald-500"/> },
    ];

    return (
        <div className="min-h-screen pt-10 pb-20 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-black mb-2 dark:text-white">Admin Dashboard</h1>
                    <p className="text-gray-500">Welcome back, {user?.name}</p>
                </div>
                <button 
                    onClick={() => { logout(); navigate('/'); }}
                    className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-500 p-3 rounded-xl font-bold hover:bg-red-100 hover:text-red-600 transition"
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {cards.map((card, idx) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4"
                    >
                        <div className="w-14 h-14 rounded-full bg-gray-50 dark:bg-slate-900 flex items-center justify-center shrink-0">
                            {card.icon}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">{card.title}</p>
                            <h3 className="text-2xl font-black dark:text-white">{card.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-6 dark:text-white">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border-spacing-0">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="p-4 text-gray-500 font-bold uppercase text-xs tracking-wider">Order ID</th>
                                <th className="p-4 text-gray-500 font-bold uppercase text-xs tracking-wider">Customer</th>
                                <th className="p-4 text-gray-500 font-bold uppercase text-xs tracking-wider">Amount</th>
                                <th className="p-4 text-gray-500 font-bold uppercase text-xs tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders.map((order, i) => (
                                <tr key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                                    <td className="p-4 font-bold dark:text-white">{order.id}</td>
                                    <td className="p-4 text-gray-600 dark:text-gray-300">{order.user}</td>
                                    <td className="p-4 font-bold dark:text-white">${order.amount.toFixed(2)}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            order.status === 'Shipped' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
