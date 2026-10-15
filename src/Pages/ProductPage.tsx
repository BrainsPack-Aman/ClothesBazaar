import ProductCard from "../components/ProductCard";
import { useSelector } from 'react-redux'
import type {Product} from '../types/Product';
import '../ProductPage.css'




const ProductPage = () => {

    
    const products = useSelector((state: { products: { products: Product[] } }) => state.products.products);
  return (
    <div className="product-container">
         {products.length === 0 ? (
            <p>No products found.</p>
        ) : (
            products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))
        )}
       
    </div>
  )
};


export default ProductPage;

