import { getPayload } from 'payload'
import config from '@/payload.config'
import BookList from '@/components/BookList/BookList'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const queryResults = await payload.find({
    collection: 'books',
    depth: 2,
  })

  const books = queryResults.docs;
  return (
    <section>
    <h1>BookDragons</h1>
    <BookList books={books}/>
    </section>
  )
}
