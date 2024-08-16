import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { performTransaction, checkTransactionStatus } from '../../../redux/slices/transactionSlice';
import { RootState, AppDispatch } from '../../../store';

interface TransactionState {
    status: string;
    transactionId: string;
    productId: string;
}

const TransactionComponent: React.FC = () => {
    
    const dispatch = useDispatch<AppDispatch>();
    const { status, transactionId, productId } = useSelector((state: RootState) => state.transactions as unknown as TransactionState); // Update the type assertion


    useEffect(() => {
        const customerId = Number(localStorage.getItem('customerId'));
        dispatch(fetchCustomerProductId(customerId));
    }, [dispatch]);
    
    useEffect(() => {
        if (productId !== null) {
            const transactionData = { cardIndex: 1 };
            dispatch(performTransaction(transactionData));
        }
    }, [dispatch, productId]);

    useEffect(() => {
        if (transactionId) {
            const interval = setInterval(() => {
                dispatch(checkTransactionStatus(Number(transactionId)));
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [dispatch, transactionId]);

    return (
        <div>
            {status === 'PENDING' && <div>Transaction is pending...</div>}
            {status === 'APPROVED' && <div>Transaction approved!</div>}
            {status === 'FAILED' && <div>Transaction failed.</div>}
        </div>
    );
};

export default TransactionComponent;

function fetchCustomerProductId(_customerId: number): any {
    throw new Error('Function not implemented.');
}
