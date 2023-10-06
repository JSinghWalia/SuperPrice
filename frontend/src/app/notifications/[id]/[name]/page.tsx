'use client';
import { usePathname } from 'next/navigation'
import React from "react"
import Image from 'next/image';
// import { productsData } from '../productData'; // Make sure this path is correct
import { Navbar } from '../../../components/navbar';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../../context/cartContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function ProductDetail() {
    const pathname = usePathname();
    const pathParts = pathname.split('/');
    const productName = pathParts[pathParts.length - 1];
    const productId = parseInt(pathParts[pathParts.length -2]);
    const [productsData, setProductData] = React.useState([]);
    const urlAPI = 'http://localhost:8080' + "/" + productName;

    const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
    const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleSetQuantity = (value: number) => {
        setQuantity(value);
    };

    const handleSuccessAlertClose = () => {
        setIsSuccessAlertOpen(false);
    };

    const handleErrorAlertClose = () => {
        setIsErrorAlertOpen(false);
    };


    async function getProductData() {
        try {
            const res = await fetch(urlAPI);
            if (!res.ok) {
                throw new Error(`Network response was not ok (${res.status} - ${res.statusText})`);
            }
            const testData = await res.json();
            setProductData(testData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    React.useEffect(() => {
        getProductData();
    }, []);

    let product = productsData.find(product => productId===product.id);


    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const quantityInput = document.getElementById('quantity') as HTMLInputElement;
        const quantity = quantityInput ? parseInt(quantityInput.value) : 0;

        if (quantity <= 0) {
            // Show error alert for invalid quantity
            setIsErrorAlertOpen(true);
            setAlertMessage('Please enter a valid quantity');
        } else if (product) {
            addToCart(product, quantity);

            // Show success alert for item added to cart
            setIsSuccessAlertOpen(true);
            setAlertMessage('Item added to cart');
            setQuantity(0);
        } else {
            // Handle the case when the product is not found
            console.error('Product not found');
        }
    };


    if (!product) {
        // Handle the case when the product is not found
        return <div>Product not found</div>;
    }
    async function handleToggleNotification(productId, currentNotification) {
        try {
            const url = `http://localhost:8080/update_notification/${productId}/${currentNotification ? 'OFF' : 'ON'}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notification: !currentNotification }), // Toggle the notification
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status} - ${response.statusText})`);
            }

            // Update the product list to reflect the new notification status
            const updatedProductsData = productsData.map(product => {
                if (product.id === productId) {
                    return { ...product, notification: !currentNotification };
                }
                return product;
            });
        } catch (error) {
            console.error("Error toggling notification:", error);
        }
    }

    // // State to track the selected image
    // const [selectedImage, setSelectedImage] = useState(product.imageURL);

    // // Function to handle image selection
    // const handleImageClick = (imageSrc: string) => {
    //     setSelectedImage(imageSrc);
    // };
    return (
        <>
        {
            <main className="container mx-auto p-4"><Navbar activePath="Products" />
                <h2 className="text-3xl font-semibold mb-4 text-center">{product.name}</h2>
                <div className="flex flex-col lg:flex-row">
                    {/* Left Section */}
                    <div className="lg:w-1/2 lg:pr-4 mb-4">
                        <div className="mb-4">
                            <Image src={product.imageURL} alt={product.name} width={400} height={400} />
                        </div>
                        {/* Image Picker */}
                        {/* <div className="flex space-x-4">
                            {product.images.map((image: string, index: any) => (
                            <div
                            key={index}
                            onClick={() => handleImageClick(image)}
                            className={`cursor-pointer border ${selectedImage === image ? 'border-blue-500' : 'border-gray-200'
                            } p-2 rounded-md hover:border-blue-500`}
                            >
                            <Image src={image} alt={product.name} width={100} height={100} />
                            </div>
                            ))}
                            </div> */}
                    </div>
                    {/* Right Section */}
                    <div className="lg:w-1/2 lg:pl-4">
                        <div className="mb-4">
                            {product.discount && (
                                <div className="text-red-600 text-2xl font-semibold">Now: ${(product.price - (product.price * product.discount)).toFixed(2)}</div>
                            )}
                            <div className="text-600 font-semibold">Originally: ${product.price}</div>
                        </div>

                        <div className="mb-4">
                        <p className="text-xl mb-4">{product.description}</p>
                        </div>
                        <div className="mb-4">
                        <p className="text-xl mb-4">Store: {product.store}</p>
                        </div>
                        <div className="flex items-center space-x-4 mb-4 mt-4">
                            <div>
                                <label htmlFor="quantity" className="block text-gray-600">Quantity: </label>
                                <input type="number" id="quantity" className="border rounded-md p-2 w-16 text-black" 
                                onChange={(e) => handleSetQuantity(parseInt(e.target.value))} value={quantity}/>
                            </div>
                            <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add to Cart <ShoppingCartIcon className="h-6 w-6" /></button>
                                <Snackbar open={isSuccessAlertOpen} autoHideDuration={3000} onClose={handleSuccessAlertClose}>
                                    <Alert onClose={handleSuccessAlertClose} severity="success">
                                        {alertMessage}
                                    </Alert>
                                </Snackbar>
                            <button
                                className="notification-toggle-button"
                                onClick={() => handleToggleNotification(product.id, product.notification)}
                            >
                                {product.notification ? 'Turn Off Notification' : 'Turn On Notification'}
                            </button>
                                <Snackbar open={isErrorAlertOpen} autoHideDuration={3000} onClose={handleErrorAlertClose}>
                                    <Alert onClose={handleErrorAlertClose} severity="error">
                                        {alertMessage}
                                    </Alert>
                                </Snackbar>

                        </div>
                    </div>
                </div>
                    <Typography variant='h4' style={{ fontSize: '30px' }} color="primary">
                        Other Related Items
                    </Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {productsData.map((product) => (
                            <Link key={product.id} href={`/products/${product.id}/${product.name}`}>
                                <Card key={product.id} style={{ width: '300px', margin: '16px' }}>
                                    <img src={product.imageURL} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Price: ${product.price}
                                        </Typography>
                                        {product.discount && (
                                            <Typography variant="body2" color="error" style={{ fontWeight: 'bold' }}>
                                                New Price: ${(product.price - (product.price * product.discount)).toFixed(2)}
                                            </Typography>
                                        )}
                                        <Typography variant="body2" color="text.secondary">
                                            Store: {product.store}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

            </main>
                
        
        }
        </>
    );
}

