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


    async function getShoppingCart() {
        try {
            const res = await fetch("http://localhost:8080/cart/4");
            if (!res.ok) {
                throw new Error(`Network response was not ok (${res.status} - ${res.statusText})`);
            }
            const apiData = await res.json();
            // Transform the API response into an array of CartItem objects
            const cartItems: CartItem[] = apiData.map((item: any) => ({
                product: {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    imageURL: item.imageURL,
                },
                quantity: item.quantity,
            }));

            setCart(cartItems);
            console.log("cart2: ", cartItems);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    async function updateCartOnServer(updatedCart: CartItem[]) {
        try {
            const res = await fetch("http://localhost:8080/cart/add?quantity=2&cartId=4&productId=4", {
                method: "POST",
            });

            if (!res.ok) {
                throw new Error(`Network response was not ok (${res.status} - ${res.statusText})`);
            }

            const updatedData = await res.json();
            console.log("updatedData: ", updatedData)
            setCart(updatedData);
        } catch (error) {
            console.error("Error updating cart on the server:", error);
        }
    }

    // Load cart data from localStorage when the component is mounted
    useEffect(() => {
        getShoppingCart();
    }, []);

    // Save cart data to localStorage whenever it changes
    useEffect(() => {
        // localStorage.setItem('cart', JSON.stringify(cart));
        getShoppingCart();
    }, [cart]);

    const addToCart = (product: Product, quantity: number) => {
        // // Find the index of the product in the cart
        // const index = cart.findIndex((item) => item.product.id === product.id);

        // if (index !== -1) {
        //     // If the product is already in the cart, update its quantity
        //     const updatedCart = [...cart];
        //     updatedCart[index].quantity += quantity;
        //     setCart(updatedCart);
        // } else {
        //     // If the product is not in the cart, add it
        //     setCart([...cart, { product, quantity }]);
        // }
        updateCartOnServer(cart);
    };

    const removeFromCart = (productId: number) => {
        const updatedCart = cart.filter((item) => item.product.id !== productId);
        setCart(updatedCart);
        updateCartOnServer(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
        updateCartOnServer([]);
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
        updateCartOnServer(updatedCart);
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
        updateCartOnServer(updatedCart);
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
