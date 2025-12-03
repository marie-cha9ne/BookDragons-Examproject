'use client';
import type { Book } from "@/payload-types";
import { useStoredCart } from "@/store/cartStore";
import styles from './AddToCart.module.css';

type AddToCartProps = {
  book: Book,
  onAdd?: () => void
}

export default function AddToCart({book, onAdd}: AddToCartProps){

  const addToCart = useStoredCart((state) => state.addToCart);

  function handleClick(){
    addToCart(book);
    onAdd?.();
// Bruker optional chaining: onAdd?.() for å unngå feil
// hvis callback ikke finnes
  }
  return(
    <div className={styles.btnContainer}>
    <button 
      onClick={handleClick}
      className={styles.btn}
      >
        Add to cart
      </button>
    </div>
  )
}
