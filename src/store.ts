import { configureStore } from '@reduxjs/toolkit';
import productReducer from './redux/slices/ProductSlice';
import transactionReducer from './redux/slices/transactionSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    transactions: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;