import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
    const data = localStorage.getItem('ecommerce-auth');
    if (data) {
        try {
            const parsed = JSON.parse(data);
            if (parsed.state && parsed.state.token) {
                config.headers.Authorization = `Bearer ${parsed.state.token}`;
            }
        } catch(e) {}
    }
    return config;
});

export const getProducts = (params) => api.get('/products', { params });
export const getHighlights = () => api.get('/products/highlights');
export const getProductById = (id) => api.get(`/products/${id}`);
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const checkout = (data) => api.post('/orders/checkout', data);
export const getAdminStats = () => api.get('/admin/stats');

export default api;
