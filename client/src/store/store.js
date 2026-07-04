import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Wishlist Store
export const useWishlistStore = create(
    persist(
        (set, get) => ({
            wishlist: [],
            addToWishlist: (product) => set((state) => {
                if (state.wishlist.find(p => p.id === product.id)) return state;
                return { wishlist: [...state.wishlist, product] };
            }),
            removeFromWishlist: (productId) => set((state) => ({
                wishlist: state.wishlist.filter(p => p.id !== productId)
            })),
            isWishlisted: (productId) => get().wishlist.some(p => p.id === productId),
            toggleWishlist: (product) => {
                const isIn = get().wishlist.some(p => p.id === product.id);
                if (isIn) get().removeFromWishlist(product.id);
                else get().addToWishlist(product);
            }
        }),
        { name: 'ecommerce-wishlist' }
    )
);

// Recently Viewed Store
export const useRecentlyViewedStore = create(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => set((state) => {
                const filtered = state.items.filter(p => p.id !== product.id);
                return { items: [product, ...filtered].slice(0, 10) };
            }),
        }),
        { name: 'ecommerce-recent' }
    )
);

export const useAppStore = create((set) => ({
    darkMode: true,
    toggleDarkMode: () => set((state) => {
        const newMode = !state.darkMode;
        if (newMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        return { darkMode: newMode };
    })
}));

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product, size, color) => set((state) => {
                const existing = state.cart.find(
                    (item) => item.product.id === product.id && item.size === size && item.color.name === color.name
                );
                if (existing) {
                    return {
                        cart: state.cart.map((item) =>
                            item.product.id === product.id && item.size === size && item.color.name === color.name
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    };
                }
                return { cart: [...state.cart, { product, size, color, quantity: 1 }] };
            }),
            removeFromCart: (productId, size, colorName) => set((state) => ({
                cart: state.cart.filter(
                    (item) => !(item.product.id === productId && item.size === size && item.color.name === colorName)
                ),
            })),
            updateQuantity: (productId, size, colorName, amount) => set((state) => ({
                cart: state.cart.map((item) => {
                    if (item.product.id === productId && item.size === size && item.color.name === colorName) {
                        return { ...item, quantity: Math.max(1, item.quantity + amount) };
                    }
                    return item;
                })
            })),
            clearCart: () => set({ cart: [] }),
            getCartTotal: () => {
                return get().cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
            }
        }),
        {
            name: 'ecommerce-cart',
        }
    )
);

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: (userData, token) => set({ user: userData, token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'ecommerce-auth',
        }
    )
);
