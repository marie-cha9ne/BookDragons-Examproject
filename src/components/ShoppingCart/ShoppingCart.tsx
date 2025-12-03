"use client"
import BinIcon from './assets/delete.svg';
import AddIcon from './assets/add.svg';
import Cart from './assets/Shopping cart.svg';
import { useStoredCart } from '@/store/cartStore';

export default function ShoppingCart(){
  const cart = useStoredCart(state => state.cart);

  const removeBook = useStoredCart((s) => s.removeFromCart);
  const addBook = useStoredCart((s) => s.addToCart);

  return(
    <div>
      {cart.length === 0 ? (
        <p>The cart is empty</p>
      ): (
        <>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <p>{item.title}</p>
              <p>{item.price}</p>

              <button 
              type='button'
              onClick={() => addBook(item)}
              >
                <AddIcon/>
                </button>
              <button 
              type='button'
              onClick={() => removeBook(item.id)}
              >
                <BinIcon/>
              </button>
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  )
}