import { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../App';
import { infoPay } from '../adapters/types/clientTypes';
import { useNavigate } from 'react-router';
import MASTERCARD from "../adapters/img/mastercard.png";
import VISA from "../adapters/img/visa.webp";
import { patchCustomerAddCard } from '../adapters/api/customerApi';

function InfoPay() {
    const [infoPay, setInfoPay] = useState<infoPay>({ number: "", exp_month: "", exp_year: "", cvc: "", card_holder: "" });
    const [franchise, setFranchise] = useState<string>("");
    const [customerId, setCustomerId] = useState<number | null>(null);
    const navigate = useNavigate();
    const { productContext, setPayInfo } = useContext(ProductContext);

    useEffect(() => {
        // Recuperar el customerId desde localStorage
        const storedCustomerId = localStorage.getItem("customerId");
        if (storedCustomerId) {
            setCustomerId(Number(storedCustomerId));
        } else {
            console.error("No customer ID found in localStorage.");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPayInfo(infoPay);

        const lastNumbers = infoPay.number.substr(-4);
        localStorage.setItem("payment", JSON.stringify(lastNumbers));

        if (customerId === null) {
            console.error("Customer ID is null");
            return;
        }

        try {
            // Llamar a patchCustomerAddCard y guardar el cardIndex en localStorage
            const cardIndex = await patchCustomerAddCard(
                customerId,
                infoPay.number,
                infoPay.cvc,
                infoPay.exp_month,
                infoPay.exp_year,
                infoPay.card_holder
            );

            if (typeof cardIndex === 'number') {
                localStorage.setItem("cardIndex", cardIndex.toString());
                console.log("Card index saved to localStorage:", cardIndex);
            }

            navigate("/summary");
        } catch (error) {
            console.error("Error adding card:", error);
        }
    };

    const determinateFrank = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInfoPay(prevState => ({ ...prevState, number: value }));
        if (value.startsWith("4")) {
            setFranchise("VISA");
        } else if (value.startsWith("5")) {
            setFranchise("MASTERCARD");
        } else {
            setFranchise("");
        }
    };

    return (
        <div className='w-screen h-screen bg-gray-300 flex items-center justify-center p-4'>
            <div className="grid grid-cols-1 h-fit gap-4 bg-white p-6 rounded-2xl max-w-5xl items-center text-center space-y-2">
                <h1 className='font-semibold md:text-3xl text-xl'>Información para {productContext?.name}</h1>

                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='space-y-2'>
                        <label htmlFor="numero" className='block w-fit'>Número de tarjeta:</label>
                        <div className='flex'>
                            <input type="number" id="numero" className='w-full border rounded-md p-2' onChange={determinateFrank} required />
                            {franchise === "VISA" ? <img src={VISA} alt="VISA" className='w-10 h-10' /> : franchise === "MASTERCARD" ? <img src={MASTERCARD} alt="MASTERCARD" className='w-10 h-10' /> : null}
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor="mesEXP" className='block w-fit'>Mes de expedición:</label>
                        <input type="number" max={12} id="mesEXP" className='w-full border rounded-md p-2'
                            onChange={(e) => setInfoPay(prevState => ({ ...prevState, exp_month: e.target.value }))} placeholder='MM' required />
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor="yearEXP" className='block w-fit'>Año de expedición:</label>
                        <input type="number" max={9999} id="yearEXP" className='w-full border rounded-md p-2'
                            onChange={(e) => setInfoPay(prevState => ({ ...prevState, exp_year: e.target.value }))} placeholder='AA' required />
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor="cvc" className='block w-fit'>CVC:</label>
                        <input type="number" max={999} id="cvc" className='w-full border rounded-md p-2'
                            onChange={(e) => setInfoPay(prevState => ({ ...prevState, cvc: e.target.value }))} required />
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor="place_holder" className='block w-fit'>Titular de la tarjeta:</label>
                        <input type="string" max={25} id="place_holder" className='w-full border rounded-md p-2'
                            onChange={(e) => setInfoPay(prevState => ({ ...prevState, card_holder: e.target.value }))} required />
                    </div>

                    <button className='bg-green-600 rounded-md p-2 border-0 border-black text-white' type="submit">¡Continuar compra!</button>
                </form>
            </div>
        </div>
    );
}

export default InfoPay;
