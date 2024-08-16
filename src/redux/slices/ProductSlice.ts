import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { product } from '../../adapters/types/apiTypes';

interface ProductState {
  product: product | null;
}

const initialState: ProductState = {
  product: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<product>) => {
      state.product = action.payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
  },
});

export const { setProduct, clearProduct } = productSlice.actions;

export default productSlice.reducer;
