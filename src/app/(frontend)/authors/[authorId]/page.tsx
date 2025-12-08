import { getPayload } from "payload";
import config from '@payload-config';
import styles from './styles.module.css'
import { RichText } from "@payloadcms/richtext-lexical/react";
import BookCards from "@/components/BookCards/BookCards";
import { Book } from "@/payload-types";

type AuthorSlugParams = {
  params: Promise<{authorId: string}>
}

export default async function AuthorSlugPage({params}: AuthorSlugParams){
  const { authorId } = await params;
  const payload = await getPayload({config});

  const queryResults = await payload.find({
    collection: 'authors',
    where:{
      slug: {equals: authorId}
    },
    depth:2
  });

  const authors = queryResults.docs[0]

  // Filtrerer listen slik at den kun inneholder gyldige bokobjekter.
  const books = (authors.booksWritten || []).filter(
    (b): b is Book => typeof b === 'object' && b !== null
  );

  return(
    <section className={styles.slugMain}>
      <h1>{authors.name}</h1>
      <RichText data={authors.authorDescription} /> 
      <section className={styles.bookCards}>
      {books.map((book) => (
        <BookCards key={book.id} book={book} />
      ))}
      </section>
    </section>
  )
}