
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Product';
import productData from '../../data/product.json';

const initialProducts = productData as Product[];

interface ProductState {
  allItems: Product[];
  products: Product[];
}

const initialState: ProductState = {
  allItems: initialProducts,
  products: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      const exists = state.products.some(
        (item) => item.id === product.id
      );

      if (!exists) {
        state.products.push(product);
      }

    },
  },
});

export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
