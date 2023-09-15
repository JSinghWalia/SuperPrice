'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

interface CartItem {
    product: Product;
    quantity: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    imageURL: string;
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};


interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart data from localStorage when the component is mounted
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Save cart data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, quantity: number) => {
        // Find the index of the product in the cart
        const index = cart.findIndex((item) => item.product.id === product.id);

        if (index !== -1) {
            // If the product is already in the cart, update its quantity
            const updatedCart = [...cart];
            updatedCart[index].quantity += quantity;
            setCart(updatedCart);
        } else {
            // If the product is not in the cart, add it
            setCart([...cart, { product, quantity }]);
        }
    };

    const removeFromCart = (productId: number) => {
        const updatedCart = cart.filter((item) => item.product.id !== productId);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const increaseQuantity = (productId: number) => {
        const updatedCart = cart.map((item) => {
            if (item.product.id === productId) {
                return { ...item, quantity: item.quantity + 1 };
            } else {
                return item;
            }
        });
        setCart(updatedCart);
    }

    const decreaseQuantity = (productId: number) => {
        const updatedCart = cart.map((item) => {
            if (item.product.id === productId) {
                return { ...item, quantity: item.quantity - 1 };
            } else {
                return item;
            }
        });
        setCart(updatedCart);
    }

    const contextValue: CartContextType = {
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
