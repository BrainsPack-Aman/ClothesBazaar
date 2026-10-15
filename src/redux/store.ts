import {configureStore} from '@reduxjs/toolkit';
import productReducer from '../features/Product/ProductSlice';
import wishlistReducer from '../features/Wishlist/WishList';
import cartReducer from "../features/Cart/CartSlice"


export const store = configureStore({
    reducer: {
        products: productReducer,
        wishlist: wishlistReducer,
        cart:cartReducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;