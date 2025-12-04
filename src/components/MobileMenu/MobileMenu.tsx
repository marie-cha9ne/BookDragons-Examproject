import styles from './MobileMenu.module.css';
import Link from 'next/link';

type MenuProps={
  open: boolean,
  onClose: () => void
}

export default function MobileMenu({open, onClose}: MenuProps){
  return(
    <aside className={`${open ? styles.open : styles.closed} ${styles.menuSlide}`}>
      <ul className={styles.linkParent}>
      <Link href={'/'} className={styles.burgerLinks}>Home</Link>
      <Link href={'/'} className={styles.burgerLinks}>Genres</Link>
      <Link href={'/'} className={styles.burgerLinks}>Authors</Link>
      </ul>
    </aside>
  )
}