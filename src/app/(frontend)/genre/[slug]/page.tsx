import { getPayload } from "payload";
import config from '@/payload.config';
import BookCards from "@/components/BookCards/BookCards";
import { Book } from "@/payload-types";

type GenreSlugParams={
  params: Promise<{slug: string}>
}

export default async function GenreSlugPage({params}: GenreSlugParams){
  const {slug} = await params;
  const payload = await getPayload({config});

  const queryResults = await payload.find({
    collection:'genre',
    where:{
      slug:{
        equals: slug
      }
    },
    depth:2,
  });

  const genre = queryResults.docs[0];

  const books = (genre.bookInGenre || []).filter(
    (b): b is Book => typeof b === 'object' && b !== null
  )

  return(
    <section>
      <h1>{genre.genre}</h1>
      <p>{genre.genreDescription}</p>
      {books.map(book => (
        <BookCards book={book} key={book.id} />
      ))}
    </section>
  )
}