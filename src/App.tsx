import './App.css'
import { useState, createContext } from 'react'
import Product from './pages/Product'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import InfoUser from './pages/InfoUser'
import { product } from './adapters/types/apiTypes'
import InfoPay from './pages/InfoPay'
import { infoPay } from './adapters/types/clientTypes'

export const ProductContext = createContext<{ productContext: product | undefined, setProductContext: React.Dispatch<React.SetStateAction<product | undefined>>, infoPay: infoPay | undefined, setInfoPay: React.Dispatch<React.SetStateAction<infoPay | undefined>> }>({ productContext: undefined, setProductContext: () => { }, infoPay: undefined, setInfoPay: () => { } })

function App() {
  
  const [productContext, setProductContext] = useState<product>()
  const [infoPay, setInfoPay] = useState<infoPay>()

  return (
    <ProductContext.Provider value={{ productContext, setProductContext, infoPay, setInfoPay }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Product />} />
          <Route path='/info' element={<InfoUser />} />
          <Route path='/pay' element={<InfoPay />} />
        </Routes>
      </BrowserRouter>
    </ProductContext.Provider>
  )
}

export default App
