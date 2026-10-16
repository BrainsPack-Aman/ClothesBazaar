
import type { Product } from '../types/Product';
import '../ProductCard.css';
import type { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist ,removeFromWishList} from '../features/Wishlist/WishList';
import {
  addToCart,
  decreaseQuantity,
} from '../features/Cart/CartSlice';
import { useState } from 'react';

import ProductDetailModal from '../Models/ProductDetailModal';

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const cartProducts = useSelector(
    (state: RootState) => state.cart.products
  );

  const [heartColor, setHeartColor] = useState('🤍');

  const cartItem = cartProducts.find(
    (item) => item.id === product.id
  );

  const quantity = cartItem?.quantity ?? 0;

  function wishListhandler() {
    
    if(heartColor === "🤍"){
      dispatch(addToWishlist(product));
        setHeartColor("❤️")
    }else{
      dispatch(removeFromWishList(product));
        setHeartColor("🤍")
    }
  }

  function cartHandler() {
    dispatch(addToCart(product));
  }

  function decreaseCartQuantity() {
    dispatch(decreaseQuantity(product.id));
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.title} 
        onClick={() => setIsDetailOpen(true)}
        style={{ cursor: "pointer" }}
        />

        <p

          className="wishlist-button"
          onClick={wishListhandler}
          aria-label="Toggle wishlist"
        >
          {heartColor}
        </p>
      </div>

      <div className="product-details">
        <h3>{product.title}</h3>
        <p>{product.description}</p>

        <div className="product-footer">
          <p className="price">
            Price: ₹{product.price.toFixed(2)}
          </p>

          {quantity === 0 ? (
            <button
              className="add-to-cart-button"
              onClick={cartHandler}
            >
              Add to Cart
            </button>
          ) : (
            <div className="quantity-controls">
              <button
                type="button"
                onClick={decreaseCartQuantity}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={cartHandler}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {isDetailOpen && (
  <ProductDetailModal
    product={product}
    onClose={() => setIsDetailOpen(false)}
   />
        )}
    </div>
  );
};

export default ProductCard;
