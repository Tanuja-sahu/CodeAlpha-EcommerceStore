import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api';

const AppContext = createContext();
export function AppProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('shopnest_user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('shopnest_token') || '');
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('shopnest_cart') || '[]'));
  useEffect(() => localStorage.setItem('shopnest_cart', JSON.stringify(cart)), [cart]);
  const auth = (data) => { setUser(data.user); setToken(data.token); localStorage.setItem('shopnest_user', JSON.stringify(data.user)); localStorage.setItem('shopnest_token', data.token); };
  const logout = () => { setUser(null); setToken(''); localStorage.removeItem('shopnest_user'); localStorage.removeItem('shopnest_token'); };
  const addToCart = (product) => setCart(old => { const found = old.find(x => x._id === product._id); return found ? old.map(x => x._id === product._id ? {...x, quantity: Math.min(x.quantity+1, product.stock)} : x) : [...old, {...product, quantity:1}]; });
  const updateQty = (id, quantity) => setCart(old => old.map(x => x._id === id ? {...x, quantity: Math.max(1, Math.min(Number(quantity), x.stock))} : x));
  const removeFromCart = id => setCart(old => old.filter(x => x._id !== id));
  const clearCart = () => setCart([]);
  const value = useMemo(() => ({user,token,auth,logout,cart,addToCart,updateQty,removeFromCart,clearCart}), [user,token,cart]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export const useApp = () => useContext(AppContext);
