import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTransaction, getTransactionStatus } from '../../adapters/api/transactionApi';
import { transaction } from '../../adapters/types/apiTypes';

interface TransactionState {
    transactions: transaction[];
    status: 'PENDING' | 'APPROVED' | 'FAILED';
    error: string | null;
    transactionId: number | null;
}

const initialState: TransactionState = {
    transactions: [],
    status: 'PENDING',
    error: null,
    transactionId: null,
};

export const performTransaction = createAsyncThunk(
    'transactions/performTransaction',
    async (transactionData: { cardIndex: number }, { getState }) => {
        const state = getState() as { transactions: TransactionState };
        const customerId = localStorage.getItem('customerId');
        const productId = state.transactions.transactions[0]?.productId;
        const response: transaction | undefined = await createTransaction({ productId: productId!, customerId: Number(customerId), cardIndex: transactionData.cardIndex });
        return response;
    }
);

export const checkTransactionStatus = createAsyncThunk(
    'transactions/checkTransactionStatus',
    async (transactionId: number) => {
        const response = await getTransactionStatus(transactionId);
        return response;
    }
);

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(performTransaction.pending, (state) => {
                state.status = 'PENDING';
            })

            .addCase(performTransaction.fulfilled, (state, action: PayloadAction<transaction | undefined>) => {
                if (action.payload) {
                    state.transactionId = action.payload.id;
                    state.status = action.payload.status === 'OK' ? 'APPROVED' : 'FAILED';
                } else {
                    state.status = 'FAILED';
                    state.error = 'Transaction failed: No data received';
                }
            })
            .addCase(performTransaction.rejected, (state, action) => {
                state.status = 'FAILED';
                state.error = action.error.message || 'Failed to perform transaction';
            })
            .addCase(checkTransactionStatus.fulfilled, (state, action: PayloadAction<{ status: string } | undefined>) => {
                if (action.payload) {
                    state.status = action.payload.status === 'OK' ? 'APPROVED' : 'FAILED';
                } else {
                    state.status = 'FAILED';
                    state.error = 'Failed to check transaction status: No data received';
                }
            })
    },
});

export default transactionSlice.reducer;