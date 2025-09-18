import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      // Totals güncelle
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
      
      cartSlice.caseReducers.calculateTotals(state);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },
    
    calculateTotals: (state) => {
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  calculateTotals 
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotalItems = (state: { cart: CartState }) => state.cart.totalItems;
export const selectCartTotalAmount = (state: { cart: CartState }) => state.cart.totalAmount;
export const selectCartItemById = (state: { cart: CartState }, id: number) => 
  state.cart.items.find(item => item.id === id);