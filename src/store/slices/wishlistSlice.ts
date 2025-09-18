import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface WishlistState {
  items: Product[];
  totalItems: number;
}

const initialState: WishlistState = {
  items: [],
  totalItems: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (!existingItem) {
        state.items.push(action.payload);
        state.totalItems = state.items.length;
      }
    },
    
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalItems = state.items.length;
    },
    
    clearWishlist: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
    
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      
      state.totalItems = state.items.length;
    },
  },
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist, 
  toggleWishlist 
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

// Selectors
export const selectWishlistItems = (state: { wishlist: WishlistState }) => state.wishlist.items;
export const selectWishlistTotalItems = (state: { wishlist: WishlistState }) => state.wishlist.totalItems;
export const selectIsInWishlist = (state: { wishlist: WishlistState }, id: number) => 
  state.wishlist.items.some(item => item.id === id);