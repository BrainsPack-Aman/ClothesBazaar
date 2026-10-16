
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../types/Product";
import {
  addToCart,
  decreaseQuantity,
} from "../features/Cart/CartSlice";
import "../CardModel.css";
import "../ProductCard.css";
import type { RootState } from "../redux/store";

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal = ({
  product,
  onClose,
}: ProductDetailModalProps) => {
  const dispatch = useDispatch();

  const cartProducts = useSelector(
    (state: RootState) => state.cart.products
  );

  const cartItem = cartProducts.find(
    (item) => item.id === product.id
  );

  const quantity = cartItem?.quantity ?? 0;

 

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  function decreaseCartQuantity() {
    dispatch(decreaseQuantity(product.id));
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div
        className="product-detail-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <h2>Product Details</h2>

          <button
            className="cart-close"
            onClick={onClose}
            aria-label="Close product details"
          >
            &times;
          </button>
        </div>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.imageUrl} alt={product.title} />
          </div>

          <div className="product-detail-info">
            <p className="detail-brand">{product.brand}</p>

            <h2>{product.title}</h2>

            <p className="detail-category">
              Category: {product.category}
            </p>

            <p className="detail-rating">
              ⭐ {product.rating} / 5
            </p>

            <div className="detail-prices">
              <span className="detail-price">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

            
            </div>

            <p className="detail-description">
              {product.description}
            </p>

            <div className="detail-section">
              <strong>Available Colours</strong>

              <div className="detail-options">
                {product.colours.map((colour) => (
                  <span className="detail-option" key={colour}>
                    {colour}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <strong>Available Sizes</strong>

              <div className="detail-options">
                {product.sizes.map((size) => (
                  <span className="detail-option" key={size}>
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <p
              className={
                product.inStock
                  ? "detail-stock in-stock"
                  : "detail-stock out-of-stock"
              }
            >
              {product.inStock
                ? " In Stock"
                : "Currently Out of Stock"}
            </p>

            {product.isNew && (
              <span className="detail-new-badge">NEW ARRIVAL</span>
            )}

            {product.inStock && (
              <div className="detail-cart-controls">
                {quantity === 0 ? (
                  <button
                    className="add-to-cart-button"
                    style={{
                        padding:10,
                        border:"none",
                        borderRadius:10
                    }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={decreaseCartQuantity}
                      aria-label={`Decrease ${product.title} quantity`}
                    >
                      −
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={handleAddToCart}
                      aria-label={`Increase ${product.title} quantity`}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
