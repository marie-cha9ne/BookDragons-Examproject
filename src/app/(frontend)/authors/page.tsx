import { getPayload } from "payload";
import config from '@payload-config';
import Link from "next/link";
import { RichText } from '@payloadcms/richtext-lexical/react'
import styles from './styles.module.css';


export default async function AuthorPage(){
  const payload = await getPayload({config});

  const queryResults = await payload.find({
    collection:'authors',
    depth:1
  });

  const authors = queryResults.docs

  return(
    <>
      <h1>Authors</h1>
    <section className={styles.authSection}>
      {authors.map((author) => (
      <div 
      key={author.id}
      className={styles.authContainer}
      >
      <h2>{author.name}</h2>
      <RichText data={author.authorDescription}/>
      
      <div className={styles.btnContainer}>
        <Link href={`/authors/${author.slug}`}>
        <button 
          type="button"
          className={styles.authBtn}
          >Books from author</button>
        </Link>
      </div>
      </div>
      ))}
    </section>
    </>
  )
}