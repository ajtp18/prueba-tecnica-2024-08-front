import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createTransaction } from "../adapters/api/transactionApi";

function Summary() {
    const navigate = useNavigate();
    const [product, setProduct] = useState<{ id: number, name: string, price: number } | null>(null);
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [cardIndex, setCardIndex] = useState<number | null>(null);

    useEffect(() => {
        // Recuperar el customerId desde localStorage
        const storedCustomerId = localStorage.getItem("customerId");
        if (storedCustomerId) {
            setCustomerId(Number(storedCustomerId));
        }

        // Recuperar el producto desde localStorage
        const storedProduct = localStorage.getItem("product");
        if (storedProduct) {
            setProduct(JSON.parse(storedProduct));
        }

        // Recuperar el cardIndex desde localStorage
        const storedCardIndex = localStorage.getItem("cardIndex");
        if (storedCardIndex) {
            setCardIndex(Number(storedCardIndex));
        }
    }, []);

    const handlePostInfo = async () => {
        if (!customerId || !product || cardIndex === null) {
            console.error("Missing necessary data for processing");
            return;
        }

        try {
            // Crear la transacción usando createTransaction
            const transactionData = {
                productId: product.id,
                customerId,
                cardIndex
            };

            const transactionResponse = await createTransaction(transactionData);
            localStorage.setItem("transaction", JSON.stringify(transactionResponse));

            // Navegar a la página final si todo fue bien
            navigate("/final");
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <div className='w-screen h-screen bg-gray-300 flex items-center justify-center p-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 h-fit gap-4 bg-white p-6 rounded-2xl max-w-5xl items-center'>
                <div className="flex justify-center">
                    <img className='' src='https://http2.mlstatic.com/D_NQ_NP_942133-MLA74651936102_022024-O.webp' alt='xbox'/>
                </div>
                <div className='text-center space-y-5'>
                    <h1 className='font-semibold md:text-3xl text-xl'>{product?.name}</h1>
                    <div>
                        <p className='md:text-2xl text-lg'>$ {product?.price}</p>
                    </div>
                    <p className='text-justify'>¡Estás a punto de obtener este excelente producto!</p>
                    <p className='text-justify'>Su método de pago es tarjeta de crédito terminada en: {localStorage.getItem("payment")?.substr(-5)}</p>
                    <button className='bg-green-600 rounded-md p-2 border-0 border-black text-white' onClick={handlePostInfo}>¡Continuar compra!</button>
                </div>
            </div>
        </div>
    );
}

export default Summary;
