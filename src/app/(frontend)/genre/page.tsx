import { getPayload } from "payload";
import config from '@payload-config';
import Link from "next/link";
import { RichText } from '@payloadcms/richtext-lexical/react'
import styles from './styles.module.css';

export default async function GenrePage(){
  const payload = await getPayload({config});

  const queryResults = await payload.find({
    collection:'genre',
    depth:1
  });

  const genres = queryResults.docs

  return(
    <>
    <h1>Genres</h1>
    <section className={styles.genreSection}>
      {genres.map((genre) => (
        <div key={genre.id} className={styles.genreDiv}>
          <h2>{genre.genre}</h2>
          <RichText data={genre.genreDescription}/>
          <div className={styles.btnContainer}>
            <Link href={`/genre/${genre.slug}`}>
              <button type="button" className={styles.btn}>
                Related books
              </button>
            </Link>
          </div>
        </div>
      ))}
    </section>
    </>
  )
}