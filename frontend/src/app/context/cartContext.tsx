'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartContextType {
    cart: CartItem[];
    form: FormData;
    addToCart: (product: Product, quantity: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    clearFormData: ()=> void;
    updateFormData: (newData: FormData) => void;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    address1: string;
    address2: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    cardholderName: string;
    cardNumber: string;
    selectedDate: string;
    cvv: string;
    shippingOption: string;
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
    console.log("cart context", context)
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
    const [form, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        address1: '',
        address2: '',
        postalCode: '',
        country: '',
        phoneNumber: '',
        cardholderName: '',
        cardNumber: '',
        selectedDate: '',
        cvv: '',
        shippingOption: '5',
    });

    // Load cart data from localStorage when the component is mounted
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }

        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }
    }, []);

    // Save cart data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(form));
    },);


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

    const clearFormData = () => {
        setFormData({
            // Initialize with empty values
            firstName: '',
            lastName: '',
            email: '',
            address1: '',
            address2: '',
            postalCode: '',
            country: '',
            phoneNumber: '',
            cardholderName: '',
            cardNumber: '',
            cvv: '',
            selectedDate: '',
            shippingOption: '',
        });
        // Clear the stored form data from local storage
        localStorage.removeItem('formData');
    };

    const updateFormData = (newData: FormData) => {
        setFormData(newData);
    };

    const contextValue: CartContextType = {
        cart,
        form,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        updateFormData,
        clearFormData
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};