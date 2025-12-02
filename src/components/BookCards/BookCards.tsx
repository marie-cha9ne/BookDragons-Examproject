import type { Book } from '@/payload-types';
import styles from './BookCards.module.css';
import Image from 'next/image';

type BookCardProps = {
  book: Book,
}

export default async function BookCards({ book }: BookCardProps){

  if(!book.bookCovers || typeof book.bookCovers !== 'object'){
    return <p className={styles.errorMsg}>No image available for this book</p>
  }

  if(!book.author || typeof book.author !== 'object'){
    return <p className={styles.errorMsg}>No author found</p>
  }

  if(!book.genre || typeof book.genre !== 'object'){
    return <p className={styles.errorMsg}>No Genre found</p>
  }

return(
  <section className={styles.bookSection}>
    <div className={styles.cardContainer}>
      <Image
        src={book.bookCovers?.sizes?.thumbnail?.url ?? './fallback.jpg'}
        alt={book.bookCovers.alt}
        width={book.bookCovers?.sizes?.thumbnail?.width ?? 200}
        height={book.bookCovers?.sizes?.thumbnail?.height ?? 200}
        />
      <h2 className={styles.title}>{book.title}</h2>
      <div className={styles.bookInfo}>
        <p>Books available: <strong>{book.availablilty}</strong></p>
        <p>Age recommendation: <strong>{book.ageRec}</strong></p>
      </div>
      {/* Later: add dialog, details or dynamicrouting to author and genre */}
      <p>Author of the book: {book.author.name}</p>
      <p>Book genre: {book.genre.genre}</p>

      <p>Price: <strong>{book.price}</strong>,-</p>
      <div className={styles.btnContainer}>
      <button className={styles.btn} type='button'>
        Add to cart
      </button>
      </div>
    </div>
  </section>
)

}