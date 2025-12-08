'use client'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import styles from './CartSlide.module.css'

type CartSlideProps = {
  open: boolean,
  onClose: () => void,
}

export default function CartSlide({ open, onClose }: CartSlideProps) {
  return (
    <>
      <aside
      className={`
      ${open ? styles.open : styles.closed} 
      ${styles.cartSlide}
      `}
      >
        <button onClick={onClose} className={styles.exitCart}>
          Close
        </button>
        <ShoppingCart onClose={onClose} />
      </aside>
    </>
  )
}
