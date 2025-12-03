"use client"
import BinIcon from './assets/delete.svg';
import AddIcon from './assets/add.svg';
import Image from 'next/image';
import { useStoredCart } from '@/store/cartStore';
import styles from './ShoppingCart.module.css';


export default function ShoppingCart(){
  
  const cart = useStoredCart(state => state.cart);
  const removeBook = useStoredCart((s) => s.removeFromCart);
  const addBook = useStoredCart((s) => s.addToCart);
  
  const total = cart.reduce((sum, item) => sum + item.price, 0)
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
              className={styles.cartBtn}
              >
                <Image 
                  src={AddIcon}
                  alt='Add item'
                  height={25}
                  width={25}
                  />
                </button>
              <button 
              type='button'
              onClick={() => removeBook(item.id)}
              className={styles.cartBtn}
              >
                <Image 
                  src={BinIcon}
                  alt='Add item'
                  height={25}
                  width={25}
                  />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.cartBottom}>
          <p>Total: <strong>{total},-</strong></p>
        {/* Add reserve button here */}
        </div>
        </>
      )}
    </div>
  )
}