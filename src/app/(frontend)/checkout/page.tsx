'use client'
import styles from './styles.module.css'
import { useStoredCart } from '@/store/cartStore'
import { useState } from 'react'
import type React from 'react'

export default function CheckoutPage() {
  const cart = useStoredCart((state) => state.cart)
  const [status, setStatus] = useState<'idle' | 'loading' | 'sucsess' | 'error'>('idle');

   const total = cart.reduce((sum, item) => sum + item.price, 0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const reserveForm = e.currentTarget
    const formData = new FormData(reserveForm)

    const data = Object.fromEntries(formData.entries())

    // legg til post request her:

    // legg til respons sjekk her:

    // velg toast eller dialog for tilbakemelding til bruker om status av reservasjon

  }
  return (
    <section className={styles.resSection}>
      <h1>Reservations</h1>
      <p>
        <strong>Important:</strong> BookDragons currently are not able to ship any orders directly
        to you as a customer. Any orders placed on the site will be notified to the shop for
        reservation. Please add your contact information for further update when your order is
        ready for pickup.
      </p>
      <form className={styles.resForm}>
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          name="name" 
          placeholder="Customer name.." 
          required
          className={styles.input}
          />
         <label htmlFor="customerInfo">E-mail:</label>
        <input 
          type="text" 
          name='customerInfo' 
          placeholder='Customer mail..' 
          required
          className={styles.input}
          />
        <ul className={styles.listParent}>
          <p><strong>Your order:</strong></p>
            {cart.map((item) => (
              <li key={item.id} className={styles.list}>
                {item.title} <strong>{item.price},-</strong>
              
                <input 
                type="hidden"
                name='reserveBook'
                value={item.id}
                />
              </li>
            ))}
            <p>Sub total: <strong>{total}</strong>,-</p>
        </ul>
        <div className={styles.btnContainer}>
        <button 
          type='submit'
          className={styles.btn}
          >
            {status === 'loading' ? 'Saving order' : 'Reserve order'}
          </button>
            {status === 'sucsess' && <p>Your is now placed</p>}
            {status === 'error' && <p>Your order could not be saved</p>}
          </div>
      </form>
    </section>
  )
}
