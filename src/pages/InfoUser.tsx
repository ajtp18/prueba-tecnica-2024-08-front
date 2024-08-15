import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { ProductContext } from '../App';
import { infoUser } from '../adapters/types/clientTypes';
import { postCustomer } from '../adapters/api/customerApi';

function InfoUser() {
  const [infoUser, setinfoUser] = useState<infoUser>({name: "", pin: ""})
  const navigate = useNavigate();
  const {productContext} = useContext(ProductContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(postCustomer(infoUser.name, infoUser.pin));
    navigate("/pay");
  }

  return (
    <div className='w-screen h-screen bg-gray-300 flex items-center justify-center p-4'>
      <div className="grid grid-cols-1 h-fit gap-4 bg-white p-6 rounded-2xl max-w-5xl items-center text-center space-y-2">
        <h1 className='font-semibold md:text-3xl text-xl'>Informacion para {productContext?.name}</h1>

        <form action="" className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label htmlFor="nombre" className='block w-fit'>Nombre:</label>
            <input type="text" id="nombre" className='w-full border rounded-md p-2' onChange={(e) => setinfoUser({name: e.target.value, pin: infoUser.pin})} 
            required/>
          </div>

          <div className='space-y-2'>
            <label htmlFor="pin" className='block w-fit'>PIN de 4 digitos:</label>
            <input type="number" max={9999} id="pin" className='w-full border rounded-md p-2'
            onChange={(e) => setinfoUser({name: infoUser.name, pin: e.target.value})} required />
          </div>

          <button type="submit" className='bg-green-600 rounded-md p-2 text-white'>Siguiente
            </button>
        </form>

      </div>
    </div>
  )
}

export default InfoUser