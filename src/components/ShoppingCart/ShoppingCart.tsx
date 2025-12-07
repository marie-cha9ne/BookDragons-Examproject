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
  // henter hele cart-arrayet fra zustand
  const cart = useStoredCart((state) => state.cart)

  // Funksjoner for å legge til og fjerne bøker
  const removeBook = useStoredCart((s) => s.removeFromCart)
  const addBook = useStoredCart((s) => s.addToCart)

  const router = useRouter()

  // Summere totalpris
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  // lager et 'frekvenskart' over hvor mange ganger hver bok ligger i cart
  const counts: Record<number, number> = {}
  for (const item of cart) {
    counts[item.id] = (counts[item.id] || 0) + 1
  };

  // Lager liste for unike bøker + antall
  const uniqeItems = Object.entries(counts).map(([id, quantity]) => {
    return { id: Number(id), quantity }
  });

  const handleReserve = () => {
    onClose();
    router.push('/checkout');
  };
  return (
    <div>
      {cart.length === 0 ? (
        <p>The cart is empty</p>
      ) : (
        <>
          <ul>
            {uniqeItems.map(({ id, quantity }) => {
              // Finn bok-objektet basert på id
              const book = cart.find((b) => b.id === Number(id))

              if (!book) {
                return null;
              }
              return (
                <li key={id} className={styles.listParent}>
                  <p>{book?.title}</p>
                  <p>
                    <strong>{book?.price},-</strong>
                  </p>
                  <p>{quantity}</p>
                  <div className={styles.btnContainer}>
                    <button type="button" onClick={() => addBook(book)} className={styles.cartBtn}>
                      <Image src={AddIcon} alt="Add item" height={25} width={35} />
                    </button>
                    <button type="button" onClick={() => removeBook(id)} className={styles.cartBtn}>
                      <Image src={BinIcon} alt="Add item" height={25} width={35} />
                    </button>
                  </div>
                </li>
              )
            })};
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
