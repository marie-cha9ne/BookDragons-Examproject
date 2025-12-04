'use client';
import type { Book } from "@/payload-types";
import { useStoredCart } from "@/store/cartStore";
import styles from './AddToCart.module.css';
import { showToast } from "@/utils/toast";
import { useState } from "react";

type AddToCartProps = {
  book: Book,
  onAdd?: () => void
}

export default function AddToCart({book, onAdd}: AddToCartProps){
  const [toast, setToast] = useState<string | null>(null);
  const addToCart = useStoredCart((state) => state.addToCart);

  function handleClick(){
   const result = addToCart(book);
    
   if(result === 'soldout'){
    showToast('No more available copies of this book', setToast);
    return;
   }

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
    
      {toast && <div className={styles.toast}>{toast}</div>}

    </div>
  )
}
