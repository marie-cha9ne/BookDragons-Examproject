'use client'
import { useStoredCart } from '@/store/cartStore';
import { useRef, useState } from 'react';
import type React from 'react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/toast';
import styles from './CustomerForm.module.css';

export default function CustomerForm() {
  const router = useRouter();
  const cart = useStoredCart((state) => state.cart);
  const clearCart = useStoredCart((s) => s.clearCart);

  const [status, setStatus] = useState<'idle' | 'loading' | 'sucsess' | 'error'>('idle');
  const [toast, setToast] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(cart.length === 0){
      setStatus('error');
      showToast("This cart is empty", setToast);
      return;
    }

    setStatus('loading');

    const reserveForm = e.currentTarget;
    const formData = new FormData(reserveForm);

    // skal endre cart til format som payload trenger
    // teller først duplikater av bøker
    const counts: Record<number, number> = {};

    // teller hvor mange av hver bok kunden hat lagt til i cart
    for(const item of cart){
      counts[item.id] = (counts[item.id] || 0) + 1;
    };

    // lager riktig format for payload: [{book: id, bookQuantity: nr}]
    const items = Object.entries(counts).map(([bookId, quantity]) => ({
      book: Number(bookId),
      bookQuantity: quantity,
    }));

    // Datastruktur som sendes til backend
    const payloadData = {
      customerName: formData.get('customerName'),
      customerInfo: formData.get('customerInfo'),
      items,
    };


    const res = await fetch('/api/custom-orders', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(payloadData),
    });

    if (res.ok) {
      setStatus('sucsess');

      router.refresh();

      reserveForm.reset();

      dialogRef.current?.showModal();

      clearCart();
    }else{
      setStatus('error');
      showToast('Your order could not be saved', setToast);
    };
  }

  function closeDialog(){
    dialogRef.current?.close();
    setStatus("idle");
    router.push('/');
  }
  return (
    <section className={styles.formSection}>
      <form className={styles.resForm} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="customerName"
          placeholder="Customer name.."
          required
          className={styles.input}
        />
        <label htmlFor="info">E-mail:</label>
        <input
          type="text"
          name="customerInfo"
          placeholder="Customer mail.."
          required
          className={styles.input}
        />
        <ul className={styles.listParent}>
          <p>
            <strong>Your order:</strong>
          </p>
          {cart.map((item, index) => (
            <li key={item.id + '-' + index} className={styles.list}>
              {item.title} <strong>{item.price},-</strong>
            </li>
          ))}
          <p>
            Sub total: <strong>{total}</strong>,-
          </p>
        </ul>
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.btn}>
            {status === 'loading' ? 'Saving order' : 'Reserve order'}
          </button>
        </div>
      </form>
      <dialog
      ref={dialogRef}    
      className={styles.dialog}  
      >
        <h2>Your order has been placed!</h2>
        <p>
          Your order has been sucsessfully placed. The store will contact you for further information about pickup! <br/> Thanks for shopping with us!
        </p>
        <div className={styles.btnContainer}>
          <button
          type='button'
          onClick={closeDialog}
          className={styles.btn}
          >
            Close
          </button>
          </div>
      </dialog>
    </section>
  )
}
