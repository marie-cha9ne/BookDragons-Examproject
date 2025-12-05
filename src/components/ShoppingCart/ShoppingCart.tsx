'use client'
import BinIcon from './assets/delete.svg'
import AddIcon from './assets/add.svg'
import Image from 'next/image'
import { useStoredCart } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import styles from './ShoppingCart.module.css'

type CartProps = {
  onClose: () => void
}

export default function ShoppingCart({ onClose }: CartProps) {
  const cart = useStoredCart((state) => state.cart)
  const removeBook = useStoredCart((s) => s.removeFromCart)
  const addBook = useStoredCart((s) => s.addToCart)

  const router = useRouter()

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const handleReserve = () => {
    onClose()
    router.push('/checkout')
  }
  return (
    <div>
      {cart.length === 0 ? (
        <p>The cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
// key={item.id + '-' + index} sikrer at hvert element i listen alltid er unikt
              <li key={item.id + '-' + index} className={styles.listParent}>
                <p>{item.title}</p>
                <p><strong>{item.price},-</strong></p>

              <div className={styles.btnContainer}>
                <button type="button" onClick={() => addBook(item)} className={styles.cartBtn}>
                  <Image src={AddIcon} alt="Add item" height={25} width={25} />
                </button>
                <button
                  type="button"
                  onClick={() => removeBook(item.id)}
                  className={styles.cartBtn}
                >
                  <Image src={BinIcon} alt="Add item" height={25} width={25} />
                </button>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <p>
              Total: <strong>{total},-</strong>
            </p>
            <button type="button" className={styles.btn} onClick={handleReserve}>
              Reserve cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}
