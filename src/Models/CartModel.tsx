
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import "../CardModel.css";
import {
  decreaseQuantity,
  addToCart,
} from "../features/Cart/CartSlice";


interface CartModalProps {
  onClose: () => void;
}

const CartModal = ({ onClose }: CartModalProps) => {
  const dispatch = useDispatch();

  const cartProducts = useSelector(
    (state: RootState) => state.cart.products
  );

  const totalItems = cartProducts.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div
        className="cart-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <h2>My Cart ({totalItems})</h2>

          <button className="cart-close" onClick={onClose}>
            &times;
          </button>
        </div>

        {cartProducts.length === 0 ? (
          <p className="empty-cart">
            Your cart is empty. Start shopping!
          </p>
        ) : (
          <>
            <div className="cart-items">
              {cartProducts.map((product) => (
                <div className="cart-item" key={product.id}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                  />

                  <div className="cart-item-details">
                    <h3>{product.title}</h3>
                    <p>₹{product.price.toFixed(2)} each</p>

                    <strong>
                      ₹{(
                        product.price * product.quantity
                      ).toFixed(2)}
                    </strong>
                  </div>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(decreaseQuantity(product.id))
                      }
                      
                    >
                      −
                    </button>

                    <span>{product.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(addToCart(product))
                      }
                     
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <h3>Total: ₹{totalPrice.toFixed(2)}</h3>

              <button className="checkout-button">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
