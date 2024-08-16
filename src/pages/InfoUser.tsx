import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { ProductContext } from '../App';
import { infoUser } from '../adapters/types/clientTypes';
import { postCustomer } from '../adapters/api/customerApi';

function InfoUser() {
  const [infoUser, setinfoUser] = useState<infoUser>({ name: "", pin: "" });
  const navigate = useNavigate();
  const { productContext, setUserInfo } = useContext(ProductContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserInfo(infoUser);
    
    try {
      // Llama a postCustomer y espera la respuesta
      const customer = await postCustomer(infoUser.name, infoUser.pin);
      
      // Verifica si el cliente fue creado correctamente y guarda el customerId en localStorage
      if (customer && customer.id) {
        localStorage.setItem("customerId", customer.id.toString());
        console.log("Customer ID saved to localStorage:", customer.id);
        navigate("/Pay");
      } else {
        console.error("Error: Customer creation failed");
      }
    } catch (error) {
      console.error("Error during customer creation:", error);
    }
  };

  return (
    <div className='w-screen h-screen bg-gray-300 flex items-center justify-center p-4'>
      <div className="grid grid-cols-1 h-fit gap-4 bg-white p-6 rounded-2xl w-full max-w-lg items-center text-center space-y-2">
        <h1 className='font-semibold md:text-3xl text-xl'>
          Agrega un pin de 4 dígitos para continuar con tu compra: {productContext?.name}
        </h1>
  
        <form action="" className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label htmlFor="nombre" className='block w-fit'>Nombre:</label>
            <input type="text" id="nombre" className='w-full border rounded-md p-2' 
              onChange={(e) => setinfoUser({ name: e.target.value, pin: infoUser.pin })}
              required />
          </div>
  
          <div className='space-y-2'>
            <label htmlFor="pin" className='block w-fit'>PIN de 4 dígitos:</label>
            <input type="number" max={9999} id="pin" className='w-full border rounded-md p-2'
              onChange={(e) => setinfoUser({ name: infoUser.name, pin: e.target.value })}
              required />
          </div>
  
          <button type="submit" className='bg-green-600 rounded-md p-2 text-white'>Siguiente</button>
        </form>
      </div>
    </div>
  );
}

export default InfoUser;
