import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { login } from '../services/api';
import { motion } from 'framer-motion';
import { User, Lock, ExternalLink } from 'lucide-react';

const Login = () => {
    const { login: setAuthLogin } = useAuthStore();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('admin@shop.com');
    const [password, setPassword] = useState('admin');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await login({ email, password });
            setAuthLogin(res.data.user, res.data.token);
            if (res.data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate(-1); // Back to previous
            }
        } catch (err) {
            setError("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 flex justify-center items-center pb-32">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                        <User size={24} className="text-white" />
                    </div>
                    
                    <h1 className="text-3xl font-black mb-2 dark:text-white">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">Sign in to access your VANTAGE account.</p>
                    
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-4 rounded-xl mb-6 font-medium text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <div className="relative">
                                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white font-medium" 
                                    required 
                                  />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Password</label>
                                <a href="#" className="text-sm font-bold text-indigo-500 hover:underline">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white font-medium" 
                                    required 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-bold mt-4 shadow-xl hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current"></div> : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800">
                            <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <ExternalLink size={12}/> Demo Credentials
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <strong>Admin:</strong> admin@shop.com / admin<br/>
                                <strong>User:</strong> user@shop.com / user
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
