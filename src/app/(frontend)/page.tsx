import { getPayload } from 'payload'
import config from '@/payload.config'
import styles from './style.module.css'
import BookCards from '@/components/BookCards/BookCards'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const queryResults = await payload.find({
    collection: 'books',
    depth: 1,
  })

  const books = queryResults.docs
  return (
    <section>
    <h1>BookDragons</h1>
    <section className={styles.grid}>
      {books.map((book) => (
        <div key={book.id}>
          <BookCards book={book} />
        </div>
      ))}
    </section>
    </section>
  )
}
