import { useContext, useEffect } from "react";
import { ProductContext } from "../App";
import { useNavigate } from "react-router";
import { getProducts } from "../adapters/api/productsApi";

function Product() {
    const {productContext, setProductContext} = useContext(ProductContext);
    const navigate = useNavigate();
    useEffect(() => {
        getProducts().then((products) => {
            setProductContext(products);
            console.log(products);
        });
      
    }, [])
    
    return <>
        <div className='w-screen md:h-screen bg-gray-300 flex items-center justify-center p-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 h-fit gap-4 bg-white p-6 rounded-2xl max-w-5xl items-center'>
                <div className="flex justify-center">
                    <img className='' src='https://http2.mlstatic.com/D_NQ_NP_942133-MLA74651936102_022024-O.webp' alt='xbox'/>
                </div>
                <div className='text-center space-y-5'>
                    <h1 className='font-semibold md:text-3xl text-xl'>{productContext?.name}</h1>
                    <div>
                        <p className='md:text-2xl text-lg'>$ {productContext?.price}</p>
                        <p className='font-medium'>Stock: {productContext?.stock} disponibles</p>
                    </div>
                    <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deserunt autem omnis. Quae nemo soluta placeat dolorum nesciunt facere consectetur hic blanditiis deleniti ducimus rerum adipisci repellendus, odit doloribus nisi!</p>
                    <button className='bg-green-600 rounded-md p-2 border-0 border-black text-white' onClick={() => navigate("/info")}>Comprar ahora</button>
                </div>
            </div>
        </div>
    </>;
}

export default Product;