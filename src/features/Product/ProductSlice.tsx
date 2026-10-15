import { createSlice } from '@reduxjs/toolkit';
import product from '../../data/product.json';
import type { Product } from '../../types/Product';

interface ProductState {
  allItems: Product[]; 
  products: Product[];  
}

const initialProducts = product as Product[];

const initialState: ProductState = {
  allItems: initialProducts,
  products: initialProducts,
  
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProductsByCategory: (state, action) => {
      const category = action.payload;
      if (category === 'All' || !category) {
        state.products = state.allItems;
      } else {
        state.products = state.allItems.filter(p => p.category === category);
      }
    },
    sortProductsByPrice: (state, action) => {
      const order = action.payload;
      state.products.sort((a, b) => 
        order === 'lowToHigh' ? a.price - b.price : b.price - a.price
      );
    },

    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.products = state.allItems.filter(p => 
        p.title.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm)
      );
    }
  }
});

export const { filterProductsByCategory, sortProductsByPrice, searchProducts } = productSlice.actions;
export default productSlice.reducer;
