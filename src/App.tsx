import './App.css'
import { useState, createContext } from 'react'
import Product from './pages/Product'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import InfoUser from './pages/InfoUser'
import { product } from './adapters/types/apiTypes'
import InfoPay from './pages/InfoPay'
import Summary from './pages/Summary'
import FinalStatus from './pages/FinalStatus'
import { infoPay, infoUser } from './adapters/types/clientTypes'

export const ProductContext = createContext<{ productContext: product | undefined, setProductContext: React.Dispatch<React.SetStateAction<product | undefined>>, payInfo: infoPay | undefined, setPayInfo: React.Dispatch<React.SetStateAction<infoPay | undefined>>, userInfo: infoUser | undefined, setUserInfo: React.Dispatch<React.SetStateAction<infoUser | undefined>> }>({ productContext: undefined, setProductContext: () => { }, payInfo: undefined, setPayInfo: () => { }, userInfo: undefined, setUserInfo: () => { } })

function App() {
  
  const [productContext, setProductContext] = useState<product>()
  const [payInfo, setPayInfo] = useState<infoPay>()
  const [userInfo, setUserInfo] = useState<infoUser>()

  return (
    <ProductContext.Provider value={{ productContext, setProductContext, payInfo, setPayInfo, userInfo, setUserInfo }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Product />} />
          <Route path='/info' element={<InfoUser />} />
          <Route path='/pay' element={<InfoPay />} />
          <Route path='/summary' element={<Summary />} />
          <Route path='/final' element={<FinalStatus />} />
        </Routes>
      </BrowserRouter>
    </ProductContext.Provider>
  )
}

export default App
