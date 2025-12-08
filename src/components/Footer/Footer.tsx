import styles from './Footer.module.css';

export default function Footer(){
  return(
    <footer className={styles.footer}>
      <h3 className={styles.title}>BookDragons</h3>

      <div>
        <h3>Who are we?</h3>
        <p>
          We are a small bookstore that focuses on reloving books. Our focus is to sell affordable books that can be loved once more. 
          </p>
      </div>
    </footer>
  )
}