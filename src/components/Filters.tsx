import { useDispatch } from 'react-redux';
import { sortProductsByPrice, filterProductsByCategory } from '../features/Product/ProductSlice';
import "../filters.css"

const Filters = () => {
  const dispatch = useDispatch();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    dispatch(sortProductsByPrice(selectedSort));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    dispatch(filterProductsByCategory(selectedCategory));
  };

  return (
    <div className="filters">
      <h2>Filters</h2>
      <select name="price" id="price" onChange={handleSortChange}>
        <option value="">Select Order</option>
        <option value="lowToHigh">Low to High</option>
        <option value="highToLow">High to Low</option>
      </select>

     <select name="category" id="category" onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        <option value="T-shirts">T-Shirt</option>
        <option value="Shirts">Shirts</option>
        <option value="Dresses">Dresses</option>
        <option value="Jeans">Jeans</option>
        <option value="Jackets">Jackets</option>
      </select>
    </div>
  );
};

export default Filters;
