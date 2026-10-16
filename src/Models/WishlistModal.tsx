
import { useSelector } from "react-redux";
import type { Product } from "../types/Product";
import "../WishListModal.css";


interface WishlistModalProps {
  onClose: () => void;
}

const WishlistModal = ({ onClose }: WishlistModalProps) => {
  const wishlistProducts = useSelector(
    (state : { wishlist: { products: Product[] } }) => state.wishlist.products
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="wishlist-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2>My Wishlist ({wishlistProducts.length})</h2>

          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        {wishlistProducts.length === 0 ? (
          <p className="empty-wishlist">
            Your wishlist is empty. Add some products!
          </p>
        ) : (
          <div className="wishlist-items">
            {wishlistProducts.map((product) => (
              <div className="wishlist-item" key={product.id}>
                <img src={product.imageUrl} alt={product.title} />

                <div className="wishlist-item-details">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <strong>₹{product.price.toFixed(2)}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistModal;
