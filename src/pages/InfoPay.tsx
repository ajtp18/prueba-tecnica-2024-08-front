import { useState, useContext } from 'react'
import { ProductContext } from '../App'
import { infoPay } from '../adapters/types/clientTypes'
import { useNavigate } from 'react-router'
import MASTERCARD from "../adapters/img/mastercard.png"
import VISA from "../adapters/img/visa.webp"

function InfoPay() {
    const [infoPay, setInfoPay] = useState<infoPay>({numero: "", monthEXP: "", yearEXP: "", cvc: ""})
    const [franchise, setFranchise] = useState<string>("")
    const navigate = useNavigate();
    const {productContext} = useContext(ProductContext);

    const handleSubmit = (e: any) => {
        console.log(infoPay);
        e.preventDefault();
        navigate("/pay");
    }

    const determinateFrank = (e: any) => {
        setInfoPay({numero: e.target.value, monthEXP: infoPay.monthEXP, yearEXP: infoPay.yearEXP, cvc: infoPay.cvc})
        if(e.target.value.startsWith("4")){
            setFranchise("VISA")
        }else if(e.target.value.startsWith("5")){
            setFranchise("MASTERCARD")
        }else{
            setFranchise("")
        }
    }
    return (
        <div className='w-screen h-screen bg-gray-300 flex items-center justify-center p-4'>
        <div className="grid grid-cols-1 h-fit gap-4 bg-white p-6 rounded-2xl max-w-5xl items-center text-center space-y-2">
            <h1 className='font-semibold md:text-3xl text-xl'>Informacion para {productContext?.name}</h1>

            <form className='space-y-4' onSubmit={handleSubmit}>
                <div className='space-y-2'>
                    <label htmlFor="numero" className='block w-fit'>Numero de tarjeta:</label>

                    <div className='flex'>
                        <input type="number" id="numero" className='w-full border rounded-md p-2' onChange={determinateFrank} 
                        required/>
                        {franchise === "VISA" ? <img src={VISA} alt="VISA" className='w-10 h-10'/> : franchise === "MASTERCARD" ? <img src={MASTERCARD} alt="MASTERCARD" className='w-10 h-10'/> : null}
                    </div>
                </div>

                <div className='space-y-2'>
                    <label htmlFor="mesEXP" className='block w-fit'>Mes de expedicion:</label>
                    <input type="number" max={9999} id="mesEXP" className='w-full border rounded-md p-2'
                    onChange={(e) => setInfoPay({numero: infoPay.numero, monthEXP: e.target.value, yearEXP: infoPay.yearEXP, cvc: infoPay.cvc})} placeholder='MM' required />
                </div>

                <div className='space-y-2'>
                    <label htmlFor="yearEXP" className='block w-fit'>Año de expedicion:</label>
                    <input type="number" max={9999} id="yearEXP" className='w-full border rounded-md p-2'
                    onChange={(e) => setInfoPay({numero: infoPay.numero, monthEXP: infoPay.monthEXP, yearEXP: e.target.value, cvc: infoPay.cvc})} placeholder='AA' required />
                </div>

                <div className='space-y-2'>
                    <label htmlFor="cvc" className='block w-fit'>CVC:</label>
                    <input type="number" max={999} id="cvc" className='w-full border rounded-md p-2'
                    onChange={(e) => setInfoPay({numero: infoPay.numero, monthEXP: infoPay.monthEXP, yearEXP: infoPay.yearEXP, cvc: e.target.value})} required />
                </div>

                <button type="submit" className='bg-green-600 rounded-md p-2 text-white'>Realizar pago
                </button>
        
            </form>

        </div>
        </div>
    )
}

export default InfoPay