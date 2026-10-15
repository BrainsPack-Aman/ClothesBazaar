import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/Product';
import productData from '../../data/product.json';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  allItems: Product[];
  products: CartItem[];
  productCount: number;
}

const initialState: CartState = {
  allItems: productData as Product[],
  products: [],
  productCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({
          ...action.payload,
          quantity: 1,
        });
      }

      state.productCount += 1;
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const existingProduct = state.products.find(
        (item) => item.id === action.payload
      );

      if (!existingProduct) return;

      existingProduct.quantity -= 1;
      state.productCount -= 1;

      if (existingProduct.quantity === 0) {
        state.products = state.products.filter(
          (item) => item.id !== action.payload
        );
      }
    },
  },
});

export const { addToCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;