'use client'
import type { Book } from '@/payload-types';
import styles from './BookCards.module.css';
import Image from 'next/image';
import AddToCart from '../AddToCart/AddToCart';
import { showToast } from '@/utils/toast';
import { useState } from 'react';
import Link from 'next/link';

type BookCardProps = {
  book: Book,
}

export default function BookCards({ book }: BookCardProps){
// Lokal toast for å vise 'book added' feedback i hvert kort
  const [toast, setToast] = useState<string |null>(null);

  // Sanity checks: sikrer at data er lastet og Riktig strukturert
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
      {/* Viser book cover, faller tilbake til placeholder om URL ikke finnes */}
      <Image
        src={book.bookCovers?.sizes?.thumbnail?.url ?? '/fallback.jpg'}
        alt={book.bookCovers.alt}
        width={book.bookCovers?.sizes?.thumbnail?.width ?? 200}
        height={book.bookCovers?.sizes?.thumbnail?.height ?? 200}
        />
      <h2 className={styles.title}>{book.title}</h2>
      <div className={styles.bookInfo}>
        <p>Books available: <strong>{book.availability}</strong></p>
        <p>Age recommendation: <strong>{book.ageRec}</strong></p>
      </div>

      <Link 
      href={`/authors/${book.author.slug}`} 
      className={styles.genreLink}
      >
      Author of the book: {book.author.name}
      </Link>

      <Link 
      href={`/genre/${book.genre.slug}`}
      className={styles.genreLink}
       >
      Book genre: {book.genre.genre}
      </Link>

      <p>Price: <strong>{book.price}</strong>,-</p>

{/* AddToCart bruker callback for å vise toast i denne komponenten */}
      <AddToCart 
        book={book}
        onAdd={() => showToast('Book added to cart!', setToast)}
        />
    {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  </section>
)

}