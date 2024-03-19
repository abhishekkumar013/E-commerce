import { useState, useContext, createContext, useEffect } from 'react'

const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const item = localStorage.getItem('cart')
    if (item) {
      setCart(JSON.parse(item))
    }
  })
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  )
}

//custom hook
const useCart = () => useContext(CartContext)

export { useCart, CartProvider }
