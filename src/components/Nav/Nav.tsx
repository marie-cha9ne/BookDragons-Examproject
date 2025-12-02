"use client"
import styles from './nav.module.css';
import Image from 'next/image';
import Cart from './assets/Shopping cart.svg';


export default function Nav(){

  return(
    <nav className={styles.nav}>
    <h3 className={styles.title}>BookDragons</h3>

    <div className={styles.cart}>
      <Image
        src={Cart}
        width={30}
        height={40}
        alt='Shopping cart'
        />
    </div>
    </nav>
  )
}