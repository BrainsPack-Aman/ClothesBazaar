
import "../navbar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProducts } from "../features/Product/ProductSlice";
import WishlistModal from "../Models/WishlistModal";
import CartModal from "../Models/CartModel";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleSearch() {
    dispatch(searchProducts(searchTerm));
  }

  function handleWishlist() {
  setIsCartOpen(false);
  setIsWishlistOpen(true);
}

function handleCart() {
  setIsWishlistOpen(false);
  setIsCartOpen(true);
}

  return (
    <>
      <div className="navbar">
        <h1>ClothesBazaar.com</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={handleInput}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="nav-links">
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>

          <button className="Nav-button" onClick={handleWishlist}>
  Wishlist
</button>

<button className="Nav-button" onClick={handleCart}>
  Cart
</button>
        </div>
      </div>

      {isWishlistOpen && (
        <WishlistModal
          onClose={() => setIsWishlistOpen(false)}
        />
      )}

      {isCartOpen && (
  <CartModal onClose={() => setIsCartOpen(false)} />
)}
    </>
  );
};

export default Navbar;
