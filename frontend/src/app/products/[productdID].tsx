// pages/products/[productId].tsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import { productsData } from './productData'; // Make sure this path is correct

export default function ProductDetail() {
    const router = useRouter();
    const { productId } = router.query;

    // You can use the `productId` parameter to fetch the specific product data
    const product = productsData.find(p => p.id === productId);

    if (!product) {
        // Handle the case when the product is not found
        return <div>Product not found</div>;
    }

    return (
        <main>
            <div className="product-detail">
                <Image src={product.imageSrc} alt={product.name} width={300} height={300} />
                <h2>{product.name}</h2>
                <p>{product.price}</p>
            </div>
        </main>
    );
}
