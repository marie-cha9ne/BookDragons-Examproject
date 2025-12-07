'use client';
import type { Book } from "@/payload-types";
import { useStoredCart } from "@/store/cartStore";
import styles from './AddToCart.module.css';
import { showToast } from "@/utils/toast";
import { useState } from "react";

type AddToCartProps = {
  book: Book,
  onAdd?: () => void // Optional callback fra parent (BookCards)
}

export default function AddToCart({book, onAdd}: AddToCartProps){
  const [toast, setToast] = useState<string | null>(null);
  const addToCart = useStoredCart((state) => state.addToCart);
  
  function handleClick(){
  // addToCart returnerer 'added' eller 'soldout'
   const result = addToCart(book);

// Hvis antall i handlekurv overstiger availability -> gi brukeren feedback
   if(result === 'soldout'){
    showToast('No more available copies of this book', setToast);
    return;
   }

  //  Kall optional callback fra parent bare hvid den finnes
    onAdd?.();
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
