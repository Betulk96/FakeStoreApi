import { FilterState } from '@/types/filter';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: FilterState = {
  category: 'all',
  priceRange: {
    min: 0,
    max: 1000,
  },
  sortBy: 'default',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceRange = action.payload;
    },
    
    setSortBy: (state, action: PayloadAction<'price-asc' | 'price-desc' | 'rating' | 'default'>) => {
      state.sortBy = action.payload;
    },
    
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const { setCategory, setPriceRange, setSortBy, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;