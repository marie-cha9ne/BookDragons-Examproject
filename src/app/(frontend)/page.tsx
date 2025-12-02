import { getPayload } from 'payload'
import config from '@/payload.config'
import './styles.css'
import payloadConfig from '@/payload.config';
import BookCards from '@/components/BookCards/BookCards';

export default async function HomePage() {
   const payload = await getPayload({config});
   const queryResults = await payload.find({
    collection:'books',
    depth:1,
   })

   const books = queryResults.docs;
  return (
    <div >
      <h1 className='title'>Book Dragons</h1>
      {books.map((book) => (
        <section key={book.id}>
          <BookCards book={book}/>
        </section>
      ))}
    </div>
  )
}
